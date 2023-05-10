// ** Icons Import
import {
  Box,
  Mail,
  User,
  Circle,
  Shield,
  Calendar,
  FileText,
  CheckSquare,
  ShoppingCart,
  MessageSquare,
  Award,
  Book,
  Edit
} from 'react-feather'



export default [
  
  // {
  //       id: 'chat',
  //       title: 'Chat',
  //       icon: <MessageSquare />,
  //       navLink: '/apps/chat',
  //       action: 'client',
  //       resource: 'client',
  //    },

     {
      id: 'event',
      title: 'Events',
      icon: <FileText />,
      navLink: '/apps/events',
      action: 'client',
      resource: 'client',
     },
   {
      id: 'books',
      title: 'Books',
      icon: <Book />,
      navLink: '/apps/books',
      action: 'client',
      resource: 'client',
   },

  {
    id: 'posts',
    title: 'Posts',
    icon: <Edit />,
    navLink: '/apps/posts',
    action: 'client',
    resource: 'client',
 },

  {
    id: "clubs",
    title: "Clubs",
    icon: <Award />,
    navLink: "/apps/clubs/listt",
    action: "client",
    resource: "client",
  },
  {
    id: "apps",
    title: "Apps",
    icon: <Box />,
    children: [
      //     {
      //       id: 'email',
      //       title: 'Email',
      //       icon: <Mail />,
      //       navLink: '/apps/email'
      //     },

      //     {
      //       id: 'todo',
      //       title: 'Todo',
      //       icon: <CheckSquare />,
      //       navLink: '/apps/todo'
      //     },
      //     {
      //       id: 'calendar',
      //       title: 'Calendar',
      //       icon: <Calendar />,
      //       navLink: '/apps/calendar'
      //     },
      //     {
      //       id: 'kanban',
      //       title: 'Kanban',
      //       icon: <CheckSquare size={20} />,
      //       navLink: '/apps/kanban'
      //     },
      //     {
      //       id: 'invoiceApp',
      //       title: 'Invoice',
      //       icon: <FileText />,
      //       children: [
      //         {
      //           id: 'invoiceList',
      //           title: 'List',
      //           icon: <Circle />,
      //           navLink: '/apps/invoice/list'
      //         },
      //         {
      //           id: 'invoicePreview',
      //           title: 'Preview',
      //           icon: <Circle />,
      //           navLink: '/apps/invoice/preview'
      //         },
      //         {
      //           id: 'invoiceEdit',
      //           title: 'Edit',
      //           icon: <Circle />,
      //           navLink: '/apps/invoice/edit'
      //         },
      //         {
      //           id: 'invoiceAdd',
      //           title: 'Add',
      //           icon: <Circle />,
      //           navLink: '/apps/invoice/add'
      //         }
      //       ]
      //     },
      //     {
      //       id: 'roles-permissions',
      //       title: 'Roles & Permissions',
      //       icon: <Shield size={20} />,
      //       children: [
      //         {
      //           id: 'roles',
      //           title: 'Roles',
      //           icon: <Circle size={12} />,
      //           navLink: '/apps/roles'
      //         },
      //         {
      //           id: 'permissions',
      //           title: 'Permissions',
      //           icon: <Circle size={12} />,
      //           navLink: '/apps/permissions'
      //         }
      //       ]
      //     },
      //     {
      //       id: 'eCommerce',
      //       title: 'eCommerce',
      //       icon: <ShoppingCart />,
      //       children: [
      //         {
      //           id: 'shop',
      //           title: 'Shop',
      //           icon: <Circle />,
      //           navLink: '/apps/ecommerce/shop'
      //         },
      //         {
      //           id: 'detail',
      //           title: 'Details',
      //           icon: <Circle />,
      //           navLink: '/apps/ecommerce/product-detail'
      //         },
      //         {
      //           id: 'wishList',
      //           title: 'Wish List',
      //           icon: <Circle />,
      //           navLink: '/apps/ecommerce/wishlist'
      //         },
      //         {
      //           id: 'checkout',
      //           title: 'Checkout',
      //           icon: <Circle />,
      //           navLink: '/apps/ecommerce/checkout'
      //         }
      //       ]
      //     },

      {
        id: "Users",
        title: "Users",
        icon: <Circle />,
        navLink: "users/list",
      },
      {
        id: "appChat",
        title: "Chat",
        icon: <Mail />,
        navLink: "/apps/chatt",
        action: "client",
        resource: "client",
      },
      // ,
      // {
      //   id: 'view',
      //   title: 'View',
      //   icon: <Circle />,
      //   navLink: 'user/view'
      // },
    ],
  },
];
