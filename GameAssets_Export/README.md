# DianoCard 게임 내 PNG 에셋 모음

현재 `Assets/Resources` 안에 들어 있는 게임 본 에셋 PNG 파일을 한 곳에 모은 폴더입니다.
(서드파티 이펙트 패키지인 JMO Assets / Cartoon FX Remaster의 PNG는 제외했습니다.)

- 총 파일 수: **159개**
- 원본 위치: `DianoCard/DianoCard/Assets/Resources/`
- 추출 일자: 2026-04-18

---

## 폴더 구성

### 01_Lobby (7) — 메인 로비/타이틀 화면
`Main`, `Main_Background`, `SinglePlay`, `AIPlay`, `Settings`, `Quit`, `DinoCard` 등 메인 메뉴 버튼/배경.

### 02_CharacterSelect (10) — 캐릭터 선택 화면
- `Background/` — 배경
- `UI/` — 패널 프레임, 슬롯(Locked/Selected), Back/Confirm 버튼
- `Icon/` — coin / heart / passive 아이콘
- 루트: `Char_Archaeologist_Card.png` (캐릭터 카드 이미지)

### 03_Map (13) — 지도 화면
지도 배경, UI 프레임, 노드 종류별 아이콘 (`Node_Boss/Elite/Combat/Camp/Event/Merchant/Start`), 연결선(`Rope`), 범례 패널 등.

### 04_Battle/ — 인게임 전투 관련
- **Backgrounds/** (4) — 전투 배경 (Normal/Elite/Boss)
- **InGame_UI/** (16) — 상단 바, 턴 종료 버튼, 인게임 아이콘 (HP/Mana/Gold/Shield/Attack/Deck/Discard/Floor/Turn/Potion/Relic/CardBack 등)
- **Character_InField/** (7) — 전투 중 플레이어 캐릭터
  - `Char_Archaeologist_Field.png` (단일 스프라이트)
  - `Archaeologist/` — Idle/Strike/StrikeExtended/Whip/Windup/SummonCast 모션
- **Monsters/** (3) — `E001_MossSlime`, `E002_RockSlime`, `E003_ToxicSlime`
- **FX/** (7) — 전투 연출 이펙트 (GodRay, Bat, Vines)

### 05_Cards/ — 카드 관련
- **Slot/** (9) — 카드 슬롯 프레임 (`CardArtFrame`, `CardBg`, `CardBorder`, `CardCountBadge`, `CardDescPanel`, `ManaFrame`) + `old/` (구버전 백업)
- **Art_Spell/** (7) — 스펠 카드 일러스트 (Fireball, Lightning, Meteor, Ward, AttackSpell, DefenseSpell + `Effect/ShieldBubble`)
- **Art_Summon/** (10) — 소환 카드 일러스트 (공룡 10종)
- **Art_Utility/** (9) — 유틸 카드 일러스트 (Berserk, Cleave, Draw, Excavate, HealAll, PowerUp, Regenerate, Roar, Sacrifice)

### 06_Dinos (10) — 소환된 공룡 인필드 스프라이트
Ankylosaurus, Carnotaurus, Compsognathus, Dilophosaurus, Pteranodon, Raptor, Spinosaurus, Stegosaurus, T-Rex, Triceratops.
※ `05_Cards/Art_Summon`의 카드 일러스트와는 다른 인게임용 스프라이트입니다.

### 07_Reward (16) — 전투 보상 화면
배경/패널, 보상 아이콘 (Gold, Deck, Potion, Relic, MedallionRing), Continue/Row 버튼, `CardPicker/` (카드 선택 UI: Frame, Panel, Ribbon, SkipButton, TitleDivider, TextChooseCard).

### 08_Shop (16) — 상점 UI
배경, 카드 슬롯 세트 (Frame/Bg/Border/Desc), 진열 아이콘 (Gold, Potion, Relic, Deck, MedallionRing), 섹션 배너, Row 버튼, Node_Merchant 등.

### 09_Village (15) — 마을/캠프 화면
배경, NPC, 패널, OptionCardPanel, RestHeart, TreasureChest, 분리선(`divider_village`), `Tribal_wooden_1` 등.

---

## 참고

- 같은 이름의 아이콘이 여러 폴더에 있는 경우(예: `Gold.png`, `Potion_Bottle.png`, `RelicIcon.png`)는 화면(InGame/Reward/Shop/Village)별로 별도 본을 들고 있어 그대로 분리해 두었습니다. 톤/사이즈가 다를 수 있으니 통합 시 확인 부탁드립니다.
- `CardSlot/old/`, `Map/Map_Background_.png`(언더스코어 추가본) 등 구버전/중복 의심 파일도 누락 없이 포함되어 있으니 정리 시 참고해 주세요.
