export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  channel: Channel;
  views: string;
  timestamp: string;
  duration: string;
  category: string;
  tags: string[];
  likes: number;
  description?: string;
}

export interface Channel {
  id: string;
  name: string;
  avatar: string;
  subscribers: string;
  verified: boolean;
}

export interface Category {
  id: string;
  label: string;
  icon: string;
}

export const categories: Category[] = [
  { id: "all", label: "Все", icon: "Flame" },
  { id: "trending", label: "В тренде", icon: "TrendingUp" },
  { id: "gaming", label: "Игры", icon: "Gamepad2" },
  { id: "music", label: "Музыка", icon: "Music" },
  { id: "travel", label: "Путешествия", icon: "Plane" },
  { id: "cooking", label: "Кулинария", icon: "ChefHat" },
  { id: "tech", label: "Технологии", icon: "Cpu" },
  { id: "sports", label: "Спорт", icon: "Trophy" },
  { id: "education", label: "Обучение", icon: "GraduationCap" },
  { id: "art", label: "Искусство", icon: "Palette" },
  { id: "science", label: "Наука", icon: "Atom" },
  { id: "news", label: "Новости", icon: "Newspaper" },
];

const channels: Channel[] = [
  { id: "c1", name: "TechVision", avatar: "🤖", subscribers: "2.4M", verified: true },
  { id: "c2", name: "Мир Путешествий", avatar: "🌍", subscribers: "890K", verified: true },
  { id: "c3", name: "ШефПовар", avatar: "👨‍🍳", subscribers: "1.2M", verified: true },
  { id: "c4", name: "GameZone Pro", avatar: "🎮", subscribers: "3.1M", verified: true },
  { id: "c5", name: "МузыкаLive", avatar: "🎵", subscribers: "5.6M", verified: true },
  { id: "c6", name: "Наука 360", avatar: "🔬", subscribers: "760K", verified: false },
  { id: "c7", name: "СпортМастер", avatar: "⚽", subscribers: "1.8M", verified: true },
  { id: "c8", name: "АртСтудия", avatar: "🎨", subscribers: "430K", verified: false },
  { id: "c9", name: "КодМастер", avatar: "💻", subscribers: "1.1M", verified: true },
  { id: "c10", name: "ФитнесГуру", avatar: "💪", subscribers: "2.2M", verified: true },
];

export const videos: Video[] = [
  {
    id: "v1",
    title: "Топ-10 гаджетов 2026 года, которые изменят вашу жизнь",
    thumbnail: "https://cdn.poehali.dev/projects/11eb533a-47a8-4c64-bbd9-c7c241bec619/files/41109ad8-6df9-48b6-85f7-45933d1d3a0c.jpg",
    channel: channels[0],
    views: "1.2M",
    timestamp: "2 дня назад",
    duration: "18:34",
    category: "tech",
    tags: ["технологии", "гаджеты", "обзор"],
    likes: 45000,
  },
  {
    id: "v2",
    title: "Путешествие по горам Кавказа — невероятные виды",
    thumbnail: "https://cdn.poehali.dev/projects/11eb533a-47a8-4c64-bbd9-c7c241bec619/files/5ffe845e-d18e-40d6-9873-64522a511a54.jpg",
    channel: channels[1],
    views: "890K",
    timestamp: "5 часов назад",
    duration: "24:12",
    category: "travel",
    tags: ["путешествия", "горы", "кавказ"],
    likes: 32000,
  },
  {
    id: "v3",
    title: "Идеальная паста карбонара за 15 минут — рецепт шефа",
    thumbnail: "https://cdn.poehali.dev/projects/11eb533a-47a8-4c64-bbd9-c7c241bec619/files/90a33723-d9cd-4907-9489-ee3bf9b4c26a.jpg",
    channel: channels[2],
    views: "2.1M",
    timestamp: "1 неделю назад",
    duration: "15:08",
    category: "cooking",
    tags: ["кулинария", "рецепт", "паста"],
    likes: 78000,
  },
  {
    id: "v4",
    title: "Финал мирового турнира по киберспорту 2026",
    thumbnail: "https://cdn.poehali.dev/projects/11eb533a-47a8-4c64-bbd9-c7c241bec619/files/41109ad8-6df9-48b6-85f7-45933d1d3a0c.jpg",
    channel: channels[3],
    views: "4.5M",
    timestamp: "3 дня назад",
    duration: "2:15:30",
    category: "gaming",
    tags: ["игры", "киберспорт", "турнир"],
    likes: 210000,
  },
  {
    id: "v5",
    title: "Лучшие хиты 2026 — музыкальный микс для настроения",
    thumbnail: "https://cdn.poehali.dev/projects/11eb533a-47a8-4c64-bbd9-c7c241bec619/files/5ffe845e-d18e-40d6-9873-64522a511a54.jpg",
    channel: channels[4],
    views: "8.3M",
    timestamp: "1 день назад",
    duration: "1:02:45",
    category: "music",
    tags: ["музыка", "микс", "хиты"],
    likes: 340000,
  },
  {
    id: "v6",
    title: "Квантовая физика простыми словами — как работает вселенная",
    thumbnail: "https://cdn.poehali.dev/projects/11eb533a-47a8-4c64-bbd9-c7c241bec619/files/90a33723-d9cd-4907-9489-ee3bf9b4c26a.jpg",
    channel: channels[5],
    views: "560K",
    timestamp: "4 дня назад",
    duration: "32:18",
    category: "science",
    tags: ["наука", "физика", "образование"],
    likes: 28000,
  },
  {
    id: "v7",
    title: "Тренировка на всё тело за 30 минут — без оборудования",
    thumbnail: "https://cdn.poehali.dev/projects/11eb533a-47a8-4c64-bbd9-c7c241bec619/files/41109ad8-6df9-48b6-85f7-45933d1d3a0c.jpg",
    channel: channels[9],
    views: "1.7M",
    timestamp: "6 часов назад",
    duration: "31:45",
    category: "sports",
    tags: ["фитнес", "тренировка", "спорт"],
    likes: 67000,
  },
  {
    id: "v8",
    title: "Создаём нейросеть с нуля на Python — полный курс",
    thumbnail: "https://cdn.poehali.dev/projects/11eb533a-47a8-4c64-bbd9-c7c241bec619/files/5ffe845e-d18e-40d6-9873-64522a511a54.jpg",
    channel: channels[8],
    views: "3.2M",
    timestamp: "2 недели назад",
    duration: "4:28:15",
    category: "education",
    tags: ["программирование", "python", "нейросети"],
    likes: 156000,
  },
  {
    id: "v9",
    title: "Как рисовать портрет акварелью — мастер-класс",
    thumbnail: "https://cdn.poehali.dev/projects/11eb533a-47a8-4c64-bbd9-c7c241bec619/files/90a33723-d9cd-4907-9489-ee3bf9b4c26a.jpg",
    channel: channels[7],
    views: "320K",
    timestamp: "1 неделю назад",
    duration: "45:22",
    category: "art",
    tags: ["искусство", "рисование", "акварель"],
    likes: 18000,
  },
  {
    id: "v10",
    title: "Обзор нового iPhone 18 Pro — стоит ли покупать?",
    thumbnail: "https://cdn.poehali.dev/projects/11eb533a-47a8-4c64-bbd9-c7c241bec619/files/41109ad8-6df9-48b6-85f7-45933d1d3a0c.jpg",
    channel: channels[0],
    views: "5.1M",
    timestamp: "12 часов назад",
    duration: "22:45",
    category: "tech",
    tags: ["технологии", "iphone", "обзор"],
    likes: 230000,
  },
  {
    id: "v11",
    title: "Футбольный матч века — лучшие моменты",
    thumbnail: "https://cdn.poehali.dev/projects/11eb533a-47a8-4c64-bbd9-c7c241bec619/files/5ffe845e-d18e-40d6-9873-64522a511a54.jpg",
    channel: channels[6],
    views: "12M",
    timestamp: "8 часов назад",
    duration: "10:32",
    category: "sports",
    tags: ["спорт", "футбол", "голы"],
    likes: 520000,
  },
  {
    id: "v12",
    title: "Секретный рецепт бабушкиных блинов — семейная традиция",
    thumbnail: "https://cdn.poehali.dev/projects/11eb533a-47a8-4c64-bbd9-c7c241bec619/files/90a33723-d9cd-4907-9489-ee3bf9b4c26a.jpg",
    channel: channels[2],
    views: "780K",
    timestamp: "3 дня назад",
    duration: "12:15",
    category: "cooking",
    tags: ["кулинария", "блины", "рецепт"],
    likes: 41000,
  },
];

export const sidebarItems = [
  { icon: "Home", label: "Главная", active: true },
  { icon: "Compass", label: "Обзор", active: false },
  { icon: "PlaySquare", label: "Shorts", active: false },
  { icon: "Library", label: "Библиотека", active: false },
  { icon: "History", label: "История", active: false },
];

export const sidebarSubscriptions = [
  channels[0],
  channels[1],
  channels[2],
  channels[3],
  channels[4],
];

export default { videos, categories, channels, sidebarItems, sidebarSubscriptions };
