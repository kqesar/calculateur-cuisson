<template>
    <v-container>
        <v-form>
            <v-row>
                <v-col>
                    <h2 class="text-center">Calculateur cuisson</h2>
                </v-col>
            </v-row>
            <v-row class="mb-3">
                <v-col>
                    <h4>Paramétrage type de viande</h4>
                    <v-row v-for="(type, index) in listTypeCuisson" :key="index">
                        <v-col>
                            <v-text-field readonly v-model="listTypeCuisson[index]" label="Type de cuisson"></v-text-field>
                        </v-col>
                        <v-col>
                            <v-text-field v-model="cuissons[type].weight" label="Poids"></v-text-field>
                        </v-col>
                        <v-col>
                            <v-text-field v-model="cuissons[type].duration" label="Durée"></v-text-field>
                        </v-col>
                        <v-col>
                            <v-btn @click="updateCuisson()">Modifier cuisson</v-btn>
                        </v-col>
                    </v-row>
                    <v-row class="mt-3">
                        <v-col>
                            <h4>Ajout nouvelle cuisson</h4>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col>
                            <v-text-field v-model="newTypeCuissonName" label="Nom nouveau type de cuisson"></v-text-field>
                        </v-col>
                        <v-col>
                            <v-text-field v-model="newTypeCuisson.weight" label="Poids nouvelle cuisson"></v-text-field>
                        </v-col>
                        <v-col>
                            <v-text-field v-model="newTypeCuisson.duration" label="Durée nouvelle cuisson"></v-text-field>
                        </v-col>
                        <v-col>
                            <v-btn @click="saveCuisson()">Enregistrer nouvelle cuisson</v-btn>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
            <v-row class="mb-3">
                <v-col>
                    <h4>Choix type de mesure</h4>
                    <v-select v-model="typeMesureDuration" label="Type durée" :items="listTypeMesureDuration"></v-select>
                    <v-select v-model="typeMesureWeight" label="Type poids" :items="listTypeMesureWeight"></v-select>
                </v-col>
            </v-row>
            <v-row class="mt-3">
                <v-col>
                    <h4>Calcul de la cuisson</h4>
                    <v-select v-model="typeCuisson" label="Sélectionner type de viande" :items="listTypeCuisson"></v-select>
                    <v-text-field v-if="typeCuisson" v-model="poidsCuisson" label="Poids de la viande" @change="changePoidsCuisson"></v-text-field>
                    <v-text-field readonly v-if="typeCuisson" v-model="dureeCuisson" label="Durée de cuisson"></v-text-field>
                </v-col>
            </v-row>
        </v-form>
    </v-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Cuisson, Cuissons } from '@/interfaces'

@Component({})
export default class Home extends Vue {
    newTypeCuisson: Cuisson = {}
    newTypeCuissonName = ''
    typeCuisson = ''
    poidsCuisson = 0
    dureeCuisson: any = 0
    typeMesureDuration = 'minutes'
    typeMesureWeight = 'kilos'
    listTypeCuisson: string[] = []
    cuissons: Cuissons = {}

    listTypeMesureDuration = ['minutes', 'heures']
    listTypeMesureWeight = ['kilos', 'grammes']

    initializeForm (): void {
        let cuissons = {}
        if (!localStorage.getItem('cuissons')) {
            cuissons = {
                poulet: {
                    // Duration in minutes
                    duration: 50,
                    // Weight in kilo
                    weight: 1
                },
                porc: {
                    // Duration in minutes
                    duration: 60,
                    // Weight in kilo
                    weight: 1
                }
            }
            localStorage.setItem('cuissons', JSON.stringify(cuissons))
        } else {
            cuissons = JSON.parse(localStorage.getItem('cuissons') || '')
        }

        this.cuissons = cuissons

        Object.keys(this.cuissons).forEach(typeCuisson => {
            this.listTypeCuisson.push(typeCuisson)
        })
    }

    changePoidsCuisson (): void {
        this.dureeCuisson = (this.poidsCuisson * this.cuissons[this.typeCuisson].duration) / this.cuissons[this.typeCuisson].weight
    }

    updateCuisson (): void {
        localStorage.setItem('cuissons', JSON.stringify(this.cuissons))
    }

    saveCuisson (): void {
        this.listTypeCuisson.push(this.newTypeCuissonName)
        this.cuissons[this.newTypeCuissonName] = this.newTypeCuisson
        localStorage.setItem('cuissons', JSON.stringify(this.cuissons))
        this.newTypeCuissonName = ''
        this.newTypeCuisson = {}
    }

    @Watch('typeMesureWeight')
    onTypeMesureWeight (value: string): void {
        if (this.poidsCuisson) {
            if (value === 'kilos') {
                this.poidsCuisson /= 1000
            } else {
                this.poidsCuisson *= 1000
            }
        }
    }

    @Watch('typeMesureDuration')
    onTypeMesureDuration (value: string): void {
        if (value === 'minutes') {
            const durationSplitted = this.dureeCuisson.toString().split('h')
            this.dureeCuisson = parseInt(durationSplitted[0]) * 60 + parseInt(durationSplitted[1])
        } else {
            const heure = Math.floor(this.dureeCuisson / 60)
            const minutes = Math.floor(this.dureeCuisson - (heure * 60))
            this.dureeCuisson = heure.toString() + 'h' + minutes.toString()
        }
    }

    mounted (): void {
        this.initializeForm()
    }
}
</script>
