/** @jsx jsx */
import { jsx, ThemeProvider } from 'theme-ui'
import theme from './theme'
import components from './components'

export default props => (
  <ThemeProvider theme={theme} components={components}>
    {props.children}
  </ThemeProvider>
)