import App from './App.svelte'
import 'bulma/bulma.sass'

const app = new App({
  target: document.body,
  props: {
    project_name: 'Svelte'
  },

})

export default app
