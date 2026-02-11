import 'vuetify/styles'
import { createVuetify } from 'vuetify'

export default createVuetify({
  theme: {
    defaultTheme: 'ordonexDark',
    themes: {
      ordonexDark: {
        dark: true,
        colors: {
          background: '#191919',
          surface: '#1F1F1F',
          primary: '#CC0000',
          secondary: '#5B2CF1',
          success: '#22C55E',
          warning: '#F59E0B',
          error: '#EF4444',
        },
      },
    },
  },
})
