import {createApp} from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import {createPinia} from "pinia";

const pinia = createPinia()

createApp(App).use(vuetify).use(pinia).mount("#app")
