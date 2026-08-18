// Lightweight uniqueId replacement (avoids importing entire lodash ~70KB)
let _idCounter = 0;
const uniqueId = (prefix = '') => `${prefix}${++_idCounter}`;

export interface ChildItem {
  id?: number | string;
  name?: string;
  icon?: string;
  children?: ChildItem[];
  item?: string;
  url?: string;
  color?: string;
  isPro?: boolean;
}

export interface MenuItem {
  heading?: string;
  name?: string;
  icon?: string;
  id?: number;
  to?: string;
  items?: MenuItem[];
  children?: ChildItem[];
  url?: string;
  isPro?: boolean;
}

const SidebarContent: MenuItem[] = [
  // TỔNG QUAN
  {
    heading: "TỔNG QUAN",
    children: [
      {
        name: "Tổng quan",
        icon: "solar:widget-add-line-duotone",
        id: uniqueId(),
        url: "/",
        isPro: false,
      },
      {
        name: "Báo cáo",
        icon: "solar:chart-2-outline",
        id: uniqueId(),
        children: [
          {
            name: "Chi tiết",
            id: uniqueId(),
            url: "/reports",
          },
          {
            name: "Doanh thu",
            id: uniqueId(),
            url: "/reports/revenue",
          },
          {
            name: "Nội dung",
            id: uniqueId(),
            url: "/reports/content",
          },
          {
            name: "Bài học",
            id: uniqueId(),
            url: "/reports/lessons",
          },
        ],
      },
      {
        name: "Người dùng nhí",
        icon: "solar:users-group-two-rounded-outline",
        id: uniqueId(),
        url: "/customers",
        isPro: false,
      },
    ],
  },
  {
    heading: "NỘI DUNG - BÀI HỌC",
    children: [
      {
        name: "Nội dung",
        icon: "solar:folder-open-outline",
        id: uniqueId(),
        url: "/contents",
      },
      {
        name: "Bài học",
        icon: "solar:document-text-outline",
        id: uniqueId(),
        url: "/lessons",
      },
    ],
  },
  {
    heading: "KHÓA HỌC",
    children: [
      {
        name: "Khóa học",
        icon: "solar:notebook-bookmark-outline",
        id: uniqueId(),
        url: "/courses",
      },
      {
        name: "Lịch sử giao dịch",
        icon: "solar:card-transfer-outline",
        id: uniqueId(),
        url: "/transaction-history",
      },
      {
        name: "Khuyến mãi",
        icon: "solar:ticket-sale-outline",
        id: uniqueId(),
        url: "/promotions",
      },
    ],
  },
  {
    heading: "TIN TỨC & TRUY CẬP",
    children: [
      {
        name: "Tin nhắn & Chat AI",
        icon: "solar:chat-round-line-outline",
        id: uniqueId(),
        url: "/messages",
      },
      {
        name: "Tin tức",
        icon: "solar:document-text-outline",
        id: uniqueId(),
        url: "/news",
      },
      {
        name: "Phân tích dữ liệu",
        icon: "solar:chart-2-outline",
        id: uniqueId(),
        url: "/analytics",
      },
    ],
  },
];

export default SidebarContent;
