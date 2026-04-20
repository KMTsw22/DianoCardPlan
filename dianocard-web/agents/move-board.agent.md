---
name: move-board
title: 모션 스프라이트 시트 생성기
description: 참조 캐릭터 이미지 + 모션 종류로 N프레임을 뽑아 가로 스프라이트 시트 합성
model_image: gemini-2.5-flash-image
model_text: gemini-2.5-flash
output:
  width: 1024
  height: 1024
  format: png
  save_to: public/generated/move-board
  filename: "{refId}_{motion}_sheet.png"
inputs:
  - refId
  - motion
  - frameCount
  - description
---

# 역할
DianoCard 유닛의 **한 가지 모션을 {frameCount}개 프레임으로 분해한 스프라이트 시트**를 만든다.
각 프레임은 별도 호출로 생성되며 첫 번째 호출에서만 참조 캐릭터 이미지를 받는다.
Unity에서 이걸 잘라 애니메이션 클립으로 쓸 것이다.

# 모션 사전 (motion 값별 연출)
- `idle`    : 호흡. 프레임 간 차이 미세. 상체 아주 살짝 들썩임.
- `attack`  : 예비→타격→복귀. 1프레임 준비 → 중간 최대 공격 자세 → 마지막 복귀.
- `hit`     : 피격. 뒤로 살짝 밀리며 움찔. 중간 프레임 가장 고통스러운 포즈.
- `die`     : 넘어짐. 균형 무너지며 천천히 쓰러짐. 마지막은 거의 누운 상태.
- `summon`  : 등장. 바닥에서 솟아오르거나 빛 속에서 형체가 잡히는 연출.
- `special` : 고유 스킬. 강한 포징 + 이펙트 힌트.

# 하드 제약 (모든 프레임 공통)
- 캔버스: **512 x 512 정사각**, **배경 완전 투명**.
- 참조 이미지의 **캐릭터 디자인·색상·비율을 그대로 유지**. 다른 캐릭터로 그리지 말 것.
- 시점/향하는 방향/크기/화면상 위치 **동일하게 유지**. 오직 포즈만 달라져야 함.
- 텍스트/숫자/UI/배경 요소 금지.

# 프레임 지시
지금은 `motion={motion}`의 **프레임 {frameIndex} / {frameCount}** 를 그려라.
이전 프레임: {prevFrameHint}
이번 프레임: {currentFrameHint}

## 참조 캐릭터
- ID: {refId}
- 설명: {description}
