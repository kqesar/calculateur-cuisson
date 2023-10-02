<template>
  <v-row>
    <v-col>
      <v-text-field v-model="newCookingType.name" label="Nom nouveau type de cuisson"
                    variant="underlined"></v-text-field>
    </v-col>
    <v-col>
      <v-text-field v-model="newCookingType.weight" label="Poids de la nouvelle cuisson(en kg)"
                    variant="underlined"></v-text-field>
    </v-col>
    <v-col>
      <v-text-field v-model="newCookingType.duration" label="Durée nouvelle cuisson(en minutes)"
                    variant="underlined"></v-text-field>
    </v-col>
    <v-col>
      <v-btn @click="saveCooking">Enregistrer</v-btn>
    </v-col>
  </v-row>
</template>
<script lang="ts" setup>

import {ref} from "vue";
import {ICooking} from "@/interfaces";
import {useCookingList} from "@/store";

const store = useCookingList()

const newCookingType = ref<ICooking>({
  duration: 0,
  weight: 0,
  name: ''
})

const saveCooking = () => {
  store.createCookingType(newCookingType.value)
  newCookingType.value = {
    duration: 0,
    weight: 0,
    name: ''
  }
}
</script>