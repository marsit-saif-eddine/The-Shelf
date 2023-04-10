// ** Auth Endpoints
export default {
  loginEndpoint: '/user/signIn',
  registerEndpoint: '/signUp/register',
  refreshEndpoint: '/user/refreshToken',
  logoutEndpoint: '/user/signOut',
  sendForgotPasswordLink:'/signUp/sendForgotPasswordLink',
  resetPasswordValidation:'/signUp/resetPasswordValidation',
  resetPassword:'/signUp/resetPassword',
  inviteAdmin:'/signUp/inviteAdmin',
  adminSignUp:'/signUp/adminSignUp',
  getPreInscription:'/signUp/getPreInscription',



  // ** This will be prefixed in authorization header with token
  // ? e.g. Authorization: Bearer <token>
  tokenType: 'Bearer',

  // ** Value of this property will be used as key to store JWT token in storage
  storageTokenKeyName: 'accessToken',
  storageRefreshTokenKeyName: 'refreshToken'
}
