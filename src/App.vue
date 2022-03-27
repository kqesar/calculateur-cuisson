<template>
    <v-app>
        <v-app-bar
            app
            color="primary"
            dark
        >
            <div class="d-flex align-center">
                <font-awesome-icon icon="cookie"></font-awesome-icon>
                <span class="ml-3">Calculateur cuisine</span>
            </div>
        </v-app-bar>
        <v-main>
            <home/>
        </v-main>
    </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Home from "@/views/Home.vue";

@Component({
    components: {Home}
})
export default class App extends Vue {
}
</script>
