// ** React Imports
import { lazy } from 'react'

const Login = lazy(() => import('../../views/pages/authentication/Login'))
const LoginBasic = lazy(() => import('../../views/pages/authentication/LoginBasic'))
const LoginCover = lazy(() => import('../../views/pages/authentication/LoginCover'))

const Register = lazy(() => import('../../views/pages/authentication/Register'))
const RegisterBasic = lazy(() => import('../../views/pages/authentication/RegisterBasic'))
const RegisterCover = lazy(() => import('../../views/pages/authentication/RegisterCover'))
const RegisterMultiSteps = lazy(() => import('../../views/pages/authentication/register-multi-steps'))

const ForgotPassword = lazy(() => import('../../views/pages/authentication/ForgotPassword'))
const ForgotPasswordBasic = lazy(() => import('../../views/pages/authentication/ForgotPasswordBasic'))
const ForgotPasswordCover = lazy(() => import('../../views/pages/authentication/ForgotPasswordCover'))

const ResetPasswordBasic = lazy(() => import('../../views/pages/authentication/ResetPasswordBasic'))
const ResetPasswordCover = lazy(() => import('../../views/pages/authentication/ResetPasswordCover'))

const VerifyEmailBasic = lazy(() => import('../../views/pages/authentication/VerifyEmailBasic'))
const VerifyEmailCover = lazy(() => import('../../views/pages/authentication/VerifyEmailCover'))

const TwoStepsBasic = lazy(() => import('../../views/pages/authentication/TwoStepsBasic'))
const TwoStepsCover = lazy(() => import('../../views/pages/authentication/TwoStepsCover'))

const ConfirmEmail = lazy(() => import('../../views/pages/authentication/ConfirmEmail'))

const InfoPage = lazy(() => import("../../views/pages/authentication/InfoPage"))

const AuthenticationRoutes = [
  {
    path: '/login',
    element: <Login />,
    meta: {
      layout: 'blank',
      publicRoute: true,
      restricted: true
    }
  },
  {
    path: '/pages/login-basic',
    element: <LoginBasic />,
    meta: {
      layout: 'blank'
    }
  },
  {
    path: '/pages/login-cover',
    element: <LoginCover />,
    meta: {
      layout: 'blank'
    }
  },
  {
    path: '/register',
    element: <Register />,
    meta: {
      layout: 'blank',
      publicRoute: true,
      restricted: true
    }
  },
  {
    path: '/admin/sign-up/:id',
    element: <Register />,
    meta: {
      layout: 'blank',
      publicRoute: true,
      restricted: true
    }
  },
  {
    path: '/pages/register-basic',
    element: <RegisterBasic />,
    meta: {
      layout: 'blank',
      publicRoute: true,
      
    }
  },
  {
    path: "/mail-confirmed/:id",
    element: <ConfirmEmail/>,
    meta: {
      layout: "blank",
      publicRoute: true,
      restricted: true
    }
  },
  {
    path: "/reset-password/:token",
    element: <ResetPasswordBasic />,
    meta: {
      layout: "blank",
      publicRoute: true,
      restricted: true
    }
  },
  {
    path: '/pages/register-cover',
    element: <RegisterCover />,
    meta: {
      layout: 'blank'
    }
  },
  {
    path: '/pages/register-multi-steps',
    element: <RegisterMultiSteps />,
    meta: {
      layout: 'blank',

    }
  },

  {
    path: '/forgot-password',
    element: <ForgotPassword />,
    layout: 'BlankLayout',
    meta: {
      layout: 'blank',
      publicRoute: true,
      restricted: true
    }
  },
  {
    path: '/pages/forgot-password-basic',
    element: <ForgotPasswordBasic />,
    meta: {
      layout: 'blank'
    }
  },
  {
    path: '/pages/forgot-password-cover',
    element: <ForgotPasswordCover />,
    meta: {
      layout: 'blank'
    }
  },
  {
    path: "/reset-password-failed",
    element: <InfoPage title="🔐 Can't reset password 🔐" description="This link has beed either expired or already used. Please request another reset link."/>,
    meta: {
      layout: "blank",
      publicRoute: true,
      restricted: true
    }
  },
  {
    path: "/password-changed",
    element: <InfoPage title="🔐 Password changed successfuly 🔐" description="Your password has been saved successfuly. You can now log into your account using your new password"/>,
    meta: {
      layout: "blank",
      publicRoute: true,
      restricted: true
    }
  },
  {
    path: '/pages/reset-password-cover',
    element: <ResetPasswordCover />,
    meta: {
      layout: 'blank'
    }
  },
  {
    path: '/pages/verify-email-basic',
    element: <VerifyEmailBasic />,
    meta: {
      layout: 'blank'
    }
  },
  {
    path: '/pages/verify-email-cover',
    element: <VerifyEmailCover />,
    meta: {
      layout: 'blank',
      publicRoute: true,
    }
  },
  {
    path: '/pages/two-steps-basic',
    element: <TwoStepsBasic />,
    meta: {
      layout: 'blank'
    }
  },
  {
    path: '/pages/two-steps-cover',
    element: <TwoStepsCover />,
    meta: {
      layout: 'blank'
    }
  }
]

export default AuthenticationRoutes
