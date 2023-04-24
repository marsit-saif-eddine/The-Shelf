import { lazy } from 'react'

const Home = lazy(() => import('../../views/pages/Home/Home'))

const HomeRoutes = [
  {
    path: '/Home',
    element: <Home />,
    
    meta: {
        appLayout: false,
        className: 'home-page',
        layout: 'horizontal',
        action: 'client',
        resource: 'client',
        menuHidden: true,
        publicRoute: true,

      }
  } 
]

export default HomeRoutes
