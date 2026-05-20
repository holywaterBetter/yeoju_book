import type { SiteContent } from "./types";

const externalLinks = {
  reservationUrl: "",
  kakaoChannelUrl: ""
};

export const siteContent: SiteContent = {
  ko: {
    meta: {
      title: "여주 자전거 시티투어 | 따르릉 여주 한글길",
      description:
        "남한강 자전거길을 따라 한글 자음 스토리텔링으로 여주의 역사, 자연, 문화를 만나는 가이드 전기자전거 투어"
    },
    navigation: [
      { label: "투어 소개", href: "#intro" },
      { label: "코스", href: "#courses" },
      { label: "안전", href: "#safety" },
      { label: "FAQ", href: "#faq" },
      { label: "오시는 길", href: "#access" }
    ],
    externalLinks: {
      ...externalLinks,
      reservationLabel: "예약 링크 준비 중",
      kakaoLabel: "문의 링크 준비 중"
    },
    hero: {
      title: "따르릉 여주 한글길",
      subtitle: "가이드가 안내하는 여주 전기자전거 시티투어",
      body:
        "남한강의 풍경과 세종의 도시 여주를 전기자전거로 달리며 한글 자음마다 숨은 장소 이야기를 만납니다.",
      primaryCta: "예약하기",
      secondaryCta: "카카오톡 문의"
    },
    intro: {
      title: "강변 라이딩과 역사 해설이 만나는 여주",
      body:
        "여주는 남한강의 자연환경, 여주 쌀과 도자 문화, 세종대왕릉과 신륵사로 대표되는 역사 자원을 함께 품은 도시입니다. 투어는 선두와 후미 가이드가 동행하며, 안전한 주행과 현장 해설을 함께 제공합니다."
    },
    courses: [
      {
        id: "sejong",
        name: "한글길 세종편",
        distance: "약 19km",
        duration: "약 5시간",
        rideTime: "자전거 주행 약 110분",
        difficulty: "5점 중 2점",
        highlights: ["영월루", "여주보 전망대", "세종대왕릉(영릉)"],
        cautions: [
          "자전거·보행자 겸용 구간에서는 우측 주행을 유지합니다.",
          "다리 통과 구간과 중앙 볼라드 주변에서는 속도를 줄입니다.",
          "여주대교 아래 데크길과 영릉 진입로에서는 하차 후 이동합니다."
        ],
        points: [
          {
            marker: "ㄱ",
            title: "금은모래강변공원",
            description: "남한강을 가장 가까이에서 만나는 집결 및 주행 연습 구간입니다.",
            safetyNote: "캠핑장과 공원 보행자, 어린이 통행을 확인합니다."
          },
          {
            marker: "ㄴ",
            title: "남한강 자전거길",
            description: "강변 풍경을 따라 이어지는 평탄한 라이딩 구간입니다.",
            safetyNote: "보행자와 일반 자전거 이용자 사이의 간격을 유지합니다."
          },
          {
            marker: "ㄷ",
            title: "도자기",
            description: "여주의 생활 도자 문화와 지역 산업을 소개하는 해설 포인트입니다.",
            safetyNote: "정차 시 우측 가장자리로 대열을 정리합니다."
          },
          {
            marker: "ㅇ",
            title: "영월루",
            description: "남한강과 여주 시가지를 조망하는 대표 문화유산입니다.",
            safetyNote: "언덕길과 주차 차량 주변에서는 감속합니다."
          },
          {
            marker: "ㅁ",
            title: "마암",
            description: "여주 지명과 연결된 말 바위 전설을 소개하는 구간입니다.",
            safetyNote: "데크길에서는 하차 이동을 원칙으로 합니다."
          },
          {
            marker: "ㅂ",
            title: "보물",
            description: "신륵사와 여주의 문화유산 이야기를 연결합니다.",
            safetyNote: "합류 지점과 횡단 구간에서 속도를 줄입니다."
          },
          {
            marker: "ㅅ",
            title: "쌀",
            description: "대왕님께 올리던 여주 쌀의 역사와 평야 이야기를 소개합니다.",
            safetyNote: "쉼터 진입 전 대열 간격을 다시 맞춥니다."
          },
          {
            marker: "ㅈ",
            title: "자격루",
            description: "세종대왕의 과학 정신과 여주보 디자인을 연결하는 포인트입니다.",
            safetyNote: "여주보 주변 볼라드와 공사 구간을 확인합니다."
          },
          {
            marker: "ㅊ",
            title: "측우기",
            description: "세종 시대의 과학 유산을 코스 이야기로 확장합니다.",
            safetyNote: "여주보 진입 교차로에서 반드시 감속합니다."
          },
          {
            marker: "ㅋ",
            title: "콜마무궁화역사문화관",
            description: "세종대왕면 일대의 문화 거점을 연결합니다.",
            safetyNote: "차도 이용 구간에서는 일렬 대열을 유지합니다."
          },
          {
            marker: "ㅌ",
            title: "터",
            description: "세종대왕릉이 여주에 자리 잡은 배경을 전하는 구간입니다.",
            safetyNote: "영릉 진입 시 자전거에서 내려 이동합니다."
          },
          {
            marker: "ㅍ",
            title: "파사성",
            description: "여강을 둘러싼 산성과 강변 방어의 역사를 소개합니다.",
            safetyNote: "방향 전환 전 후미 대열을 확인합니다."
          }
        ]
      },
      {
        id: "ohak",
        name: "한글길 오학편",
        distance: "약 19.6km",
        duration: "약 5시간",
        rideTime: "자전거 주행 약 110분",
        difficulty: "5점 중 3점",
        highlights: ["영월루", "여주보 전망대", "신륵사"],
        cautions: [
          "차도와 인접한 구간에서는 우측 주행과 대열 간격을 유지합니다.",
          "다리 통과 구간의 볼라드와 보행자 흐름에 주의합니다.",
          "신륵사 관광지 안에서는 보행자 통행을 우선합니다."
        ],
        points: [
          {
            marker: "ㄱ",
            title: "금은모래강변공원",
            description: "세종편과 오학편이 함께 출발하는 공통 집결 지점입니다.",
            safetyNote: "출발 전 브레이크, 안장 높이, PAS 단계를 확인합니다."
          },
          {
            marker: "ㄴ",
            title: "남한강 자전거길",
            description: "강과 도시가 이어지는 여주의 첫인상을 만드는 주행 구간입니다.",
            safetyNote: "우측 주행과 추월 금지 원칙을 안내합니다."
          },
          {
            marker: "ㄷ",
            title: "도자기",
            description: "여주 도자 문화의 실용성과 전통을 짧게 소개합니다.",
            safetyNote: "정차 지점에서 통행 흐름을 막지 않습니다."
          },
          {
            marker: "ㅇ",
            title: "영월루",
            description: "남한강을 내려다보며 여주의 역사 지형을 읽는 전망 지점입니다.",
            safetyNote: "언덕길 진입과 하강 구간에서 감속합니다."
          },
          {
            marker: "ㅁ",
            title: "마암",
            description: "여주 지명에 얽힌 말 바위 이야기를 연결합니다.",
            safetyNote: "데크길과 보행자 밀집 구간에서는 내려서 이동합니다."
          },
          {
            marker: "ㅂ",
            title: "보물",
            description: "신륵사 불교 문화유산과 강변 사찰의 분위기를 소개합니다.",
            safetyNote: "합류 지점에서 선두 가이드 신호를 따릅니다."
          },
          {
            marker: "ㅅ",
            title: "쌀",
            description: "여주 평야와 남한강 물길이 만든 농업 이야기를 전합니다.",
            safetyNote: "휴식 전후 인원과 장비 상태를 확인합니다."
          },
          {
            marker: "ㅈ",
            title: "자격루",
            description: "세종의 과학 기술과 여주보를 연결하는 해설 지점입니다.",
            safetyNote: "여주보 전망대 주변에서는 볼라드와 보행자를 확인합니다."
          },
          {
            marker: "ㅊ",
            title: "철새",
            description: "남한강의 민물가마우지와 백로 이야기를 소개합니다.",
            safetyNote: "천남리·오학동 구간에서는 차도와의 간격을 유지합니다."
          },
          {
            marker: "ㅋ",
            title: "코카콜라 여주공장",
            description: "강변 산업 시설과 지역 생활권을 연결해 바라봅니다.",
            safetyNote: "차도 인접 구간에서는 일렬 주행을 유지합니다."
          },
          {
            marker: "ㅌ",
            title: "터",
            description: "신륵사 관광지와 여주의 불교 문화유산을 소개합니다.",
            safetyNote: "관광지 안에서는 보행자 통행을 우선합니다."
          },
          {
            marker: "ㅎ",
            title: "황포돛배",
            description: "남한강 물류와 여주 관광 콘텐츠를 연결하는 마무리 포인트입니다.",
            safetyNote: "강변 유원지 주변에서는 속도를 충분히 줄입니다."
          },
          {
            marker: "ㅂㅌ",
            title: "여주여행자센터 바이크텔",
            description: "자전거 여행자를 위한 안내와 쉼의 거점으로 소개합니다.",
            safetyNote: "진입 전 대열을 짧게 모으고 보행자 동선을 비웁니다."
          }
        ]
      }
    ],
    faq: [
      {
        question: "전기자전거가 처음이어도 참여할 수 있나요?",
        answer:
          "기본적인 자전거 주행이 가능하다면 참여할 수 있습니다. 출발 전 조작법과 브레이크 사용, 대열 주행을 연습하며 현장 기준을 통과하지 못하면 안전을 위해 참여가 제한될 수 있습니다."
      },
      {
        question: "투어 소요 시간은 어느 정도인가요?",
        answer:
          "오리엔테이션부터 마무리까지 약 5-6시간을 예상합니다. 실제 자전거 주행은 약 110분이며, 해설과 휴식 시간이 포함됩니다."
      },
      {
        question: "비가 와도 투어가 진행되나요?",
        answer:
          "가벼운 비는 우비 착용 후 진행할 수 있으나, 호우·강풍·노면 위험이 있으면 취소 또는 코스 단축이 이루어질 수 있습니다."
      },
      {
        question: "예약은 어디에서 하나요?",
        answer:
          "예약은 네이버스토어 링크로 연결할 예정입니다. 현재 실제 예약 URL은 추후 입력 항목으로 분리해 두었습니다."
      },
      {
        question: "무엇이 포함되나요?",
        answer:
          "전기자전거 대여, 안전 장비, 가이드 해설, 기본 보험, 현장 운영 지원을 기준으로 안내합니다. 최종 포함 항목은 예약 페이지의 상품 정보를 우선합니다."
      }
    ],
    emergencyContacts: [
      {
        label: "경찰",
        value: "112",
        description: "교통사고, 범죄, 긴급 통제 요청",
        href: "tel:112"
      },
      {
        label: "소방/응급",
        value: "119",
        description: "응급 환자, 화재, 구조 요청",
        href: "tel:119"
      },
      {
        label: "여주시 민원콜센터",
        value: "1600-7101",
        description: "여주시 통합 문의 연결",
        href: "tel:16007101"
      },
      {
        label: "세종여주병원",
        value: "031-880-7700",
        description: "응급실 및 진료 가능 병원 확인",
        href: "tel:0318807700"
      },
      {
        label: "여주시 보건소",
        value: "031-887-3601",
        description: "공공 보건 업무 및 상황 확인",
        href: "tel:0318873601"
      }
    ],
    guide: {
      title: "가이드/운영자 자료",
      sections: [
        {
          id: "roles",
          title: "가이드 역할",
          summary: "가이드는 콘텐츠 전달자, 안전관리 책임자, 고객 경험 관리자의 역할을 함께 수행합니다.",
          items: [
            "세나 인터콤으로 해설과 안전 지시를 명확하게 전달합니다.",
            "선두와 후미가 속도, 대열 간격, 낙오자를 함께 관리합니다.",
            "참가자의 만족도와 불편 사항을 수시로 확인합니다."
          ]
        },
        {
          id: "orientation",
          title: "오리엔테이션",
          summary: "출발 전 가이드 소개, 참가자 인사, 장비 안내, 주행 연습을 진행합니다.",
          items: [
            "선두·후미 가이드를 소개하고 투어 중 신호 체계를 설명합니다.",
            "참가자가 이름, 출발지, 기대 요소를 짧게 공유하게 합니다.",
            "PAS 조작, 브레이크 사용, 출발과 정지 연습을 확인합니다."
          ]
        },
        {
          id: "equipment",
          title: "장비 안내",
          summary: "전기자전거, 헬멧, 인터콤, 안전 장비 사용법을 출발 전에 통일합니다.",
          items: [
            "출발은 PAS 0-1단에서 시작하고 숙련도에 따라 조절합니다.",
            "브레이크는 좌우를 함께 사용하며 급제동을 피하도록 안내합니다.",
            "인터콤은 가이드 지시가 잘 들리도록 착용 위치와 음량을 확인합니다."
          ]
        },
        {
          id: "safety",
          title: "주행 안전",
          summary: "일렬 주행, 안전거리, 수신호, 낙하물 대처 원칙을 지킵니다.",
          items: [
            "자전거 2-3대 거리의 안전거리를 유지합니다.",
            "옆으로 나란히 달리거나 임의 추월하지 않습니다.",
            "소지품 낙하 시 참가자는 멈추지 않고 후미 가이드가 수거합니다."
          ]
        },
        {
          id: "course-notes",
          title: "코스별 운영 노트",
          summary: "세종편과 오학편의 권장속도, PAS 단계, 위험 구간을 코스별로 확인합니다.",
          items: [
            "금은모래캠핑장 구간은 15km/h, PAS 3단을 기준으로 안내합니다.",
            "양섬-여주보 구간은 20-25km/h, PAS 3-5단을 기준으로 안내합니다.",
            "신륵사 관광지 안에서는 보행자 통행을 우선 확인합니다."
          ]
        },
        {
          id: "scenarios",
          title: "상황별 대응",
          summary: "낙차, PAS 비작동, 해설 이의제기 상황에 침착하게 대응합니다.",
          items: [
            "낙차 발생 시 그룹을 안전한 곳에 멈추고 신체 상태를 확인합니다.",
            "PAS 비작동 시 가이드 자전거 교환 또는 사무국 지원을 요청합니다.",
            "해설 이의제기 시 참가자 의견을 존중하고 공식 자료 기준을 설명합니다."
          ]
        },
        {
          id: "closing",
          title: "마무리 응대",
          summary: "반납, 만족도 확인, 후기 유도까지 투어 경험의 일부로 운영합니다.",
          items: [
            "자전거와 안전 장비 반납 상태를 확인합니다.",
            "참가자에게 좋았던 지점과 불편했던 지점을 짧게 묻습니다.",
            "예약 페이지와 카카오톡채널 안내는 실제 URL 확정 후 동일 문구로 정리합니다."
          ]
        }
      ]
    }
  },
  en: {
    meta: {
      title: "Yeoju Bike City Tour | Hangul Road",
      description:
        "A guided e-bike tour in Yeoju that connects the Namhangang River, Hangul storytelling, local heritage, and safe group riding"
    },
    navigation: [
      { label: "Tour", href: "#intro" },
      { label: "Courses", href: "#courses" },
      { label: "Safety", href: "#safety" },
      { label: "FAQ", href: "#faq" },
      { label: "Access", href: "#access" }
    ],
    externalLinks: {
      ...externalLinks,
      reservationLabel: "Reservation link coming soon",
      kakaoLabel: "Contact link coming soon"
    },
    hero: {
      title: "Yeoju Hangul Road",
      subtitle: "A guided e-bike city tour in Yeoju",
      body:
        "Ride along the Namhangang River and discover Yeoju through Hangul consonant storytelling, royal heritage, riverside views, and local culture.",
      primaryCta: "Reserve",
      secondaryCta: "KakaoTalk Contact"
    },
    intro: {
      title: "Ride through riverside scenery, history, and Hangul",
      body:
        "Yeoju brings together the Namhangang River, rice fields, ceramic culture, King Sejong's royal tomb, and Silleuksa Temple. The tour is guided from front and rear so visitors can enjoy both safe riding and local storytelling."
    },
    courses: [
      {
        id: "sejong",
        name: "Hangul Road: Sejong Course",
        distance: "About 19 km",
        duration: "About 5 hours",
        rideTime: "About 110 minutes of riding",
        difficulty: "2 out of 5",
        highlights: ["Yeongwolru Pavilion", "Yeoju Weir Observatory", "King Sejong's Tomb"],
        cautions: [
          "Keep right on shared bicycle and pedestrian paths.",
          "Slow down near bridge bollards and narrow crossings.",
          "Walk bikes on deck paths and near the royal tomb entry."
        ],
        points: [
          {
            marker: "G",
            title: "Geumeunmorae Riverside Park",
            description: "The riverside gathering point and practice area.",
            safetyNote: "Watch pedestrians and children inside the park."
          },
          {
            marker: "N",
            title: "Namhangang Bike Path",
            description: "A calm riverside riding section with open river views.",
            safetyNote: "Keep distance from walkers and other cyclists."
          },
          {
            marker: "D",
            title: "Ceramics",
            description: "A story point about Yeoju's ceramic culture and local craft.",
            safetyNote: "Stop in a single line on the right edge."
          },
          {
            marker: "Y",
            title: "Yeongwolru Pavilion",
            description: "A scenic heritage point overlooking the river and city.",
            safetyNote: "Slow down on slopes and near parked cars."
          },
          {
            marker: "M",
            title: "Maam Rock",
            description: "A local legend connected to the name of Yeoju.",
            safetyNote: "Walk bikes on the deck path."
          },
          {
            marker: "J",
            title: "Jagyeongnu",
            description: "A storytelling point connecting King Sejong's scientific legacy and Yeoju Weir.",
            safetyNote: "Watch bollards and construction areas near the weir."
          },
          {
            marker: "T",
            title: "King Sejong's Tomb",
            description: "The destination story about why the royal tomb came to Yeoju.",
            safetyNote: "Dismount before entering the tomb area."
          }
        ]
      },
      {
        id: "ohak",
        name: "Hangul Road: Ohak Course",
        distance: "About 19.6 km",
        duration: "About 5 hours",
        rideTime: "About 110 minutes of riding",
        difficulty: "3 out of 5",
        highlights: ["Yeongwolru Pavilion", "Yeoju Weir Observatory", "Silleuksa Temple"],
        cautions: [
          "Keep a single-file formation near roads.",
          "Watch bridge bollards and pedestrian flow.",
          "Yield to pedestrians inside the Silleuksa visitor area."
        ],
        points: [
          {
            marker: "G",
            title: "Geumeunmorae Riverside Park",
            description: "The shared starting point for both courses.",
            safetyNote: "Check brakes, saddle height, and PAS level before departure."
          },
          {
            marker: "N",
            title: "Namhangang Bike Path",
            description: "The first riding section that introduces Yeoju's riverside landscape.",
            safetyNote: "Keep right and avoid overtaking."
          },
          {
            marker: "Y",
            title: "Yeongwolru Pavilion",
            description: "A major viewpoint over the Namhangang River.",
            safetyNote: "Slow down before slopes and turns."
          },
          {
            marker: "B",
            title: "Treasure",
            description: "A heritage story linked to Silleuksa Temple.",
            safetyNote: "Follow the lead guide at merge points."
          },
          {
            marker: "C",
            title: "Migratory Birds",
            description: "A nature story about cormorants and egrets along the river.",
            safetyNote: "Keep formation near Cheonnam-ri and Ohak-dong."
          },
          {
            marker: "S",
            title: "Silleuksa Temple",
            description: "A riverside Buddhist heritage stop in Yeoju.",
            safetyNote: "Give priority to pedestrians in the visitor area."
          },
          {
            marker: "H",
            title: "Hwangpo Sailboat",
            description: "A closing story about historic river transport and Yeoju tourism.",
            safetyNote: "Slow down near riverside visitor paths."
          }
        ]
      }
    ],
    faq: [
      {
        question: "Can beginners join the e-bike tour?",
        answer:
          "Participants should already be able to ride a bicycle safely. Guides provide practice before departure and may limit participation if riding is unsafe."
      },
      {
        question: "How long does the tour take?",
        answer:
          "The full program takes about 5-6 hours, including orientation, riding, storytelling stops, and rest time."
      },
      {
        question: "Does the tour run in rain?",
        answer:
          "Light rain may be possible with rain gear, but heavy rain, strong wind, or unsafe road conditions can lead to cancellation or route changes."
      },
      {
        question: "Where do I reserve?",
        answer:
          "Reservations will connect to a Naver Store link. The final URL is intentionally kept as pending input."
      }
    ],
    emergencyContacts: [
      {
        label: "Police",
        value: "112",
        description: "Traffic incidents, crime, emergency control",
        href: "tel:112"
      },
      {
        label: "Fire / EMS",
        value: "119",
        description: "Medical emergency, rescue, fire",
        href: "tel:119"
      },
      {
        label: "Yeoju City Call Center",
        value: "1600-7101",
        description: "General city information and routing",
        href: "tel:16007101"
      },
      {
        label: "Sejong Yeoju Hospital",
        value: "031-880-7700",
        description: "Hospital and emergency care confirmation",
        href: "tel:0318807700"
      }
    ],
    guide: {
      title: "Guide and Operator Materials",
      sections: [
        {
          id: "roles",
          title: "Guide Roles",
          summary: "Guides manage storytelling, safety, and the overall visitor experience.",
          items: [
            "Use the intercom for clear interpretation and safety directions.",
            "Coordinate front and rear guide responsibilities.",
            "Check participant comfort throughout the tour."
          ]
        },
        {
          id: "orientation",
          title: "Orientation",
          summary: "Introduce guides, participants, equipment, and riding formation before departure.",
          items: [
            "Introduce the lead and rear guides.",
            "Invite short participant introductions.",
            "Confirm PAS, braking, starting, and stopping practice."
          ]
        },
        {
          id: "equipment",
          title: "Equipment",
          summary: "Standardize e-bike, helmet, intercom, and safety gear use.",
          items: [
            "Start with low PAS and adjust by rider confidence.",
            "Check helmet fit and intercom position.",
            "Carry basic repair and first-aid items."
          ]
        },
        {
          id: "safety",
          title: "Riding Safety",
          summary: "Maintain single-file riding, safe distance, and guide-controlled signals.",
          items: [
            "Keep two to three bicycle lengths between riders.",
            "Avoid side-by-side riding and unplanned overtaking.",
            "Let the rear guide handle dropped belongings."
          ]
        },
        {
          id: "course-notes",
          title: "Course Notes",
          summary: "Check speed, PAS, risk points, and stop points by course.",
          items: [
            "Use 15 km/h and PAS 3 as the guide standard near the camping area.",
            "Use 20-25 km/h and PAS 3-5 around Yangseom to Yeoju Weir.",
            "Prioritize pedestrians in the Silleuksa visitor area."
          ]
        },
        {
          id: "scenarios",
          title: "Incident Response",
          summary: "Respond calmly to falls, PAS malfunction, and interpretation disputes.",
          items: [
            "Stop the group safely and check physical condition after a fall.",
            "Swap with a guide bike or request operator support for PAS failure.",
            "Respect participant feedback and refer to official source material."
          ]
        }
      ]
    }
  }
};
