import Link from "next/link";
import { listAgents } from "@/lib/agent-loader";

const AGENT_ROUTES: Record<string, string> = {
  "card-art": "/card-art",
  "field-summon": "/field-summon",
  "field-monster": "/field-monster",
  "card-effect": "/card-effect",
  "attack-fx": "/attack-fx",
  "enemy-passive": "/enemy-passive",
  character: "/character",
  "move-board": "/move-board",
  icon: "/icon",
};

export default async function Home() {
  const agents = await listAgents();

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <main className="max-w-5xl mx-auto px-8 py-16">
        <header className="mb-12">
          <h1 className="text-4xl font-bold mb-2">DianoCard Asset Studio</h1>
          <p className="text-zinc-400">
            Gemini 2.5 Flash Image (Nano Banana) 기반 게임 에셋 생성 에이전트 허브
          </p>
        </header>

        <section className="mb-10">
          <h2 className="text-xl font-semibold mb-4 text-zinc-300">Pipeline</h2>
          <Link href="/pipeline">
            <div className="p-5 rounded-lg border border-indigo-800 bg-indigo-950 hover:bg-indigo-900 transition">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-lg">카드 → 이펙트 → 공룡 파이프라인</h3>
                <span className="text-xs text-indigo-300">체이닝</span>
              </div>
              <p className="text-sm text-indigo-200">
                카드 한 장을 고르고 실행할 단계를 체크하면, 앞 단계 결과 이미지를 다음 단계의 참조로 자동 전달해서
                같은 캐릭터가 일관되게 나오도록 연결 생성합니다.
              </p>
            </div>
          </Link>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-4 text-zinc-300">개별 Agents</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {agents.map((a) => {
              const href = AGENT_ROUTES[a.name];
              const disabled = !href;
              const card = (
                <div
                  className={`p-5 rounded-lg border border-zinc-800 bg-zinc-900 transition ${
                    disabled ? "opacity-50" : "hover:border-zinc-600 hover:bg-zinc-800"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-lg">{a.title}</h3>
                    <code className="text-xs text-zinc-500">{a.name}</code>
                  </div>
                  <p className="text-sm text-zinc-400 mb-3">{a.description}</p>
                  <div className="text-xs text-zinc-500 space-y-1">
                    <div>
                      <span className="text-zinc-600">image:</span> {a.model_image}
                    </div>
                    <div>
                      <span className="text-zinc-600">output:</span> {a.output.width}×
                      {a.output.height} {a.output.format}
                    </div>
                  </div>
                  {disabled && (
                    <div className="mt-3 text-xs text-amber-500">UI 미구현</div>
                  )}
                </div>
              );
              return href ? (
                <Link key={a.name} href={href}>
                  {card}
                </Link>
              ) : (
                <div key={a.name}>{card}</div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
