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
                    <v-btn @click="resetCookingList()">Remise à zero liste cuisson</v-btn>
                </v-col>
            </v-row>
            <v-row class="mb-3">
                <v-col>
                    <h4>Paramétrage type de viande</h4>
                    <v-row v-for="(cuisson, index) in cookingList" :key="index">
                        <v-col>
                            <v-text-field variant="underlined" v-model.trim="cuisson.name"
                                label="Type de cuisson"></v-text-field>
                        </v-col>
                        <v-col>
                            <v-text-field variant="underlined" v-model.number="cuisson.weight"
                                label="Poids(en kg)"></v-text-field>
                        </v-col>
                        <v-col>
                            <v-text-field variant="underlined" v-model.number="cuisson.duration"
                                label="Durée(en minutes)"></v-text-field>
                        </v-col>
                        <v-col>
                            <v-btn @click="updateCooking">Modifier cuisson</v-btn>
                        </v-col>
                        <v-col>
                            <v-btn @click="deleteCooking(index)">Supprimer</v-btn>
                        </v-col>
                    </v-row>
                    <v-row class="mt-3">
                        <v-col>
                            <h4>Ajout nouvelle cuisson</h4>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-text-field variant="outlined" v-model="newCookingType.name"
                                label="Nom nouveau type de cuisson"></v-text-field>
                        </v-col>
                        <v-col>
                            <v-text-field variant="outlined" v-model="newCookingType.weight"
                                label="Poids de la nouvelle cuisson(en kg)"></v-text-field>
                        </v-col>
                        <v-col>
                            <v-text-field variant="outlined" v-model="newCookingType.duration"
                                label="Durée nouvelle cuisson(en minutes)"></v-text-field>
                        </v-col>
                        <v-col>
                            <v-btn @click="saveCooking">Enregistrer</v-btn>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
            <v-row class="mt-3">
                <v-col>
                    <h4>Calcul de la cuisson</h4>
                    <v-select variant="underlined" v-model="cookingType" :items="cookingTypeList"
                        label="Sélectionner type de viande"></v-select>
                    <v-text-field variant="underlined" v-if="cookingType" v-model="cookingWeight"
                        label="Poids de la viande"></v-text-field>
                    <span v-if="cookingType && cookingWeight">{{ displayCookingDuration }}</span>
                </v-col>
            </v-row>
        </v-form>
    </v-container>
</template>

<script lang="ts" setup>
import { Cooking } from '../interfaces'
import { computed, ref, watch } from 'vue'

const newCookingType = ref<Cooking>({
    duration: 0,
    weight: 0,
    name: ''
})
const cookingType = ref('')
const cookingWeight = ref(0)
const cookingDuration = ref(0)
const cookingTypeList = ref<string[]>([])
const cookingList = ref<Cooking[]>([])

const displayCookingDuration = computed<string>(() => {
    const heure = Math.floor(cookingDuration.value / 60)
    const minutes = Math.floor(cookingDuration.value - (heure * 60))
    return `${heure} h ${minutes} (${Math.floor(cookingDuration.value)} minutes)`
})

const initializeForm = () => {
    let cuissons: Cooking[]
    if (!localStorage.getItem('cuissons')) {
        cuissons = [
            {
                // Duration in minutes
                duration: 50,
                // Weight in kilo
                weight: 1,
                name: 'Poulet'
            },
            {
                // Duration in minutes
                duration: 60,
                // Weight in kilo
                weight: 1,
                name: 'Porc'
            }
        ]
        localStorage.setItem('cuissons', JSON.stringify(cuissons))
    } else {
        cuissons = JSON.parse(localStorage.getItem('cuissons') || '')
    }

    cookingList.value = cuissons

    cookingTypeList.value = []
    cookingList.value.forEach(cuisson => {
        cookingTypeList.value.push(cuisson.name)
    })
}

const updateCooking = () => {
    localStorage.setItem('cuissons', JSON.stringify(cookingList.value))
    initializeForm()
}

const deleteCooking = (index: number) => {
    cookingList.value.splice(index)
    localStorage.setItem('cuissons', JSON.stringify(cookingList.value))
    initializeForm()
}

const saveCooking = () => {
    cookingTypeList.value.push(newCookingType.value.name)
    cookingList.value.push(newCookingType.value)
    localStorage.setItem('cuissons', JSON.stringify(cookingList.value))
    newCookingType.value = {
        duration: 0,
        weight: 0,
        name: ''
    }
}

const resetCookingList = () => {
    const cuissons: Cooking[] = [
        {
            // Duration in minutes
            duration: 50,
            // Weight in kilo
            weight: 1,
            name: 'Poulet'
        },
        {
            // Duration in minutes
            duration: 60,
            // Weight in kilo
            weight: 1,
            name: 'Porc'
        }
    ]
    localStorage.setItem('cuissons', JSON.stringify(cuissons))
    initializeForm()
}

watch(cookingType, () => {
    cookingWeight.value = 0
})

watch(cookingWeight, () => {
    const cuisson = cookingList.value.find(cuisson => {
        return cuisson.name === cookingType.value
    })
    if (cuisson) {
        const poidsCuisson = parseFloat(cookingWeight.value.toString().replace(",", "."))
        cookingDuration.value = (poidsCuisson * cuisson.duration) / cuisson.weight
    }
})

initializeForm()
</script>
