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
                    <v-btn @click="resetListCuisson()">Remise à zero liste cuisson</v-btn>
                </v-col>
            </v-row>
            <v-row class="mb-3">
                <v-col>
                    <h4>Paramétrage type de viande</h4>
                    <v-row v-for="(cuisson, index) in listCuissons" :key="index">
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
                            <v-btn @click="updateCuisson()">Modifier cuisson</v-btn>
                        </v-col>
                        <v-col>
                            <v-btn @click="deleteCuisson(index)">Supprimer</v-btn>
                        </v-col>
                    </v-row>
                    <v-row class="mt-3">
                        <v-col>
                            <h4>Ajout nouvelle cuisson</h4>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-text-field v-model="newTypeCuisson.name" label="Nom nouveau type de cuisson"></v-text-field>
                        </v-col>
                        <v-col>
                            <v-text-field v-model="newTypeCuisson.weight" label="Poids de la nouvelle cuisson(en kg)"></v-text-field>
                        </v-col>
                        <v-col>
                            <v-text-field v-model="newTypeCuisson.duration" label="Durée nouvelle cuisson(en minutes)"></v-text-field>
                        </v-col>
                        <v-col>
                            <v-btn @click="saveCuisson()">Enregistrer</v-btn>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
            <v-row class="mt-3">
                <v-col>
                    <h4>Calcul de la cuisson</h4>
                    <v-select v-model="typeCuisson" label="Sélectionner type de viande" :items="listTypeCuisson"></v-select>
                    <v-text-field v-if="typeCuisson" v-model="poidsCuisson" label="Poids de la viande" @change="changePoidsCuisson"></v-text-field>
                    <span v-if="typeCuisson && poidsCuisson">{{displayDureeCuisson}}</span>
                </v-col>
            </v-row>
        </v-form>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Cuisson } from '@/interfaces'

@Component({})
export default class Home extends Vue {
    newTypeCuisson: Cuisson = {
        duration: 0,
        weight: 0,
        name: ''
    }

    newTypeCuissonName = ''
    typeCuisson = ''
    poidsCuisson = 0
    dureeCuisson = 0
    listTypeCuisson: string[] = []
    listCuissons: Cuisson[] = []

    get displayDureeCuisson(): string {
        const heure = Math.floor(this.dureeCuisson / 60)
        const minutes = Math.floor(this.dureeCuisson - (heure * 60))
        return `${heure} h ${minutes}(${this.dureeCuisson} minutes)`
    }

    initializeForm(): void {
        let cuissons: Cuisson[]
        if(!localStorage.getItem('cuissons')) {
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

        this.listCuissons = cuissons

        this.listCuissons.forEach(cuisson => {
            this.listTypeCuisson.push(cuisson.name)
        })
    }

    changePoidsCuisson(): void {
        const cuisson = this.listCuissons.find(cuisson => {
            return cuisson.name === this.typeCuisson
        })
        if(cuisson) {
            this.dureeCuisson = (this.poidsCuisson * cuisson.duration) / cuisson.weight
        }
    }

    updateCuisson(): void {
        localStorage.setItem('cuissons', JSON.stringify(this.listCuissons))
    }

    deleteCuisson(index: number): void {
        this.listCuissons.splice(index)
        localStorage.setItem('cuissons', JSON.stringify(this.listCuissons))
        this.initializeForm()
    }

    saveCuisson(): void {
        this.listTypeCuisson.push(this.newTypeCuisson.name)
        this.listCuissons.push(this.newTypeCuisson)
        localStorage.setItem('cuissons', JSON.stringify(this.listCuissons))
        this.newTypeCuisson = {
            duration: 0,
            weight: 0,
            name: ''
        }
    }

    resetListCuisson(): void {
        const cuissons : Cuisson[] = [
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

    created(): void {
        this.initializeForm()
    }
}
</script>
