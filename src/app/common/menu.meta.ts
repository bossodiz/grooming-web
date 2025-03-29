export type MenuItemType = {
  key: string
  label: string
  isTitle?: boolean
  icon?: string
  url?: string
  badge?: {
    variant: string
    text: string
  }
  parentKey?: string
  isDisabled?: boolean
  collapsed?: boolean
  children?: MenuItemType[]
}

export const MENU_ITEMS: MenuItemType[] = [
  {
    key: 'nav',
    label: 'MENU',
    isTitle: true,
  },
  {
    key: 'dashboard',
    label: 'Dashboard',
    icon: 'home',
    collapsed: false,
    children: [
      {
        key: 'dashboard-crm',
        label: 'CRM',
        url: '/index',
        parentKey: 'dashboard',
      },
      {
        key: 'dashboard-analytics',
        label: 'Analytics',
        url: '/analytics',
        parentKey: 'dashboard',
      },
      {
        key: 'dashboard-ecommerce',
        label: 'eCommerce',
        url: '/ecommerce',
        parentKey: 'dashboard',
      },
      {
        key: 'dashboard-project',
        label: 'Projects',
        url: '/projects',
        parentKey: 'dashboard',
      },
      {
        key: 'dashboard-hrm',
        label: 'HRM',
        url: '/hrm',
        parentKey: 'dashboard',
      },
       {
        key: 'dashboard-jobs',
        label: 'Jobs',
        url: '/jobs',
        parentKey: 'dashboard',
      },
    ],
  },
  {
    key: 'pages',
    label: 'PAGES',
    isTitle: true,
  },
  {
    key: 'auth',
    label: 'Authentication',
    icon: 'users',
    collapsed: true,
    children: [
      {
        key: 'auth-login',
        label: 'Log In',
        url: '/auth/login',
        parentKey: 'auth',
      },
      {
        key: 'auth-register',
        label: 'Register',
        url: '/auth/register',
        parentKey: 'auth',
      },
      {
        key: 'auth-password',
        label: 'Recover Password',
        url: '/auth/recoverpw',
        parentKey: 'auth',
      },
      {
        key: 'auth-lockscreen',
        label: 'Lock Screen',
        url: '/auth/lock-screen',
        parentKey: 'auth',
      },
      {
        key: 'auth-confirm-mail',
        label: 'Confirm Mail',
        url: '/auth/confirm-mail',
        parentKey: 'auth',
      },
      {
        key: 'auth-email-verification',
        label: 'Email Verification',
        url: '/email-verification',
        parentKey: 'auth',
      },
      {
        key: 'auth-logout',
        label: 'Logout',
        url: '/auth/logout',
        parentKey: 'auth',
      },
    ],
  },
  {
    key: 'error',
    label: 'Error Pages',
    icon: 'alert-octagon',
    collapsed: true,
    children: [
      {
        key: 'error-404',
        label: 'Error 404',
        url: '/error-404',
        parentKey: 'error',
      },
      {
        key: 'error-500',
        label: 'Error 500',
        url: '/error-500',
        parentKey: 'error',
      },
      {
        key: 'error-503',
        label: 'Error 503',
        url: '/error-503',
        parentKey: 'error',
      },
      {
        key: 'error-429',
        label: 'Error 429',
        url: '/error-429',
        parentKey: 'error',
      },
      {
        key: 'error-offline',
        label: 'Offline Page',
        url: '/offline-page',
        parentKey: 'error',
      },
    ],
  },
  {
    key: 'utility',
    label: 'Utility',
    collapsed: true,
    icon: 'file-text',
    children: [
      {
        key: 'utility-starter',
        label: 'Starter',
        url: '/pages/starter',
        parentKey: 'utility',
      },
      {
        key: 'utility-profile',
        label: 'Profile',
        url: '/pages/profile',
        parentKey: 'utility',
      },
      {
        key: 'utility-pricing',
        label: 'Pricing',
        url: '/pages/pricing',
        parentKey: 'utility',
      },
      {
        key: 'utility-timeline',
        label: 'Timeline',
        url: '/pages/timeline',
        parentKey: 'utility',
      },
      {
        key: 'utility-invoice',
        label: 'Invoice',
        url: '/pages/invoice',
        parentKey: 'utility',
      },
      {
        key: 'utility-faq',
        label: 'FAQs',
        url: '/pages/faqs',
        parentKey: 'utility',
      },
      {
        key: 'utility-gallery',
        label: 'Gallery',
        url: '/pages/gallery',
        parentKey: 'utility',
      },
      {
        key: 'utility-maintainance',
        label: 'Maintenance',
        url: '/maintenance',
        parentKey: 'utility',
      },
      {
        key: 'utility-coming-soon',
        label: 'Coming Soon',
        url: '/coming-soon',
        parentKey: 'utility',
      },
    ],
  },

  {
    key: 'apps',
    label: 'APPS',
    isTitle: true,
  },
  {
    key: 'todo',
    label: 'Todo List',
    icon: 'columns',
    url: '/apps/todolist',
  },
  {
    key: 'contact',
    label: 'Contacts',
    icon: 'map-pin',
    url: '/apps/contacts',
  },
  {
    key: 'calendar',
    label: 'Calendar',
    icon: 'calendar',
    url: '/apps/calendar',
  },
  {
    key: 'general',
    label: 'GENERAL',
    isTitle: true,
  },
  {
    key: 'components',
    label: 'Components',
    icon: 'package',
    collapsed: true,
    children: [
      {
        key: 'components-accordion',
        label: 'Accordions',
        url: '/ui/accordions',
        parentKey: 'components',
      },
      {
        key: 'components-alert',
        label: 'Alerts',
        url: '/ui/alerts',
        parentKey: 'components',
      },
      {
        key: 'components-badge',
        label: 'Badges',
        url: '/ui/badges',
        parentKey: 'components',
      },
      {
        key: 'components-breadcrumb',
        label: 'Breadcrumb',
        url: '/ui/breadcrumb',
        parentKey: 'components',
      },
      {
        key: 'components-button',
        label: 'Buttons',
        url: '/ui/buttons',
        parentKey: 'components',
      },
      {
        key: 'components-card',
        label: 'Cards',
        url: '/ui/cards',
        parentKey: 'components',
      },
      {
        key: 'components-collapse',
        label: 'Collapse',
        url: '/ui/collapse',
        parentKey: 'components',
      },
      {
        key: 'components-dropdown',
        label: 'Dropdowns',
        url: '/ui/dropdowns',
        parentKey: 'components',
      },
      {
        key: 'components-video',
        label: 'Embed Video',
        url: '/ui/video',
        parentKey: 'components',
      },
      {
        key: 'components-grid',
        label: 'Grid',
        url: '/ui/grid',
        parentKey: 'components',
      },
      {
        key: 'components-images',
        label: 'Images',
        url: '/ui/images',
        parentKey: 'components',
      },
      {
        key: 'components-list',
        label: 'List Group',
        url: '/ui/list',
        parentKey: 'components',
      },
      {
        key: 'components-modal',
        label: 'Modals',
        url: '/ui/modals',
        parentKey: 'components',
      },
      {
        key: 'components-placeholder',
        label: 'Placeholders',
        url: '/ui/placeholders',
        parentKey: 'components',
      },
      {
        key: 'components-pagination',
        label: 'Pagination',
        url: '/ui/pagination',
        parentKey: 'components',
      },
      {
        key: 'components-popver',
        label: 'Popovers',
        url: '/ui/popovers',
        parentKey: 'components',
      },
      {
        key: 'components-progress',
        label: 'Progress',
        url: '/ui/progress',
        parentKey: 'components',
      },
      {
        key: 'components-scrollspy',
        label: 'Scrollspy',
        url: '/ui/scrollspy',
        parentKey: 'components',
      },
      {
        key: 'components-spinner',
        label: 'Spinners',
        url: '/ui/spinners',
        parentKey: 'components',
      },
      {
        key: 'components-tabs',
        label: 'Tabs',
        url: '/ui/tabs',
        parentKey: 'components',
      },
      {
        key: 'components-tooltip',
        label: 'Tooltips',
        url: '/ui/tooltips',
        parentKey: 'components',
      },
      {
        key: 'components-typography',
        label: 'Typography',
        url: '/ui/typography',
        parentKey: 'components',
      },
    ],
  },
  {
    key: 'widget',
    label: 'Widgets',
    icon: 'aperture',
    url: '/widgets',
  },
  {
    key: 'extended',
    label: 'Extended UI',
    icon: 'cpu',
    collapsed: true,
    children: [
      {
        key: 'extended-carousel',
        label: 'Carousel',
        url: '/extended/carousel',
        parentKey: 'extended',
      },
      {
        key: 'extended-noti',
        label: 'Notifications',
        url: '/extended/notifications',
        parentKey: 'extended',
      },
      {
        key: 'extended-offcanvas',
        label: 'Offcanvas',
        url: '/extended/offcanvas',
        parentKey: 'extended',
      },
      {
        key: 'extended-range',
        label: 'Range Slider',
        url: '/extended/range-slider',
        parentKey: 'extended',
      },
    ],
  },
  {
    key: 'icon',
    label: 'Icons',
    icon: 'award',
    collapsed: true,
    children: [
      {
        key: 'icon-feather',
        label: 'Feather Icons',
        url: '/icons/feather',
        parentKey: 'icon',
      },
      {
        key: 'icon-material',
        label: 'Material Design Icons',
        url: '/icons/mdi',
        parentKey: 'icon',
      },
    ],
  },
  {
    key: 'forms',
    label: 'Forms',
    icon: 'briefcase',
    collapsed: true,
    children: [
      {
        key: 'forms-element',
        label: 'General Elements',
        url: '/forms/elements',
        parentKey: 'forms',
      },
      {
        key: 'forms-validation',
        label: 'Validation',
        url: '/forms/validation',
        parentKey: 'forms',
      },
      {
        key: 'forms-quilljs',
        label: 'Quilljs Editor',
        url: '/forms/quilljs',
        parentKey: 'forms',
      },
      {
        key: 'forms-pickr',
        label: 'Picker',
        url: '/forms/pickers',
        parentKey: 'forms',
      },
    ],
  },
  {
    key: 'table',
    label: 'Tables',
    icon: 'table',
    collapsed: true,
    children: [
      {
        key: 'table-basic',
        label: 'Basic Tables',
        url: '/tables/basic',
        parentKey: 'table',
      },
      {
        key: 'table-datatable',
        label: 'Data Tables',
        url: '/tables/datatables',
        parentKey: 'table',
      },
    ],
  },
  {
    key: 'charts',
    label: 'Apex Charts',
    icon: 'pie-chart',
    collapsed: true,
    children: [
      {
        key: 'charts-line',
        label: 'Line',
        url: '/charts/line',
        parentKey: 'charts',
      },
      {
        key: 'charts-area',
        label: 'Area',
        url: '/charts/area',
        parentKey: 'charts',
      },
      {
        key: 'charts-column',
        label: 'Column',
        url: '/charts/column',
        parentKey: 'charts',
      },
      {
        key: 'charts-bar',
        label: 'Bar',
        url: '/charts/bar',
        parentKey: 'charts',
      },
      {
        key: 'charts-mixed',
        label: 'Mixed',
        url: '/charts/mixed',
        parentKey: 'charts',
      },
      {
        key: 'charts-timeline',
        label: 'Timeline',
        url: '/charts/timeline',
        parentKey: 'charts',
      },
      {
        key: 'charts-range',
        label: 'Range Area',
        url: '/charts/rangearea',
        parentKey: 'charts',
      },
      {
        key: 'charts-funnel',
        label: 'Funnel',
        url: '/charts/funnel',
        parentKey: 'charts',
      },
      {
        key: 'charts-candlesticks',
        label: 'Candlestick',
        url: '/charts/candlestick',
        parentKey: 'charts',
      },
      {
        key: 'charts-boxplot',
        label: 'Boxplot',
        url: '/charts/boxplot',
        parentKey: 'charts',
      },
      {
        key: 'charts-bubble',
        label: 'Bubble',
        url: '/charts/bubble',
        parentKey: 'charts',
      },
      {
        key: 'charts-scatter',
        label: 'Scatter',
        url: '/charts/scatter',
        parentKey: 'charts',
      },
      {
        key: 'charts-heatmap',
        label: 'Heatmap',
        url: '/charts/heatmap',
        parentKey: 'charts',
      },
      {
        key: 'charts-treemap',
        label: 'Treemap',
        url: '/charts/treemap',
        parentKey: 'charts',
      },
      {
        key: 'charts-pie',
        label: 'Pie',
        url: '/charts/pie',
        parentKey: 'charts',
      },
      {
        key: 'charts-radialbar',
        label: 'Radialbar',
        url: '/charts/radialbar',
        parentKey: 'charts',
      },
      {
        key: 'charts-radar',
        label: 'Radar',
        url: '/charts/radar',
        parentKey: 'charts',
      },
      {
        key: 'charts-polar',
        label: 'Polar',
        url: '/charts/polararea',
        parentKey: 'charts',
      },
    ],
  },
  {
    key: 'maps',
    label: 'Maps',
    icon: 'map',
    collapsed: true,
    children: [
      {
        key: 'maps-google',
        label: 'Google Maps',
        url: '/maps/google',
        parentKey: 'maps',
      },
      {
        key: 'maps-vector',
        label: 'Vector Maps',
        url: '/maps/vector',
        parentKey: 'maps',
      },
    ],
  },
]
