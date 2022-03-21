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
                            <v-text-field v-model.trim="cuisson.name" label="Type de cuisson"></v-text-field>
                        </v-col>
                        <v-col>
                            <v-text-field v-model.number="cuisson.weight" label="Poids(en kg)"></v-text-field>
                        </v-col>
                        <v-col>
                            <v-text-field v-model.number="cuisson.duration" label="Durée(en minutes)"></v-text-field>
                        </v-col>
                        <v-col>
                            <v-btn @click="updateCooking()">Modifier cuisson</v-btn>
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
                            <v-text-field v-model="newCookingType.name"
                                          label="Nom nouveau type de cuisson"></v-text-field>
                        </v-col>
                        <v-col>
                            <v-text-field v-model="newCookingType.weight"
                                          label="Poids de la nouvelle cuisson(en kg)"></v-text-field>
                        </v-col>
                        <v-col>
                            <v-text-field v-model="newCookingType.duration"
                                          label="Durée nouvelle cuisson(en minutes)"></v-text-field>
                        </v-col>
                        <v-col>
                            <v-btn @click="saveCooking()">Enregistrer</v-btn>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
            <v-row class="mt-3">
                <v-col>
                    <h4>Calcul de la cuisson</h4>
                    <v-select v-model="cookingType" :items="cookingTypeList" label="Sélectionner type de viande"></v-select>
                    <v-text-field v-if="cookingType" v-model="cookingWeight" label="Poids de la viande"></v-text-field>
                    <span v-if="cookingType && cookingWeight">{{ displayCookingDuration }}</span>
                </v-col>
            </v-row>
        </v-form>
    </v-container>
</template>

<script lang="ts">
import {Component, Vue, Watch} from 'vue-property-decorator'
import {Cooking} from '@/interfaces'

@Component({})
export default class Home extends Vue {
    newCookingType: Cooking = {
        duration: 0,
        weight: 0,
        name: ''
    }
    cookingType = ''
    cookingWeight = 0
    cookingDuration = 0
    cookingTypeList: string[] = []
    cookingList: Cooking[] = []

    get displayCookingDuration(): string {
        const heure = Math.floor(this.cookingDuration / 60)
        const minutes = Math.floor(this.cookingDuration - (heure * 60))
        return `${heure} h ${minutes} (${Math.floor(this.cookingDuration)} minutes)`
    }

    initializeForm(): void {
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

        this.cookingList = cuissons

        this.cookingTypeList = []
        this.cookingList.forEach(cuisson => {
            this.cookingTypeList.push(cuisson.name)
        })
    }

    updateCooking(): void {
        localStorage.setItem('cuissons', JSON.stringify(this.cookingList))
        this.initializeForm()
    }

    deleteCooking(index: number): void {
        this.cookingList.splice(index)
        localStorage.setItem('cuissons', JSON.stringify(this.cookingList))
        this.initializeForm()
    }

    saveCooking(): void {
        this.cookingTypeList.push(this.newCookingType.name)
        this.cookingList.push(this.newCookingType)
        localStorage.setItem('cuissons', JSON.stringify(this.cookingList))
        this.newCookingType = {
            duration: 0,
            weight: 0,
            name: ''
        }
    }

    resetCookingList(): void {
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
        this.initializeForm()
    }

    @Watch('cookingType')
    onChangeTypeCuisson(): void {
        this.cookingWeight = 0
    }

    @Watch('cookingWeight')
    onChangePoidsCuisson(): void {
        const cuisson = this.cookingList.find(cuisson => {
            return cuisson.name === this.cookingType
        })
        if (cuisson) {
            this.cookingDuration = (this.cookingWeight * cuisson.duration) / cuisson.weight
        }
    }

    created(): void {
        this.initializeForm()
    }
}
</script>
