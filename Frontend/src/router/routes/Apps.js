// ** React Imports
import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

const Chat = lazy(() => import('../../views/apps/chat'))
const Todo = lazy(() => import('../../views/apps/todo'))
const Email = lazy(() => import('../../views/apps/email'))
const Kanban = lazy(() => import('../../views/apps/kanban'))
const Calendar = lazy(() => import('../../views/apps/calendar'))

const InvoiceAdd = lazy(() => import('../../views/apps/invoice/add'))
const InvoiceList = lazy(() => import('../../views/apps/invoice/list'))
const InvoiceEdit = lazy(() => import('../../views/apps/invoice/edit'))
const InvoicePrint = lazy(() => import('../../views/apps/invoice/print'))
const InvoicePreview = lazy(() => import('../../views/apps/invoice/preview'))

const EcommerceShop = lazy(() => import('../../views/apps/ecommerce/shop'))
const EcommerceDetail = lazy(() => import('../../views/apps/ecommerce/detail'))
const EcommerceWishlist = lazy(() => import('../../views/apps/ecommerce/wishlist'))
const EcommerceCheckout = lazy(() => import('../../views/apps/ecommerce/checkout'))

const UserList = lazy(() => import('../../views/apps/user/list'))
const UserView = lazy(() => import('../../views/apps/user/view'))

const Roles = lazy(() => import('../../views/apps/roles-permissions/roles'))
const Permissions = lazy(() => import('../../views/apps/roles-permissions/permissions'))
const Events = lazy(() => import('../../views/apps/Events/EventsCards'))
const Eventsdetails = lazy(() => import('../../views/apps/Events/EventDetail'))
const EventsaddForm = lazy(() => import('../../views/apps/Events/NewEventForm'))

const Eventsadmin=lazy(() => import('../../views/apps/EventAdmin/EventTable'))

const AppRoutes = [
  {
    element: <Email />,
    path: '/apps/email',
    meta: {
      appLayout: true,
      className: 'email-application'
    }
  },
  {
    element: <Email />,
    path: '/apps/email/:folder',
    meta: {
      appLayout: true,
      className: 'email-application'
    }
  },
  {
    element: <Email />,
    path: '/apps/email/label/:label',
    meta: {
      appLayout: true,
      className: 'email-application'
    }
  },
  {
    element: <Email />,
    path: '/apps/email/:filter'
  },
  {
    path: '/apps/chat',
    element: <Chat />,
    meta: {
      appLayout: true,
      className: 'chat-application',
      layout: 'horizontal',
      action: 'client',
      resource: 'client'
    }
    
  },
  
  {
    path: '/eventsdetail/:id',
    element: <Eventsdetails />,
    meta: {
      appLayout: true,
      className: 'chat-application',
      layout: 'horizontal',
      action: 'client',
      resource: 'client'
    }
    
  },
  {
    path: '/events/list',
    element: <Eventsadmin />,
    meta: {
      appLayout: true,
      className: 'chat-application',
      layout: 'vertical',
      action: 'admin',
      resource: 'admin'
    }
    
  },
  {
    path: '/eventsform',
    element: <EventsaddForm />,
    meta: {
      appLayout: true,
      className: 'chat-application',
      layout: 'horizontal',
      action: 'client',
      resource: 'client'
    }
    
  },
  {
    path: '/apps/events',
    element: <Events />,
    meta: {
      appLayout: true,
      className: 'chat-application',
      layout: 'horizontal',
      action: 'client',
      resource: 'client'
    }
    
  },
  // {
  //   path: '/apps/events/update',
  //   element: <EventsUpdate />,
  //   meta: {
  //     appLayout: true,
  //     className: 'chat-application',
  //     layout: 'horizontal',
  //     action: 'client',
  //     resource: 'client'
  //   }
    
  // },
  {
    element: <Todo />,
    path: '/apps/todo',
    meta: {
      appLayout: true,
      className: 'todo-application'
    }
  },
  {
    element: <Todo />,
    path: '/apps/todo/:filter',
    meta: {
      appLayout: true,
      className: 'todo-application'
    }
  },
  {
    element: <Todo />,
    path: '/apps/todo/tag/:tag',
    meta: {
      appLayout: true,
      className: 'todo-application'
    }
  },
  {
    element: <Calendar />,
    path: '/apps/calendar'
  },
  {
    element: <Kanban />,
    path: '/apps/kanban',
    meta: {
      appLayout: true,
      className: 'kanban-application'
    }
  },
  {
    element: <InvoiceList />,
    path: '/apps/invoice/list'
  },
  {
    element: <InvoicePreview />,
    path: '/apps/invoice/preview/:id'
  },
  {
    path: '/apps/invoice/preview',
    element: <Navigate to='/apps/invoice/preview/4987' />
  },
  {
    element: <InvoiceEdit />,
    path: '/apps/invoice/edit/:id'
  },
  {
    path: '/apps/invoice/edit',
    element: <Navigate to='/apps/invoice/edit/4987' />
  },
  {
    element: <InvoiceAdd />,
    path: '/apps/invoice/add'
  },
  {
    path: '/apps/invoice/print',
    element: <InvoicePrint />,
    meta: {
      layout: 'blank'
    }
  },
  {
    element: <EcommerceShop />,
    path: '/apps/ecommerce/shop',
    meta: {
      className: 'ecommerce-application'
    }
  },
  {
    element: <EcommerceWishlist />,
    path: '/apps/ecommerce/wishlist',
    meta: {
      className: 'ecommerce-application'
    }
  },
  {
    path: '/apps/ecommerce/product-detail',
    element: <Navigate to='/apps/ecommerce/product-detail/apple-i-phone-11-64-gb-black-26' />,
    meta: {
      className: 'ecommerce-application'
    }
  },
  {
    path: '/apps/ecommerce/product-detail/:product',
    element: <EcommerceDetail />,
    meta: {
      className: 'ecommerce-application'
    }
  },
  {
    path: '/apps/ecommerce/checkout',
    element: <EcommerceCheckout />,
    meta: {
      className: 'ecommerce-application'
    }
  },
  {
    element: <UserList />,
    path: '/users/list',
    meta: {
      action: 'admin',
      resource: 'admin'
    }
  },
  {
    path: '/user/view',
    element: <Navigate to='/apps/user/view/1' />,
    meta: {
      action: 'read',
      resource: 'ACL'
    }
  },
  {
    element: <UserView />,
    path: '/user/view/:id',
    meta: {
      action: 'read',
      resource: 'ACL'
    }
  },
  {
    element: <Roles />,
    path: '/apps/roles'
  },
  {
    element: <Permissions />,
    path: '/apps/permissions'
  }
]

export default AppRoutes
