import type { ReactNode } from 'react'

export const PAGE_ROUTES = {
  home: '/',
  explore: '/explore',
  courses: '/courses',
  diary: '/diary',
  parents: '/parents',
} as const

export type Page = keyof typeof PAGE_ROUTES

export const navbarAssets = {
  logo: '/assets/logo_ottopia.webp',
  fallbackAvatar: '/assets/0b3623250836b7627aaedaaaa6ad6d75ba584035.webp',
  bell: '/assets/6115f81b903d7a7ab9319b63a5138ed188023521.svg',
  caret: '/assets/f27acb75d87783efe25d645b00f1389650a727c8.svg',
}

export interface NavItem {
  page: Page
  label: string
  icon: ReactNode
}

export const NAV_ITEMS: NavItem[] = [
  {
    page: 'home',
    label: 'Trang chủ',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 17 19" fill="none">
        <path fillRule="evenodd" clipRule="evenodd" d="M9.90847 2.12652C9.0379 1.29116 7.66339 1.29116 6.79283 2.12652L2.16639 6.56585C2.05303 6.67462 1.97679 6.81631 1.94845 6.97083C1.39432 9.99268 1.35342 13.0863 1.82746 16.1218L1.93998 16.8423H4.91644V10.6309C4.91644 10.2167 5.25222 9.88094 5.66644 9.88094H11.0349C11.4491 9.88094 11.7849 10.2167 11.7849 10.6309V16.8423H14.7613L14.8738 16.1218C15.3479 13.0863 15.307 9.99268 14.7528 6.97083C14.7245 6.81631 14.6483 6.67462 14.5349 6.56585L9.90847 2.12652ZM5.75428 1.0442C7.20522 -0.348066 9.49607 -0.348066 10.947 1.0442L15.5735 5.48353C15.914 5.81033 16.1431 6.23602 16.2282 6.70028C16.8128 9.8879 16.8559 13.1512 16.3559 16.3532L16.1751 17.5107C16.1004 17.9894 15.6881 18.3423 15.2036 18.3423H11.0349C10.6206 18.3423 10.2849 18.0065 10.2849 17.5923V11.3809H6.41644V17.5923C6.41644 18.0065 6.08065 18.3423 5.66644 18.3423H1.49771C1.01323 18.3423 0.600941 17.9894 0.526186 17.5107L0.345423 16.3532C-0.154625 13.1512 -0.111478 9.8879 0.473052 6.70028C0.558185 6.23602 0.787269 5.81033 1.12784 5.48353L5.75428 1.0442Z" fill="currentColor"/>
      </svg>
    ),
  },
  {
    page: 'explore',
    label: 'Khám phá',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path fillRule="evenodd" clipRule="evenodd" d="M16.875 15.4554L20.875 19.4602C21.0536 19.6589 21.0448 19.9631 20.855 20.1511L20.155 20.8519C20.0611 20.9467 19.9333 21 19.8 21C19.6667 21 19.5389 20.9467 19.445 20.8519L15.445 16.8471C15.3344 16.7362 15.234 16.6156 15.145 16.4867L14.395 15.4855C13.1541 16.4776 11.613 17.0178 10.025 17.0173C6.75261 17.0287 3.90902 14.7686 3.17773 11.5751C2.44643 8.38161 4.0226 5.10699 6.9731 3.68991C9.92359 2.27284 13.461 3.09151 15.491 5.66125C17.521 8.23099 17.5019 11.866 15.445 14.4142L16.445 15.105C16.6012 15.2051 16.7454 15.3226 16.875 15.4554ZM5.025 10.0089C5.025 12.7736 7.26357 15.0149 10.025 15.0149C11.3511 15.0149 12.6228 14.4875 13.5605 13.5487C14.4982 12.6099 15.025 11.3365 15.025 10.0089C15.025 7.24411 12.7864 5.00284 10.025 5.00284C7.26357 5.00284 5.025 7.24411 5.025 10.0089Z" fill="currentColor"/>
      </svg>
    ),
  },
  {
    page: 'courses',
    label: 'Khóa học',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M12 21V7C12 5.89543 12.8954 5 14 5H21.4C21.7314 5 22 5.26863 22 5.6V18.7143" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M12 21V7C12 5.89543 11.1046 5 10 5H2.6C2.26863 5 2 5.26863 2 5.6V18.7143" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M14 19H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M10 19H2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M12 21C12 19.8954 12.8954 19 14 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 21C12 19.8954 11.1046 19 10 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    page: 'diary',
    label: 'Nhật ký của bé',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path fillRule="evenodd" clipRule="evenodd" d="M3.75 8C3.75 5.37665 5.87665 3.25 8.5 3.25H18.5C19.4665 3.25 20.25 4.0335 20.25 5V20C20.25 20.9665 19.4665 21.75 18.5 21.75H7.5C5.42893 21.75 3.75 20.0711 3.75 18V8ZM18.75 5V14.25H7.5C6.6558 14.25 5.87675 14.529 5.25 14.9997V8C5.25 6.20507 6.70507 4.75 8.5 4.75H11.7079C11.4446 6.73154 11.4683 8.74229 11.7794 10.72L11.8418 11.1166C11.8865 11.4006 12.0896 11.6341 12.3648 11.7176C12.6399 11.8012 12.9385 11.7201 13.1336 11.5089L14.5 10.0297L15.8664 11.5089C16.0615 11.7201 16.3601 11.8012 16.6353 11.7176C16.9104 11.6341 17.1135 11.4006 17.1582 11.1166L17.2206 10.72C17.5318 8.74228 17.5554 6.73154 17.2921 4.75H18.5C18.6381 4.75 18.75 4.86193 18.75 5ZM15.7779 4.75H13.2221C13.005 6.26418 12.9688 7.79819 13.1139 9.31967L13.7654 8.61431C14.1614 8.1857 14.8386 8.1857 15.2346 8.61431L15.8861 9.31967C16.0312 7.79819 15.995 6.26418 15.7779 4.75ZM7.5 15.75H18.75V20C18.75 20.1381 18.6381 20.25 18.5 20.25H7.5C6.25736 20.25 5.25 19.2426 5.25 18C5.25 16.7574 6.25736 15.75 7.5 15.75Z" fill="currentColor"/>
      </svg>
    ),
  },
  {
    page: 'parents',
    label: 'Dành cho phụ huynh',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M7 18V17C7 14.2386 9.23858 12 12 12C14.7614 12 17 14.2386 17 17V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M1 18V17C1 15.3431 2.34315 14 4 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M23 18V17C23 15.3431 21.6569 14 20 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6C10.3431 6 9 7.34315 9 9C9 10.6569 10.3431 12 12 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M4 14C5.10457 14 6 13.1046 6 12C6 10.8954 5.10457 10 4 10C2.89543 10 2 10.8954 2 12C2 13.1046 2.89543 14 4 14Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M20 14C21.1046 14 22 13.1046 22 12C22 10.8954 21.1046 10 20 10C18.8954 10 18 10.8954 18 12C18 13.1046 18.8954 14 20 14Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
]
