# DianoCard Asset Studio

Gemini 2.5 Flash Image (Nano Banana)으로 DianoCard 게임 에셋을 뽑는 로컬 전용 Next.js 허브.

## 구현된 에이전트 (7개)

| 에이전트 | 용도 | 입력 | 출력 크기 | 배경 |
|----------|------|------|-----------|------|
| `card-art` | 카드 일러스트 | card.csv 행 | 512×768 | 단순 그라데이션 |
| `field-summon` | 맵 위 소환수 스프라이트 | card.csv (SUMMON만) | 512×512 | 투명 |
| `field-monster` | 맵 위 몬스터 스프라이트 | enemy.csv 행 | 512×512 | 투명 |
| `card-effect` | 카드 사용 이펙트 오버레이 | card.csv 행 | 512×512 | 투명 |
| `enemy-passive` | 몬스터 패시브 뱃지 아이콘 | enemy_passive.csv 행 | 128×128 | 투명 |
| `icon` | UI/상태이상 아이콘 | 프리폼 (label + concept) | 256×256 | 투명 |
| `move-board` | N프레임 모션 시트 (Unity용) | 기존 스프라이트 ref + motion + N | 512×512 × N | 투명 |

## 구조

```
dianocard-web/
├── agents/                           # 에이전트 스펙 (frontmatter + 프롬프트 본문)
│   ├── card-art.agent.md
│   ├── field-summon.agent.md
│   ├── field-monster.agent.md
│   ├── card-effect.agent.md
│   ├── icon.agent.md
│   └── move-board.agent.md
├── app/
│   ├── page.tsx                      # 에이전트 허브 (6개 카드)
│   ├── _components/EntityGenerator.tsx  # 공통 리스트→프롬프트→생성 UI
│   ├── card-art/page.tsx
│   ├── field-summon/page.tsx
│   ├── field-monster/page.tsx
│   ├── card-effect/page.tsx
│   ├── enemy-passive/page.tsx        # enemy_passive.csv → 128×128 뱃지
│   ├── icon/page.tsx                 # 프리폼 입력
│   ├── move-board/page.tsx           # ref + motion + frame count
│   └── api/
│       ├── agents/route.ts           # GET 에이전트 목록
│       ├── cards/route.ts            # GET card.csv
│       ├── enemies/route.ts          # GET enemy.csv
│       ├── passives/route.ts         # GET enemy_passive.csv
│       ├── generate-card/route.ts
│       ├── generate-field-summon/route.ts
│       ├── generate-field-monster/route.ts
│       ├── generate-card-effect/route.ts
│       ├── generate-enemy-passive/route.ts
│       ├── generate-icon/route.ts
│       └── generate-move-board/route.ts
├── lib/
│   ├── agent-loader.ts               # md frontmatter 파싱
│   ├── csv.ts                        # ../Table/*.csv 읽기
│   ├── gemini.ts                     # Nano Banana 호출 (ref 이미지 지원)
│   ├── generate.ts                   # 공통: 호출 → sharp 리사이즈 → PNG 저장
│   └── motion.ts                     # 모션별 프레임 힌트 사전
└── public/generated/
    ├── card/                         # card-art 결과
    ├── field-summon/
    ├── field-monster/
    ├── card-effect/
    ├── icon/
    └── move-board/                   # 개별 프레임 + 가로 스프라이트 시트
```

## 데이터 소스

**2026-04 변경**: 이제 Unity 프로젝트의 런타임 CSV를 직접 읽습니다 (기존 `DianoCardPlan/Table/`은 동기화 안 된 스냅샷이라 폐기).

경로: `../../DianoCard/DianoCard/Assets/Resources/Tables/` (상대경로는 web 프로젝트 루트 기준)

- `card.csv` — 모든 카드 (C001~C901 포함)
- `enemy.csv` — 적 (E001~E904). 스키마: `pattern_set_id / phase_set_id / passive_ids` (과거 `ai_pattern` 제거됨)
- `enemy_passive.csv` — 몬스터 패시브 카탈로그 (enemy-passive 에이전트 소스)

## 세팅

```bash
cp .env.local.example .env.local
# .env.local 에 GEMINI_API_KEY 채우기

npm run dev
# http://localhost:8000
```

## 플로우

### card-art / field-summon / field-monster / card-effect
1. 허브에서 해당 에이전트 클릭
2. 좌측 리스트(카드 or 적)에서 항목 선택
3. 우측에 에이전트 md + 데이터 합성한 프롬프트 초안이 자동 로드
4. (선택) 프롬프트 수정
5. "이미지 생성" → Gemini 호출 → sharp 리사이즈 → `public/generated/{카테고리}/{id}.png` 저장

### icon
- 프리폼: slug(파일명) + label + concept 입력 → 프롬프트 자동 합성 → 생성

### move-board (참조 이미지 필요)
1. 먼저 `field-summon` 또는 `field-monster` 로 대상 스프라이트 생성 (예: `C001.png`)
2. move-board 페이지에서:
   - **참조 소스** 선택 (field-summon / field-monster / card)
   - **Ref ID** 입력 (예: `C001`, `E001`)
   - **Motion** 선택 (idle / attack / hit / die / summon / special)
   - **Frame Count** 슬라이더 (2–8)
3. 생성 시: 각 프레임마다 참조 이미지를 Gemini에 inlineData로 함께 전달 → 포즈만 다른 N장 생성 → 가로로 이어붙인 **스프라이트 시트** + 개별 프레임 모두 저장
4. Unity에서 시트를 slicing 해서 애니메이션 클립으로 사용

## 공용 스타일 락

**`agents/_style-lock.md`** — 모든 에이전트 프롬프트 맨 앞에 자동 prepend 되는 공용 규칙. 선 품질·쉐이딩·AI티 억제·공룡 스프라이트 치수(크기·위치·방향·각도) 등 **전 에셋에 일관되게 적용될 규칙**만 담긴다.

**여기서 한 줄 고치면 모든 에셋에 즉시 반영** — 핸드페인팅 특정 아티스트 톤으로 맞추고 싶거나, AI티가 너무 나서 선 느낌을 더 거칠게 바꾸고 싶을 때 이 파일 하나만 수정하면 됨.

주요 블록:
1. 선(line) 규칙 — 가변 두께, 손맛 있는 획, 기계적 완벽 선 금지
2. 쉐이딩 — 셀셰이딩 2~3톤, 에어브러시 그라데이션 금지
3. 질감 — 수채·붓자국 허용, 포토리얼 금지
4. 크기·위치 — **전체 높이 70% / 발바닥 Y=85% / 머리 위 여백 15%** (비행은 발바닥 Y=60%)
5. 방향·각도 — 아군은 **오른쪽 3/4 측면 20도**, 적은 **거울상 왼쪽 3/4 20도**
6. 하드 네거티브 — 3D CG 느낌, HDR 광택, AI 대칭 얼굴 등

개별 에이전트 MD는 이 공용 락 위에 **도메인 고유 규칙만** 덧씀 (예: field-summon의 초식/육식 색상 가이드, field-monster의 티어별 크기 보정).

---

## 에셋 커버리지 노트

**CSV 기반 에이전트로 바로 뽑을 수 있는 것**
- 모든 카드 (C001~C901) — `card-art` / `card-effect` (+ SUMMON은 `field-summon`)
- 모든 적 (E001~E904) — `field-monster`
- 패시브 뱃지 — `enemy-passive`

**CSV에 없는 에셋은 프리폼 경로로**
- **이끼 쫄**, **홀린 공룡** (E901 전용 런타임 소환 유닛): enemy.csv에 엔트리 없음 (게임이 inline data로 스폰). 필요하면 `icon` 프리폼이나 enemy.csv에 `M_MOSS_GUARD` / `M_MOSS_ATTACK` / `M_STOLEN_DINO` 가상 행을 추가 후 `field-monster` 사용 (게임 런타임엔 영향 없음).
- **상태이상 아이콘** (독/약화/취약/침묵/도발): `icon` 프리폼. slug 지정 후 concept에 비주얼 설명.
- **테크트리 속성 아이콘** (힘/방어/지혜/민첩/의지): `icon` 프리폼.
- **챕터 배경**: 현재 전용 에이전트 없음. 필요 시 `background.agent.md` 신규 추가 가능.

## 에이전트 추가 방법

1. `agents/<name>.agent.md` 생성 (frontmatter 포맷은 `card-art.agent.md` 참고)
2. `app/api/generate-<name>/route.ts` 복제 후 수정
3. 리스트 기반이면 `app/<name>/page.tsx` 에서 `EntityGenerator` 재사용, 프리폼이면 `app/icon/page.tsx` 참고
4. `app/page.tsx` 의 `AGENT_ROUTES` 에 경로 등록
