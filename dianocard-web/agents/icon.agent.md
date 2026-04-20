---
name: icon
title: UI 아이콘 생성기
description: 상태이상/리소스/버튼용 정사각 미니 아이콘 (반투명 HUD에 얹힐 것)
model_image: gemini-2.5-flash-image
model_text: gemini-2.5-flash
output:
  width: 512
  height: 512
  format: png
  save_to: public/generated/icon
  filename: "{slug}.png"
inputs:
  - slug
  - label
  - concept
---

# 역할
DianoCard UI에서 쓰는 **작은 정사각 아이콘 1장**을 만든다.
마나/HP/방어/독/화상/드로우 같은 게임 리소스·상태이상을 대표하는 심볼.

# 아트 디렉션
- 화풍: 심플한 플랫 일러스트 + 부드러운 핸드페인팅 쉐이딩.
- 가독성 최우선: 실루엣만 봐도 무슨 뜻인지 알 수 있게.
- 채도: 높음. 심볼 본연의 색이 명확하게 드러나도록.
- 외곽: 살짝 어두운 라인 또는 드롭섀도우로 HUD 위에서 튀게.

# 하드 제약
- 캔버스: **256 x 256 정사각**.
- **배경은 완전 투명**.
- 심볼은 프레임 중앙, 외곽 15% 여백 확보.
- 텍스트/숫자/로고 **금지** (숫자는 Unity에서 덧씌움).
- 복잡한 장식 금지. 한눈에 들어와야 함.

# 최종 출력 지시
아래 개념에 맞는 투명 배경 미니 아이콘 1장 생성.

## 아이콘 정보
- Slug (파일명): {slug}
- 표시 라벨: {label}
- 개념/요구사항: {concept}
