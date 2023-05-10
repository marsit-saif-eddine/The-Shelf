// ** React Imports
import { lazy } from "react";
import { Navigate } from "react-router-dom";
import InviteAdmin from "../../views/pages/authentication/InviteAdmin";
import AppChat from "../../views/apps/chat";

const Chat = lazy(() => import("../../views/apps/chat"));
const Todo = lazy(() => import("../../views/apps/todo"));
const Email = lazy(() => import("../../views/apps/email"));
const Kanban = lazy(() => import("../../views/apps/kanban"));
const Calendar = lazy(() => import("../../views/apps/calendar"));
const Quiz = lazy(() => import("../../views/apps/quiz"));
const QuizByBook = lazy(() => import("../../views/apps/quiz/quizByBook"));
const QuizById = lazy(() => import("../../views/apps/quiz/quizDetails"));


const EcommerceShop = lazy(() => import("../../views/apps/ecommerce/shop"));
const EcommerceDetail = lazy(() => import("../../views/apps/ecommerce/detail"));
const EcommerceWishlist = lazy(() =>
  import("../../views/apps/ecommerce/wishlist")
);
const EcommerceCheckout = lazy(() =>
  import("../../views/apps/ecommerce/checkout")
);

const InvoiceAdd = lazy(() => import('../../views/apps/invoice/add'))
const InvoiceList = lazy(() => import('../../views/apps/invoice/list'))
const InvoiceEdit = lazy(() => import('../../views/apps/invoice/edit'))
const InvoicePrint = lazy(() => import('../../views/apps/invoice/print'))
const InvoicePreview = lazy(() => import('../../views/apps/invoice/preview'))

const UserList = lazy(() => import("../../views/apps/user/list"));
const UserView = lazy(() => import("../../views/apps/user/view"));

const Roles = lazy(() => import("../../views/apps/roles-permissions/roles"));
const Permissions = lazy(() =>
  import("../../views/apps/roles-permissions/permissions")
);
const Events = lazy(() => import("../../views/apps/Events/EventsCards"));
const Eventsdetails = lazy(() => import("../../views/apps/Events/EventDetail"));
const EventsaddForm = lazy(() =>
  import("../../views/apps/Events/NewEventForm")
);



const Eventsadmin=lazy(() => import('../../views/apps/EventAdmin/AdminEventTable'))
const MyQuizzes=lazy(() => import('../../views/pages/profile/MyQuizzes'))
const QuizAdmin=lazy(() => import('../../views/apps/quiz/admin/quizTable.js'))
const MyEvents=lazy(() => import('../../views/pages/profile/MyEvents'))
const VideoCall = lazy(() => import("../../views/apps/Events/VideoCall"));

const EventsMore = lazy(() =>
  import("../../views/pages/profile/ProfileshowMoreEvents")
);

const ClubsList = lazy(() =>
  import("../../views/clubs-management/clubs/ClubsList")
);
const AddClub = lazy(() => import("../../views/clubs-management/AddClub"));
const ClubDetails = lazy(() =>
  import("../../views/clubs-management/club-details/ClubDetails")
);

/* Books */
const Books = lazy(() => import('../../views/apps/books/index'))
const AddBook = lazy(() => import('../../views/apps/books/addBook'))
const Book = lazy(() => import('../../views/apps/books/detail/index'))
const Booksadmin = lazy(() => import('../../views/apps/BookAdmin/list/index'))
const MyBooksProfile=lazy(() => import('../../views/pages/profile/MyBooks'))

/* End_Books */

const VideoConferance = lazy(() => import('../../views/apps/Events/chatvideoconf'))


/* Posts */
const Posts = lazy(() => import('../../views/apps/posts/index'))
const AddPost = lazy(() => import('../../views/apps/posts/addPost'))
const Post = lazy(() => import('../../views/apps/posts/detail/index'))
const Postsadmin = lazy(() => import('../../views/apps/posts/admin/postTable'))


/* End_Posts */



const AppRoutes = [

  {
    element: <Email />,
    path: "/apps/email",
    meta: {
      appLayout: true,
      className: "email-application",
    },
  },

  {
    element: <Email />,
    path: "/apps/email/:folder",
    meta: {
      appLayout: true,
      className: "email-application",
    },
  },

  {
    element: <Email />,
    path: "/apps/email/label/:label",
    meta: {
      appLayout: true,
      className: "email-application",
    },
  },

  {
    element: <Email />,
    path: "/apps/email/:filter",
  },

  // {
  //   path: "/apps/chat",
  //   element: <Chat />,
  //   meta: {
  //     appLayout: true,
  //     className: "chat-application",
  //     layout: "horizontal",
  //     action: "client",
  //     resource: "client",
  //   },
  // },


  {
    element: <Books />,
    path: "/apps/books",
    meta: {
      appLayout: false,
      className: "chat-application",
      layout: "horizontal",
      action: "read",
      resource: "ACL",
      //action: 'client',
      //resource: 'client'
    },
  },
  {
    element: <Books />,
    path: "/apps/books/:name",
    meta: {
      appLayout: false,
      className: "chat-application",
      layout: "horizontal",
      action: "read",
      resource: "ACL",
      //action: 'client',
      //resource: 'client'
    },
  },
  {
    element: <VideoConferance />,
    path: "/apps/videoconf",
    meta: {
      appLayout: false,
      className: "chat-application",
      layout: "horizontal",
      action: "client",
      resource: "client",
    },
  },
  
  {
    element: <VideoCall />,
    path: "/apps/call",
    meta: {
      appLayout: false,
      className: "chat-application",
      layout: "horizontal",
      action: "client",
      resource: "client",
    },
  },
  {
    element: <AddBook />,
    path: "/addbook",
    meta: {
      appLayout: false,
      className: "chat-application",
      layout: "horizontal",
      action: "client",
      resource: "client",
    },
  },

  {
    element: <Book />,
    path: "/bookdetail/:id",
    meta: {
      appLayout: false,
      className: "chat-application",
      layout: "horizontal",
      // action: 'client',
      // resource: 'client'
      action: "read",
      resource: "ACL",
    },
  },

  {
    path: "/books/list",
    element: <Booksadmin />,
    meta: {
      appLayout: false,
      className: "chat-application",
      layout: "vertical",
      action: "admin",
      resource: "admin",
    },
  },


  {
    element: <Posts />,
    path: '/apps/posts',
    meta: {
      appLayout: false,
      className: 'chat-application',
      layout: 'horizontal',
      action: 'read',
      resource: 'ACL',
      //action: 'client',
      //resource: 'client'
    }
  },


  {
    element: <AddPost/>,
    path: '/addpost',
    meta: {
      appLayout: false,
      className: 'chat-application',
      layout: 'horizontal',
      action: 'client',
      resource: 'client'
    }
  },
  {
    element: <AddPost/>,
    path: '/addpost/:id',
    meta: {
      appLayout: false,
      className: 'chat-application',
      layout: 'horizontal',
      action: 'client',
      resource: 'client'
    }
  },

  {
    element: <Post/>,
    path: '/postdetail/:id',
    meta: {
      appLayout: false,
      className: 'chat-application',
      layout: 'horizontal',
     // action: 'client',
     // resource: 'client'
      action: 'read',
      resource: 'ACL',
    }
  },

  {
    path: '/posts/list',
    element: <Postsadmin />,
    meta: {
      appLayout: false,
      className: 'chat-application',
      layout: 'vertical',
      action: 'admin',
      resource: 'admin'
    }
    
  },

  {
    element: < VideoConferance/>,
    path: '/apps/videoconf',
    meta: {
      appLayout: false,
      className: 'chat-application',
      layout: 'horizontal',
      action: 'client',
      resource: 'client'
    }
  },
  {
    path: "/eventsdetail/:id",
    element: <Eventsdetails />,
    meta: {
      appLayout: false,
      className: "chat-application",
      layout: "horizontal",
      action: "client",
      resource: "client",
    },
  },
  {
    path: "/events/list",
    element: <Eventsadmin />,
    meta: {
      appLayout: false,
      className: "chat-application",
      layout: "vertical",
      action: "admin",
      resource: "admin",
    },
  },
  {
    path: "/eventsmore",
    element: <EventsMore />,
    meta: {
      appLayout: false,
      className: "chat-application",
      layout: "horizontal",
      action: "client",
      resource: "client",
    },
  },

  {
    path: "/quizzes/list",
    element: <QuizAdmin />,
    meta: {
      appLayout: false,
      className: "chat-application",
      layout: "vertical",
      action: "admin",
      resource: "admin",
    },
  },
  {
    path: "/eventsform",
    element: <EventsaddForm />,
    meta: {
      appLayout: false,
      className: "chat-application",
      layout: "horizontal",
      action: "client",
      resource: "client",
    },
  },
  {
    path: "/apps/events",
    element: <Events />,
    meta: {
      appLayout: false,
      className: "chat-application",
      layout: "horizontal",
      action: "client",
      resource: "client",
    },
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
    path: "/apps/myquiz",
    element: <Quiz />,
    meta: {
      appLayout: false,
      className: "quiz-application",
      layout: "horizontal",
      action: "client",
      resource: "client",
    },
  },

  {
    path: "/pages/profile/event",
    element: <MyEvents />,
    meta: {
      appLayout: false,
      className: "quiz-application",
      layout: "horizontal",
      action: "client",
      resource: "client",
    },
  },

  {
    element: <QuizByBook />,
    path: "/quiz/allquiz/quizByBook/:id",
    meta: {
      appLayout: false,
      className: "quizbook-application",
      layout: "horizontal",
      action: "client",
      resource: "client",
    },
  },
  {
    element: <QuizById />,
    path: "/quiz/:id",
    meta: {
      appLayout: false,
      className: "quizid-application",
      layout: "horizontal",
      action: "client",
      resource: "client",
    },
  },
  {
    element: <Todo />,
    path: "/apps/todo",
    meta: {
      appLayout: true,
      className: "todo-application",
    },
  },
  {
    element: <Todo />,
    path: "/apps/todo/:filter",
    meta: {
      appLayout: true,
      className: "todo-application",
    },
  },
  {
    element: <Todo />,
    path: "/apps/todo/tag/:tag",
    meta: {
      appLayout: true,
      className: "todo-application",
    },
  },
  {
    element: <Calendar />,
    path: "/apps/calendar",
  },
  {
    element: <Kanban />,
    path: "/apps/kanban",
    meta: {
      appLayout: true,
      className: "kanban-application",
    },
  },
  {
    element: <InvoiceList />,
    path: "/apps/invoice/list",
  },
  {
    element: <InvoicePreview />,
    path: "/apps/invoice/preview/:id",
  },
  {
    path: "/apps/invoice/preview",
    element: <Navigate to="/apps/invoice/preview/4987" />,
  },
  {
    element: <InvoiceEdit />,
    path: "/apps/invoice/edit/:id",
  },
  {
    path: "/apps/invoice/edit",
    element: <Navigate to="/apps/invoice/edit/4987" />,
  },
  {
    element: <InvoiceAdd />,
    path: "/apps/invoice/add",
  },
  {
    path: "/apps/invoice/print",
    element: <InvoicePrint />,
    meta: {
      layout: "blank",
    },
  },
  {
    element: <EcommerceShop />,
    path: "/apps/ecommerce/shop",
    meta: {
      className: "ecommerce-application",
    },
  },
  {
    element: <EcommerceWishlist />,
    path: "/apps/ecommerce/wishlist",
    meta: {
      className: "ecommerce-application",
    },
  },
  {
    path: "/apps/ecommerce/product-detail",
    element: (
      <Navigate to="/apps/ecommerce/product-detail/apple-i-phone-11-64-gb-black-26" />
    ),
    meta: {
      className: "ecommerce-application",
    },
  },
  {
    path: "/apps/ecommerce/product-detail/:product",
    element: <EcommerceDetail />,
    meta: {
      className: "ecommerce-application",
    },
  },
  {
    path: "/apps/ecommerce/checkout",
    element: <EcommerceCheckout />,
    meta: {
      className: "ecommerce-application",
    },
  },

  {
    element: <UserList />,
    path: "/users/list",
    meta: {
      action: "admin",
      resource: "admin",
    },
  },
  {
    path: "/user/view",
    element: <Navigate to="/apps/user/view/1" />,
    meta: {
      action: "read",
      resource: "ACL",
    },
  },
  {
    element: <UserView />,
    path: "/user/view/:id",
    meta: {
      action: "read",
      resource: "ACL",
    },
  },
  {
    element: <Roles />,
    path: "/apps/roles",
  },
  {
    element: <Permissions />,
    path: "/apps/permissions",
  },

  //// WAJIH'S ROUTES
  {
    element: <ClubsList />,
    path: "/apps/clubs/listt",
    meta: {
      appLayout: false,
      className: "zef-application",
      layout: "horizontal",
      action: "client",
      resource: "client",
    },
  },
  {
    element: <ClubsList />,
    path: "/apps/clubs/list",
    meta: {
      appLayout: false,
      className: "azef-application",
      layout: "vertical",
      action: "admin",
      resource: "admin",
    },
  },
  {
    element: <ClubsList/>,
    path: "/apps/clubs/listt",
    meta: {
      appLayout: false,
      className: "argaz-application",
      layout: "horizontal",
      action: "client",
      resource: "client",
    },
  },
  {
    element: <AddClub />,
    path: "/apps/clubs/add",
    meta: {
      appLayout: false,
      className: "chat-application",
      layout: "vertical",
      action: "admin",
      resource: "admin",
    },
  },
  {
    element: <AddClub />,
    path: "/apps/clubs/edit/:id",
    meta: {
      appLayout: false,
      className: "chat-application",
      layout: "vertical",
      action: "admin",
      resource: "admin",
    },
  },
  {
    element: <ClubDetails />,
    path: "/apps/clubs/details/:id",
    meta: {
      appLayout: false,
      className: "aerha-application",
      layout: "vertical",
      action: "admin",
      resource: "admin",
    },
  },
  {
    element: <AddClub />,
    path: "/apps/clubs/addd",
    meta: {
      appLayout: false,
      className: "etherg-application",
      layout: "horizontal",
      action: "client",
      resource: "client",
    },
  },
  {
    element: <AddClub />,
    path: "/apps/clubs/editt/:id",
    meta: {
      appLayout: false,
      className: "teh-application",
      layout: "horizontal",
      action: "client",
      resource: "client",
    },
  },
  {
    element: <ClubDetails />,
    path: "/apps/clubs/detailss/:id",
    meta: {
      appLayout: false,
      className: "zererg-application",
      layout: "horizontal",
      action: "client",
      resource: "client",
    },
  },
  {
    element: <InviteAdmin />,
    path: "/apps/invite-admin",
    meta: {
      appLayout: false,
      className: "zerefrg-application",
      layout: "vertical",
      action: "admin",
      resource: "admin",
    },
  },
  {
    element: <AppChat />,
    path: "/apps/chat",
    meta: {
      appLayout: false,
      className: "chat-application",
      layout: "vertical",
      action: "admin",
      resource: "admin",
    },
  },
  {
    element: <AppChat />,
    path: "/apps/chatt",
    meta: {
      appLayout: false,
      className: "chat-application",
      layout: "horizontal",
      action: "client",
      resource: "client",
    },
  },
];

export default AppRoutes;
