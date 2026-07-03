export interface QuizOption {
  id: number
  label: string
  sprite: string
  style: React.CSSProperties
}

export interface QuizQuestion {
  id: number
  prompt: string
  options: QuizOption[]
  correctOptionId: number
}

export interface QuizLessonData {
  lessonId: number
  lessonTitle: string
  questions: QuizQuestion[]
}

export interface EmotionOption {
  id: string
  label: string
  textColor: string
  cloudImage: string
}

export const zoneQuizAssets = {
  heroBg: '/assets/316e31a7f5c5fec607af9449dd8ca13feab051fa.png',
  mascot: '/assets/97290b237f2446d77cc4e59dc42ddb50825fb101.png',
  wavingMascot: '/assets/5c8508f0584418b762ec0cf80207df8624c6d362.png',
  speaker: '/assets/269beb2cefee3d683dbf75f695c386d5b76b5edd.svg',
  fox: '/assets/6c7bc526bd362b47a11aa9c7d746f4389b8c46f8.png',
  bunny: '/assets/e52feebface7c6bbd4a20aeb2aef85471db4bee7.png',
  bear: '/assets/dc0e309bb4af16fb90296bca4637bb14f3d35198.png',
  turtle: '/assets/63925aee87c850a6113be59e33393056ca99178b.png',
  cloudYellow: '/assets/a22cb2f9edc52b52cd16b51dcc742598104e1e5e.png',
  cloudBlue: '/assets/3e9edb9d1e8de4aa2416bf99d25bc8fe79a49589.png',
  cloudRed: '/assets/4a0bc8ca4cd8ff855e9199aa605a764c279653b6.png',
  cloudPurple: '/assets/6531d04afb1a13034e11ba68f888ee80f43200bf.png',
  stepPreview1: '/assets/78cf394c6936fb3cee36951b4f171158844bf106.png',
  stepPreview2: '/assets/1188aec46cc4437e1d55068374629cd872cc6644.png',
  downIcon: '/assets/c913a47b764e1e79b2c4c7abdd387b731a060c45.svg',
  tailBase: '/assets/8f5a664848c186957dd46a3e7b85e3ccceb643f1.svg',
  tailOutline: '/assets/6d192bbe69b13519caf699b3b46ddb09f844d570.svg',
}

const sprite1 = '/assets/6f5edadc2dab04d5ba5d15fad8605e7d016d1f51.png'
const sprite2 = '/assets/7560c65991fbb16b6ca4f3a6b08308cb3ccb7f27.png'

export const quizDatabase: Record<number, QuizLessonData> = {
  1: {
    lessonId: 1,
    lessonTitle: 'Niềm vui của con',
    questions: [
      {
        id: 1,
        prompt: 'Theo con, lúc này Toro đang cảm thấy thế nào?',
        correctOptionId: 1,
        options: [
          {
            id: 1,
            label: 'Vui',
            sprite: sprite1,
            style: { height: '110.75%', width: '320.4%', left: '-2%', top: '-8.72%' },
          },
          {
            id: 2,
            label: 'Buồn',
            sprite: sprite2,
            style: { height: '140%', width: '248.89%', left: '-74.44%', top: '-13.77%' },
          },
          {
            id: 3,
            label: 'Sợ hãi',
            sprite: sprite1,
            style: { height: '110.75%', width: '320.4%', left: '-118.07%', top: '-8.72%' },
          },
        ],
      },
    ],
  },
  2: {
    lessonId: 2,
    lessonTitle: 'Nỗi buồn bé nhỏ',
    questions: [
      {
        id: 1,
        prompt: 'Theo con, lúc chiếc diều bị rách, Toro đang cảm thấy thế nào?',
        correctOptionId: 1,
        options: [
          {
            id: 1,
            label: 'Buồn',
            sprite: sprite2,
            style: { height: '140%', width: '248.89%', left: '-74.44%', top: '-13.77%' },
          },
          {
            id: 2,
            label: 'Vui',
            sprite: sprite1,
            style: { height: '110.75%', width: '320.4%', left: '-2%', top: '-8.72%' },
          },
          {
            id: 3,
            label: 'Tức giận',
            sprite: sprite1,
            style: { height: '110.75%', width: '320.4%', left: '-118.07%', top: '-8.72%' },
          },
        ],
      },
      {
        id: 2,
        prompt: 'Điều gì khiến Toro cảm thấy buồn?',
        correctOptionId: 1,
        options: [
          {
            id: 1,
            label: 'Chiếc diều bị rách',
            sprite: sprite2,
            style: { height: '140%', width: '248.89%', left: '-74.44%', top: '-13.77%' },
          },
          {
            id: 2,
            label: 'Toro được tặng quà',
            sprite: sprite1,
            style: { height: '110.75%', width: '320.4%', left: '-2%', top: '-8.72%' },
          },
          {
            id: 3,
            label: 'Toro được cô giáo khen',
            sprite: sprite1,
            style: { height: '110.75%', width: '320.4%', left: '-118.07%', top: '-8.72%' },
          },
        ],
      },
      {
        id: 3,
        prompt: 'Khi buồn, Toro nên làm gì để cảm thấy dễ chịu hơn?',
        correctOptionId: 1,
        options: [
          {
            id: 1,
            label: 'Nói với Bunny rằng mình đang buồn',
            sprite: sprite1,
            style: { height: '110.75%', width: '320.4%', left: '-2%', top: '-8.72%' },
          },
          {
            id: 2,
            label: 'Bỏ đi một mình',
            sprite: sprite2,
            style: { height: '140%', width: '248.89%', left: '-74.44%', top: '-13.77%' },
          },
          {
            id: 3,
            label: 'Giấu chiếc diều đi',
            sprite: sprite1,
            style: { height: '110.75%', width: '320.4%', left: '-118.07%', top: '-8.72%' },
          },
        ],
      },
      {
        id: 4,
        prompt: 'Toro có thể chia sẻ nỗi buồn với ai?',
        correctOptionId: 1,
        options: [
          {
            id: 1,
            label: 'Bunny',
            sprite: sprite1,
            style: { height: '110.75%', width: '320.4%', left: '-2%', top: '-8.72%' },
          },
          {
            id: 2,
            label: 'Cái cây',
            sprite: sprite2,
            style: { height: '140%', width: '248.89%', left: '-74.44%', top: '-13.77%' },
          },
          {
            id: 3,
            label: 'Chiếc ghế',
            sprite: sprite1,
            style: { height: '110.75%', width: '320.4%', left: '-118.07%', top: '-8.72%' },
          },
        ],
      },
    ],
  },
  3: {
    lessonId: 3,
    lessonTitle: 'Cơn giận đang tới',
    questions: [
      {
        id: 1,
        prompt: 'Việc nào dưới đây thường khiến các bạn nhỏ cảm thấy vui?',
        correctOptionId: 1,
        options: [
          {
            id: 1,
            label: 'Chơi cùng bạn bè',
            sprite: sprite1,
            style: { height: '110.75%', width: '320.4%', left: '-2%', top: '-8.72%' },
          },
          {
            id: 2,
            label: 'Bị giành đồ chơi',
            sprite: sprite2,
            style: { height: '140%', width: '248.89%', left: '-74.44%', top: '-13.77%' },
          },
          {
            id: 3,
            label: 'Làm hỏng món đồ yêu thích',
            sprite: sprite1,
            style: { height: '110.75%', width: '320.4%', left: '-118.07%', top: '-8.72%' },
          },
        ],
      },
    ],
  },
  4: {
    lessonId: 4,
    lessonTitle: 'Khi con thấy sợ',
    questions: [
      {
        id: 1,
        prompt: 'Nếu là Toro, con sẽ làm gì tiếp theo?',
        correctOptionId: 1,
        options: [
          {
            id: 1,
            label: 'Kể cho Bunny nghe niềm vui của mình',
            sprite: sprite1,
            style: { height: '110.75%', width: '320.4%', left: '-2%', top: '-8.72%' },
          },
          {
            id: 2,
            label: 'Giấu bức tranh đi',
            sprite: sprite2,
            style: { height: '140%', width: '248.89%', left: '-74.44%', top: '-13.77%' },
          },
          {
            id: 3,
            label: 'Chê tranh của bạn khác',
            sprite: sprite1,
            style: { height: '110.75%', width: '320.4%', left: '-118.07%', top: '-8.72%' },
          },
        ],
      },
    ],
  },
}

export const emotionsList: EmotionOption[] = [
  { id: 'vui', label: 'Vui', textColor: '#fea01f', cloudImage: zoneQuizAssets.cloudYellow },
  { id: 'buon', label: 'Buồn', textColor: '#0a7ad8', cloudImage: zoneQuizAssets.cloudBlue },
  { id: 'gian', label: 'Giận', textColor: '#e71c3d', cloudImage: zoneQuizAssets.cloudRed },
  { id: 'so', label: 'Sợ', textColor: '#8234e4', cloudImage: zoneQuizAssets.cloudPurple },
]

export const initialPlacedEmotions = {
  bunny: null,
  fox: null,
  bear: null,
  turtle: null,
}

export const gameCards = [
  {
    id: 'bunny',
    image: zoneQuizAssets.bunny,
    emptyBorder: '#8234E4',
    correctEmotion: 'vui',
    gradient:
      'linear-gradient(181deg, #F2F0FE 23.07%, #E9D8FF 88.73%, #F2F0FE 108.59%)',
    imageClassName:
      'absolute h-[126.52%] left-[-62.46%] max-w-none top-[-9.2%] w-[224.93%] object-cover pointer-events-none select-none',
    alt: 'Bunny',
  },
  {
    id: 'fox',
    image: zoneQuizAssets.fox,
    emptyBorder: '#FEA01F',
    correctEmotion: 'buon',
    gradient:
      'linear-gradient(181deg, #FEF9ED 23.07%, #FFF4BF 88.73%, #FEF9ED 108.59%)',
    imageClassName:
      'absolute inset-0 max-w-none object-cover pointer-events-none size-full select-none',
    alt: 'Fox',
  },
  {
    id: 'bear',
    image: zoneQuizAssets.bear,
    emptyBorder: '#E55C72',
    correctEmotion: 'gian',
    gradient:
      'linear-gradient(181deg, #FEF0F0 23.07%, #FFC9D1 88.73%, #FEF0F0 108.59%)',
    imageClassName:
      'absolute h-[117.39%] left-[-54.35%] max-w-none top-[-8.59%] w-[208.7%] object-cover pointer-events-none select-none',
    alt: 'Bear Lu',
  },
  {
    id: 'turtle',
    image: zoneQuizAssets.turtle,
    emptyBorder: '#0A7AD8',
    correctEmotion: 'so',
    gradient:
      'linear-gradient(181deg, #F4FAFD 23.07%, #E5F2FF 88.73%, #F4FAFD 108.59%)',
    imageClassName:
      'absolute h-[126.96%] left-[-60.7%] max-w-none top-[-11.74%] w-[225.71%] object-cover pointer-events-none select-none',
    alt: 'Turtle',
  },
] as const
