export type Motion = "idle" | "attack" | "hit" | "die" | "summon" | "special";

export const MOTIONS: Motion[] = ["idle", "attack", "hit", "die", "summon", "special"];

type MotionPlan = (frameIndex: number, frameCount: number) => string;

const plans: Record<Motion, MotionPlan> = {
  idle: (i, n) =>
    `호흡 사이클의 ${i}/${n} 단계. 상체를 아주 살짝 ${i % 2 === 0 ? "내리고" : "들어올리고"} 있다. 대기 자세 유지, 전체 움직임은 매우 미세.`,
  attack: (i, n) => {
    const t = n === 1 ? 1 : (i - 1) / (n - 1);
    if (t < 0.25) return "준비 자세: 몸을 약간 뒤로 당기고 근육에 힘이 들어간다.";
    if (t < 0.5) return "돌입: 앞으로 무게중심을 옮기며 팔/입/머리가 목표를 향해 빠르게 나아간다.";
    if (t < 0.75) return "최대 타격 순간: 가장 앞으로 뻗어나간 공격 자세. 역동성 최대.";
    return "복귀: 힘을 빼고 대기 자세로 돌아오는 중. 살짝 떨림 느낌.";
  },
  hit: (i, n) => {
    const t = n === 1 ? 1 : (i - 1) / (n - 1);
    if (t < 0.33) return "피격 순간: 충격으로 상체가 꺾이며 뒤로 밀린다. 고통스러운 표정.";
    if (t < 0.66) return "뒤로 밀리는 중: 균형을 잃고 한쪽 발이 뒤로 끌린다.";
    return "회복 자세: 아직 움찔하지만 서서히 원래 자세로 돌아오는 중.";
  },
  die: (i, n) => {
    const t = n === 1 ? 1 : (i - 1) / (n - 1);
    if (t < 0.25) return "치명상: 크게 움찔하며 무릎이 꺾이기 시작. 고개가 떨어진다.";
    if (t < 0.5) return "무너짐: 한쪽으로 몸이 기울며 쓰러지기 시작.";
    if (t < 0.75) return "낙하: 몸이 거의 지면에 닿기 직전. 사지가 늘어진다.";
    return "완전히 누움: 기절 또는 사망 자세. 움직임 없음.";
  },
  summon: (i, n) => {
    const t = n === 1 ? 1 : (i - 1) / (n - 1);
    if (t < 0.33) return "소환 시작: 바닥에서 빛기둥이 솟고 실루엣만 희미하게 보인다.";
    if (t < 0.66) return "형태 잡힘: 캐릭터의 윤곽과 주요 디테일이 절반 정도 드러남. 빛 입자가 감싸는 중.";
    return "등장 완료: 캐릭터가 대기 자세로 완전히 모습을 드러냄. 빛 잔상만 남음.";
  },
  special: (i, n) =>
    `고유 스킬 프레임 ${i}/${n}. 강한 포징과 힘의 결집 느낌. 주변에 스킬 이펙트 힌트(빛/오라/전조) 동반.`,
};

export function frameHint(motion: Motion, frameIndex: number, frameCount: number): string {
  const plan = plans[motion];
  if (!plan) return `${motion} 프레임 ${frameIndex}/${frameCount}`;
  return plan(frameIndex, frameCount);
}
