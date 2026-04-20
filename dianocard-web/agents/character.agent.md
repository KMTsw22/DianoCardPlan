---
name: character
title: 플레이어 캐릭터 생성기
description: character.csv의 플레이어 캐릭터(고고학자 등) 필드 포즈 스프라이트. 이 이미지를 기반으로 move-board에서 모션 프레임을 뽑을 수 있음.
model_image: gemini-2.5-flash-image
model_text: gemini-2.5-flash
output:
  width: 1024
  height: 1536
  format: png
  save_to: public/generated/character
  filename: "{id}.png"
inputs:
  - id
  - name_kr
  - name_en
  - description
  - passive_name
  - passive_description
---

# 역할
DianoCard의 **플레이어 캐릭터(소환사) 전신 스프라이트 1장**을 만든다.
이 이미지가 전투 화면에서 왼쪽에 서 있는 캐릭터가 되며, 이후 `move-board` 에이전트의 참조로 사용돼 공격·소환·피격 등 모션 프레임이 생성된다.

# 도메인 제약

- 시점·화풍·선/쉐이딩 규칙은 **공용 스타일 락**을 그대로 따를 것.
- **바라봄**: 화면 **오른쪽** 향함 (적 쪽). 3/4 측면 뷰, 카메라 쪽으로 약 20도 열림.
- **전신 샷**: 머리 끝부터 발바닥까지 포함. 프레임 80% 이내.
- **발바닥 Y=90%** (아래 여백 10%) — 더 낮게 두어 캐릭터 풀바디가 화면에 올곧게 섬.
- **공룡·적 등 다른 캐릭터 금지** — 캐릭터 혼자만 등장. 배경 완전 투명.

# 포즈 / 표정

- **대기(idle)** 자세: 힘 있게 서있는 자연스러운 포즈. 약간의 콘트라포스토 OK.
- 한 손은 유물/무기/마법구를 들고 있어도 됨 (`{description}` 기반).
- 표정은 차분하고 결의 찬 느낌. 과한 미소·공격성 X.
- 복장·헤어는 `{description}`의 직업/세계관 반영.

# 복장·소품 가이드

- `{passive_name}`·`{passive_description}`에 명시된 테마를 의상·소품에 녹임.
  - 예: "Relic Bond" → 허리에 유물 주머니, 목걸이에 작은 화석
  - 예: "Archaeologist" → 고고학자 복장 (긴 가운/탐사복), 발굴 도구 허리춤
- 복장은 Night of the Full Moon 스타일 판타지 톤 — 현대 의복 금지, 판타지 중세~마법학자 믹스.

# 색 팔레트

- 기본적으로 캐릭터별 시그니처 톤 유지:
  - 고고학자: 크림·갈색 로브 + 검은 드레스 + 금빛 유물 포인트

# 최종 출력 지시

스타일 락을 준수하면서 투명 배경 + 오른쪽 향함 + 전신 대기 포즈의 캐릭터 스프라이트 1장.

## 대상 정보
- ID: {id}
- 이름: {name_kr} ({name_en})
- 설명: {description}
- 패시브: {passive_name} — {passive_description}
