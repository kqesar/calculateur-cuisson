<template>
    <v-app>
        <v-app-bar
            app
            color="blue"
            dark
        >
            <div class="d-flex align-center">
                <span class="ml-3">Calculateur cuisine</span>
            </div>
        </v-app-bar>
        <v-main>
            <slot />
        </v-main>
    </v-app>
</template>
<script setup>
</script>
