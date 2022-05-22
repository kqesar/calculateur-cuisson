<template>
    <v-app>
        <v-app-bar
            app
            color="primary"
            dark
        >
            <div class="d-flex align-center">
                <span class="ml-3">Calculateur cuisine</span>
            </div>
        </v-app-bar>
        <v-main>
            <calculator/>
        </v-main>
    </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Calculator from "@/views/Calculator.vue";

@Component({
    components: {Calculator}
})
export default class App extends Vue {
}
</script>
