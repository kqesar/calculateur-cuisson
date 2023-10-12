<template>
  <v-row>
    <v-col>
      <v-select v-model="cookingType" :items="cookingTypeList" label="Sélectionner type de viande"
                variant="underlined"></v-select>
      <v-text-field v-if="cookingType" v-model="cookingWeight" label="Poids de la viande"
                    variant="underlined"></v-text-field>
      <span v-if="cookingType && cookingWeight">{{ displayCookingDuration }}</span>
    </v-col>
  </v-row>
</template>
<script lang="ts" setup>
import {computed, ref, watch} from "vue";
import {ICooking} from "@/interfaces";
import {useCookingList} from "@/store";

const cookingType = ref('')
const cookingWeight = ref(0)
const cookingDuration = ref(0)

const store = useCookingList()

const cookingList = computed(() => store.cookingList)
const cookingTypeList = computed(() => store.cookingTypeList)

const displayCookingDuration = computed<string>(() => {
  const heure = Math.floor(cookingDuration.value / 60)
  const minutes = Math.floor(cookingDuration.value - (heure * 60))
  return `${heure} h ${minutes} (${Math.floor(cookingDuration.value)} minutes)`
})

watch(cookingWeight, () => {
  const cuisson = cookingList.value.find((cuisson: ICooking) => {
    return cuisson.name === cookingType.value
  })
  if (cuisson) {
    const poidsCuisson = parseFloat(cookingWeight.value.toString().replace(",", "."))
    cookingDuration.value = (poidsCuisson * cuisson.duration) / cuisson.weight
  }
})

watch(cookingType, () => {
  cookingWeight.value = 0
})

</script>