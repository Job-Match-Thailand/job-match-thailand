/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import colors from 'vuetify/util/colors'

// Composables
import { createVuetify } from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    primary: colors.amber,
    secondary: colors.grey.darken3,
    accent: colors.lightBlue.accent1,
    error: colors.red.base,
    info: colors.blue.base,
    success: colors.green.base,
    warning: colors.yellow.base,
  },
  iconfont: 'mdi',
  options: {
    customProperties: true,
  },
})
