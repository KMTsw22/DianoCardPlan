import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { AgentSpec, fillTemplate } from "./agent-loader";
import { generateImage, RefImage } from "./gemini";
import { loadEnvRefs, resolveStyleRefs } from "./style-refs";

/**
 * 모든 에이전트 프롬프트 앞에 자동으로 prepend 되는 공용 스타일 락 (선·질감·크기·방향 규칙).
 * 파일: agents/_style-lock.md
 * 수정하면 다음 요청부터 즉시 반영됨 (프로세스 시작마다 fresh read).
 */
let _cachedStyleLock: string | null = null;
async function loadStyleLock(): Promise<string> {
  // dev 모드에서 매번 디스크 읽는 편이 편함 — 파일 한 번 고치면 hot-reload 기다릴 필요 X
  try {
    const file = path.join(process.cwd(), "agents", "_style-lock.md");
    const body = await fs.readFile(file, "utf8");
    _cachedStyleLock = body;
    return body;
  } catch {
    return _cachedStyleLock ?? "";
  }
}

export type GenerateOptions = {
  agent: AgentSpec;
  values: Record<string, string>;
  /**
   * 엔티티 ID (카드·적·패시브 ID). 있으면 `references/{agent}/{id}/` 폴더의
   * 이미지를 우선 사용하고, 없으면 agent 공용 레퍼런스로 폴백.
   */
  entityId?: string;
  promptOverride?: string;
  filenameValues?: Record<string, string>;
  refs?: RefImage[];
  fit?: "cover" | "contain";
  transparentBackground?: boolean;
  skipStyleRefs?: boolean;
};

export type GenerateResult = {
  filename: string;
  publicPath: string;
  promptUsed: string;
  savedPath: string;
  styleRefCount: number;
  envRefCount: number;
  chainRefCount: number;
};

export async function generateAndSave(opts: GenerateOptions): Promise<GenerateResult> {
  // 투명 배경 스프라이트는 기본적으로 "contain"을 써야 프레임을 넘치는 이미지의 양옆이 크롭되지 않음.
  // 배경 있는 에셋(카드 아트 등)은 기존 "cover"로 프레임을 꽉 채움.
  const defaultFit: "cover" | "contain" = opts.transparentBackground ? "contain" : "cover";
  const { agent, values, promptOverride, filenameValues, refs, fit = defaultFit } = opts;

  const styleLock = await loadStyleLock();
  const styleLockPrefix = styleLock
    ? "# 🔒 공용 스타일 락 (모든 에이전트 공통 — 절대 어기지 말 것)\n\n" +
      styleLock +
      "\n\n---\n\n"
    : "";

  const agentBody =
    promptOverride && promptOverride.trim().length > 0
      ? promptOverride
      : fillTemplate(agent.body, values);

  // 스타일 락은 promptOverride와 상관없이 항상 앞에 붙음 (사용자가 기본 스타일을 건드리지 않고
  // 본문만 손볼 수 있도록)
  const basePrompt = styleLockPrefix + agentBody;

  const styleRefs = opts.skipStyleRefs ? [] : await resolveStyleRefs(agent.name, opts.entityId);
  // 환경(맵) 레퍼런스 — 있으면 항상 첨부. 화풍이 아니라 "캐릭터가 설 배경"을 알려주는 용도.
  // 투명 배경 스프라이트(몬스터·공룡 등) 에이전트에만 의미 있음.
  const envRefs = opts.skipStyleRefs ? [] : await loadEnvRefs(agent.name);
  const chainRefs = refs ?? [];
  // 순서 고정: [style…, env…, chain…]. 프롬프트의 인덱스 설명과 일치해야 함.
  const allRefs = [...styleRefs, ...envRefs, ...chainRefs];

  const styleStart = 1;
  const styleEnd = styleRefs.length;
  const envStart = styleEnd + 1;
  const envEnd = styleEnd + envRefs.length;
  const chainStart = envEnd + 1;
  const chainEnd = envEnd + chainRefs.length;

  const styleNote =
    styleRefs.length > 0
      ? "\n\n# 스타일 레퍼런스 (" +
        styleStart +
        "~" +
        styleEnd +
        "번째, 총 " +
        styleRefs.length +
        "장) — 🎨 **화풍만** 참고, 내용물 복사 금지\n" +
        "첨부된 이미지 중 **" +
        styleStart +
        "~" +
        styleEnd +
        "번째**는 이 게임의 공식 아트 스타일 샘플이다.\n" +
        "\n" +
        "**참고할 것 (✅)**: 선의 두께 변화, 쉐이딩 기법, 색 팔레트 방향성, 질감 수준, 전반적 톤·분위기.\n" +
        "**절대 가져오면 안 되는 것 (❌)**: 레퍼런스 속 캐릭터·생물·물체의 **형상/실루엣/포즈**, " +
        "심볼·장식·특정 디자인 요소, 얼굴·표정, 배경 소품.\n" +
        "\n" +
        "**판단 기준**: '이 레퍼런스는 내가 그릴 대상을 **어떤 붓으로** 그릴지만 알려주는 것이지, " +
        "**무엇을 그릴지**는 오직 아래 엔티티 정보(ID/이름/설명)만이 결정한다.'\n" +
        "레퍼런스 속 주제를 그대로 재현하면 생성 실패로 간주된다. 화풍만 빌려오고 내용은 프롬프트에 따라 새로 그릴 것.\n"
      : "";

  const envNote =
    envRefs.length > 0
      ? "\n\n# 환경 레퍼런스 (" +
        envStart +
        "~" +
        envEnd +
        "번째, 총 " +
        envRefs.length +
        "장) — 🗺️ **배경 맵**, 캐릭터가 실제로 설 장소\n" +
        "첨부된 이미지 중 **" +
        envStart +
        "~" +
        envEnd +
        "번째**는 이 캐릭터가 Unity 전투 씬에서 합성될 **실제 배경 맵**이다.\n" +
        "캐릭터는 여전히 **투명 배경 스프라이트**로만 출력한다 — 맵을 그리지 말 것. " +
        "맵은 캐릭터가 그 위에 얹혔을 때 **시각적으로 어색하지 않도록** 색·톤·밀도를 맞추기 위한 참고일 뿐.\n" +
        "\n" +
        "**참고할 것 (✅)**:\n" +
        "- 색 팔레트 (주조색·보조색·악센트) 와 전반적 채도·명도\n" +
        "- 광원 방향, 그림자의 색감(검정이 아니라 어두운 녹·청 계열), 안개·대기 원근의 농도\n" +
        "- 배경 식생·이끼·돌 질감의 톤 — 캐릭터 몸에 동일 톤의 이끼·잎·먼지 묻히면 자연스러움\n" +
        "- 디테일 밀도와 선화 거칠기 (배경과 캐릭터의 '붓 언어'가 같아야 이질감 없음)\n" +
        "\n" +
        "**절대 하지 말 것 (❌)**:\n" +
        "- 맵 속 **특정 오브젝트**(돌기둥·아치·석상·부조·공룡 갈비뼈·검·깃발·계단·제단)를 캐릭터 몸이나 주변에 복사·편입\n" +
        "- 캐릭터 뒤에 맵 일부를 **배경으로 렌더** — 반드시 완전 투명 알파\n" +
        "- 맵의 바닥·흙·돌포장을 캐릭터 발 아래에 그리기\n" +
        "\n" +
        "**판단 기준**: '이 맵은 내가 그릴 캐릭터가 **얹힐 바닥**이다. 같은 화가가 같은 날 같은 팔레트로 그렸을 만큼 톤이 맞아야 하지만, " +
        "맵 위의 어떤 물체도 캐릭터 디자인에 스며들면 안 된다.'\n"
      : "";

  const chainNote =
    chainRefs.length > 0
      ? "\n\n# 체인 레퍼런스 (" +
        chainStart +
        "~" +
        chainEnd +
        "번째, 총 " +
        chainRefs.length +
        "장)\n" +
        "첨부된 이미지 중 **" +
        chainStart +
        "~" +
        chainEnd +
        "번째**는 같은 파이프라인의 이전 단계 결과물이다.\n" +
        "이 이미지의 **캐릭터 외형·색상·비율·디자인**을 그대로 가져와\n" +
        "완전히 동일한 캐릭터로 인식되도록 그려라. 새 캐릭터를 만들지 말 것.\n" +
        "(단, 본 에이전트의 시점/포즈/배경/크기 규칙은 반드시 따를 것)\n"
      : "";

  const prompt = basePrompt + styleNote + envNote + chainNote;

  const { base64 } = await generateImage(prompt, agent.model_image, allRefs);
  const inputBuffer = Buffer.from(base64, "base64");

  // 투명 배경 에셋은 alpha 채널을 강제로 보장 — Gemini가 흰 배경 RGB로 주는 경우도 있음.
  let pipeline = sharp(inputBuffer);
  if (opts.transparentBackground) pipeline = pipeline.ensureAlpha();

  pipeline = pipeline.resize(agent.output.width, agent.output.height, {
    fit,
    // lanczos3 커널 = sharp 기본이 이미 lanczos3. 명시적으로 두어 향후 조정 포인트 남김.
    kernel: sharp.kernel.lanczos3,
    withoutEnlargement: false, // Gemini가 512 주면 1024로 upscale. 해상도 일관성 우선.
    background: opts.transparentBackground
      ? { r: 0, g: 0, b: 0, alpha: 0 }
      : { r: 0, g: 0, b: 0, alpha: 1 },
  });

  if (agent.output.format === "png") {
    // PNG 무손실. compressionLevel 6(기본)은 속도·용량 균형. 9는 더 작지만 느림.
    pipeline = pipeline.png({
      compressionLevel: 6,
      adaptiveFiltering: true,
      palette: false, // 팔레트 안 쓰고 truecolor 유지 — 그라데이션/소프트엣지 손실 방지
    });
  } else if (agent.output.format === "jpeg") {
    pipeline = pipeline.jpeg({ quality: 95, mozjpeg: true });
  } else if (agent.output.format === "webp") {
    pipeline = pipeline.webp({ quality: 95, lossless: false, effort: 4 });
  }

  const resized = await pipeline.toBuffer();

  const filename = fillTemplate(agent.output.filename, filenameValues ?? values);
  const outDir = path.join(process.cwd(), agent.output.save_to);
  await fs.mkdir(outDir, { recursive: true });
  const savedPath = path.join(outDir, filename);
  await fs.writeFile(savedPath, resized);

  const publicSub = agent.output.save_to.replace(/^public[/\\]/, "").replace(/\\/g, "/");
  const publicPath = `/${publicSub}/${filename}?t=${Date.now()}`;

  return {
    filename,
    publicPath,
    promptUsed: prompt,
    savedPath,
    styleRefCount: styleRefs.length,
    envRefCount: envRefs.length,
    chainRefCount: chainRefs.length,
  };
}

export function getPromptPreview(
  agent: AgentSpec,
  values: Record<string, string>
): string {
  return fillTemplate(agent.body, values);
}
