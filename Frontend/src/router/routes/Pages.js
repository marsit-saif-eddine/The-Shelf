import { lazy } from 'react'
import { Navigate } from 'react-router-dom'

const Faq = lazy(() => import('../../views/pages/faq'))
const ApiKey = lazy(() => import('../../views/pages/api-key'))
const Profile = lazy(() => import('../../views/pages/profile'))
const Pricing = lazy(() => import('../../views/pages/pricing'))
const License = lazy(() => import('../../views/pages/license'))
const Error = lazy(() => import('../../views/pages/misc/Error'))
const BlogList = lazy(() => import('../../views/pages/blog/list'))
const BlogEdit = lazy(() => import('../../views/pages/blog/edit'))
const BlogDetails = lazy(() => import('../../views/pages/blog/details'))
const ComingSoon = lazy(() => import('../../views/pages/misc/ComingSoon'))
const ModalExamples = lazy(() => import('../../views/pages/modal-examples'))
const Maintenance = lazy(() => import('../../views/pages/misc/Maintenance'))
const AccountSettings = lazy(() => import('../../views/pages/account-settings'))
const NotAuthorized = lazy(() => import('../../views/pages/misc/NotAuthorized'))
const KnowledgeBase = lazy(() => import('../../views/pages/knowledge-base/KnowledgeBase'))
const KnowledgeBaseCategory = lazy(() => import('../../views/pages/knowledge-base/KnowledgeBaseCategory'))
const KBCategoryQuestion = lazy(() => import('../../views/pages/knowledge-base/KnowledgeBaseCategoryQuestion'))
const MyQuiz = lazy(() => import('../../views/apps/quiz'))
const MyBooksProfile = lazy(() => import('../../views/pages/profile/MyBooks'))
const AddBook = lazy(() => import('../../views/apps/books/addBook'))




const PagesRoutes = [
  {
    path: '/pages/profile/:id',
    element: <Profile />,
    meta: {
      action: 'read',
      resource: 'ACL',
      layout: 'horizontal',
    }
   
  },
  
 {
  path: '/pages/profile/mybooks/:id',
  element: <MyBooksProfile />,
  meta: {
    action: 'read',
    resource: 'ACL',
    layout: 'horizontal',
  }
  
},
{
  path: '/pages/profile/mybooks/:id',
  element: <MyBooksProfile />,
  meta: {
    action: 'read',
    resource: 'ACL',
    layout: 'horizontal',
  }
  
},
{
  path: '/pages/profile/myquizzes/:id',
  element: <MyQuiz />,
  meta: {
    action: 'read',
    resource: 'ACL',
    layout: 'horizontal',
  }
  
},
{
  element: <AddBook/>,
  path: '/addbook/:id',
  meta: {
    appLayout: false,
    className: 'chat-application',
    layout: 'horizontal',
    action: 'client',
    resource: 'client'
  }
},



  {
    path: '/pages/faq',
    element: <Faq />
  },
  {
    path: '/pages/knowledge-base',
    element: <KnowledgeBase />
  },
  {
    path: '/pages/knowledge-base/:category',
    element: <KnowledgeBaseCategory />
  },
  {
    path: '/pages/knowledge-base/:category/:question',
    element: <KBCategoryQuestion />
  },
  {
    path: '/pages/account-settings',
    element: <AccountSettings />,
    meta: {
      appLayout: false,
      className: 'chat-application',
      layout: 'horizontal',
      action: 'client',
      resource: 'client'
    }
  },
  {
    path: '/pages/license',
    element: <License />
  },
  {
    path: '/pages/api-key',
    element: <ApiKey />
  },
  {
    path: '/pages/modal-examples',
    element: <ModalExamples />
  },
  {
    path: '/pages/blog/list',
    element: <BlogList />
  },
  {
    path: '/pages/blog/detail/:id',
    element: <BlogDetails />
  },
  {
    path: '/pages/blog/detail',
    element: <Navigate to='/pages/blog/detail/1' />
  },
  {
    path: '/pages/blog/edit/:id',
    element: <BlogEdit />
  },
  {
    path: '/pages/blog/edit',
    element: <Navigate to='/pages/blog/edit/1' />
  },
  {
    path: '/pages/pricing',
    element: <Pricing />
  },
  {
    path: '/misc/coming-soon',
    element: <ComingSoon />,
    meta: {
      publicRoute: true,
      layout: 'blank'
    }
  },
  {
    path: '/misc/not-authorized',
    element: <NotAuthorized />,
    meta: {
      publicRoute: true,
      layout: 'blank'
    }
  },
  {
    path: '/misc/maintenance',
    element: <Maintenance />,
    meta: {
      publicRoute: true,
      layout: 'blank'
    }
  },
  {
    path: '/misc/error',
    element: <Error />,
    meta: {
      publicRoute: true,
      layout: 'blank'
    }
  }
]

export default PagesRoutes
