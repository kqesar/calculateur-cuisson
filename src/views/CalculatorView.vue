<template>
  <v-container>
    <v-form>
      <v-row>
        <v-col>
          <h2 class="text-center">Calculateur cuisson</h2>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-btn @click="store.resetCookingList()">Remise à zero liste cuisson</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <h4>Paramétrage type de viande</h4>
          <CookingConfiguration v-for="(cuisson, index) in cookingList" :key="index" :cuisson="cuisson" :index="index"/>
          <h4 class="mb-3 mt-3 ">Ajout nouvelle cuisson</h4>
          <NewCookingConfiguration/>
        </v-col>
      </v-row>
      <h4 class="mt-3 mb-3">Calcul de la cuisson</h4>
      <CookingCalculation :cooking-list="cookingList" :cooking-type-list="cookingTypeList"/>
    </v-form>
  </v-container>
</template>

<script lang="ts" setup>
import {computed} from 'vue'
import NewCookingConfiguration from "@/CookingCalculator/NewCookingConfiguration.vue";
import CookingCalculation from "@/CookingCalculator/CookingCalculation.vue";
import {useCookingList} from "@/store";
import CookingConfiguration from "@/CookingCalculator/CookingConfiguration.vue";

const store = useCookingList()

const cookingList = computed(() => store.cookingList)
const cookingTypeList = computed(() => store.cookingTypeList)

store.getCuissonList()

</script>
