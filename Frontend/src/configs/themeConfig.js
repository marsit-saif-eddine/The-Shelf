// You can customize the template with the help of this file

//Template config options
const themeConfig = {
  app: {
    appName: 'THE SHELF',
    appLogoImage: require('@src/assets/images/logo/logo.svg').default
  },
  layout: {
    isRTL: false,
    skin: 'light', // light, dark, bordered, semi-dark
    type: 'vertical', // vertical, horizontal
    contentWidth: 'boxed', // full, boxed
    menu: {
      isHidden: false,
      isCollapsed: false
    },
    navbar: {
      // ? For horizontal menu, navbar type will work for navMenu type
      type: 'floating', // static , sticky , floating, hidden
      backgroundColor: 'white' // BS color options [primary, success, etc]
    },
    footer: {
      type: 'hidden' // static, sticky, hidden
    },
    customizer: false,
    scrollTop: false, // Enable scroll to top button
    toastPosition: 'bottom-right' // top-left, top-center, top-right, bottom-left, bottom-center, bottom-right
  }
}

export default themeConfig
