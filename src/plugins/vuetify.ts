import Vue from 'vue'
import Vuetify, {
    VTextField, VContainer, VForm, VAppBar, VSelect, VBtn, VRow, VCol, VMain, VApp
} from 'vuetify/lib'

Vue.use(Vuetify,
    {
        components: {
            VTextField,
            VContainer,
            VForm,
            VAppBar,
            VSelect,
            VBtn,
            VRow,
            VApp,
            VMain,
            VCol
        }
    })

export default new Vuetify({
})
