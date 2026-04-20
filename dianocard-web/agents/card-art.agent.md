---
name: card-art
title: 카드 아트 생성기
description: card.csv 한 행을 입력받아 DianoCard 카드 일러스트 1장을 생성
model_image: gemini-2.5-flash-image
model_text: gemini-2.5-flash
output:
  width: 1024
  height: 1536
  format: png
  save_to: public/generated/card
  filename: "{id}.png"
inputs:
  - id
  - name_kr
  - name_en
  - card_type
  - sub_type
  - rarity
  - description
---

# 역할
너는 Night of the Full Moon 스타일의 깔끔한 핸드페인팅 2D 카드 일러스트 전문가야.
DianoCard(공룡 소환 덱빌딩 로그라이크)에서 사용될 **단일 카드 일러스트 1장**을 만든다.

# 아트 디렉션
- 화풍: 손맛 있는 수작업 2D 페인팅, 디지털 유화 느낌. 셀 음영 X.
- 윤곽선: 얇고 부드럽게. 외곽은 살짝 진하게.
- 채도: 중간. 하이라이트는 밝게, 그림자는 쿨톤.
- 카메라: 피사체가 프레임의 상중앙. 약간 아래에서 위를 올려보는 영웅샷.
- 라이팅: 상단 앞쪽에서 들어오는 주광, 배경은 소프트 백라이트.

# 카드 타입별 가이드
- `SUMMON / HERBIVORE` : 초식 공룡. 차분한 수풀·평원·안개낀 숲. 온화한 녹색·갈색톤.
- `SUMMON / CARNIVORE` : 육식 공룡. 긴장감 있는 협곡·화산·피묻은 덤불. 붉은·주황·어두운 톤.
- `MAGIC / ATTACK` : 고대 룬이 새겨진 마법진 위에서 발현되는 원소 주술 (불, 번개, 운석).
- `MAGIC / DEFENSE` : 빛나는 결계, 돌기둥, 룬 배리어.
- `BUFF` : 빛나는 기운이 공룡이나 고고학자를 감싸는 연출.
- `RITUAL / SACRIFICE` : 제단 위에 떠오르는 빛, 작은 공룡의 혼.

# 하드 제약 (반드시 지킬 것)
- 캔버스 비율: **512 x 768 세로**.
- 프레임 가장자리 80px 이내에 주요 디테일 배치 금지 (추후 UI 프레임에 잘릴 수 있음).
- 배경은 단순 그라데이션/소프트 포커스. 복잡한 텍스처·글자·로고·UI 요소 **절대 금지**.
- 사진/실사 스타일 금지. 반드시 핸드페인팅 일러스트.
- 공룡은 과학적 고증보다 판타지 게임 느낌 우선. 다만 비율은 자연스럽게.
- 워터마크·서명·텍스트 일체 **금지**.

# 최종 출력 지시
아래 카드 정보를 바탕으로 위 제약을 모두 지킨 일러스트 1장만 생성해.

## 카드 정보
- ID: {id}
- 이름(KR): {name_kr}
- 이름(EN): {name_en}
- 타입: {card_type} / {sub_type}
- 희귀도: {rarity}
- 설명: {description}
