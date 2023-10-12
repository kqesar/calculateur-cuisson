<template>
  <v-row>
    <v-col>
      <v-text-field v-model.trim="cuisson.name" label="Type de cuisson"
                    variant="underlined"></v-text-field>
    </v-col>
    <v-col>
      <v-text-field v-model.number="cuisson.weight" label="Poids(en kg)"
                    variant="underlined"></v-text-field>
    </v-col>
    <v-col>
      <v-text-field v-model.number="cuisson.duration" label="Durée(en minutes)"
                    variant="underlined"></v-text-field>
    </v-col>
    <v-col>
      <v-btn @click="store.updateCooking(cuisson, props.index)">Modifier cuisson</v-btn>
    </v-col>
    <v-col>
      <v-btn @click="store.deleteCooking(props.index)">Supprimer</v-btn>
    </v-col>
  </v-row>
</template>
<script lang="ts" setup>

import {ICooking} from "@/interfaces";
import {useCookingList} from "@/store";

const store = useCookingList()
const props = defineProps<{
  index: number,
  cuisson: ICooking
}>()

const cuisson = props.cuisson
</script>