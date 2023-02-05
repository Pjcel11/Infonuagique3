<template>
    <div>
        <h1>Calculer votre IMC</h1>
        <form @submit.prevent="calculerIMC(),$event">
            <input type="text" placeholder="prénom" v-model="person.first_name"><br>
            <input type="text" placeholder="nom" v-model="person.last_name"><br>
            <input type="text" placeholder="age" v-model="person.age_client"><br>
            <input type="text" placeholder="poids" v-model="person.poids"><br>
            <input type="text" placeholder="taille(m)" v-model="person.taille"><br>
            <button type="submit">Calculer IMC</button><br>     
        </form>
    </div>
    <br>
    <div>
        <p id="afficher">Votre IMC est de: {{ x }}</p>
    </div>
    <br>
    <div>
        <button @click="sendtoBDD()">Envoyer à la BDD</button>
        <p id="identifiant"> Vous êtes en situation -> {{retour}} </p>
    </div>
</template>

<script>
    import db from '../shared/db.js' ;

    export default {
        name: "DataEntry",
        emits:["created"],
        data() {           

            return {
                person:{
                first_name : '',
                last_name : '',
                age_client : '',
                poids : '',
                taille : '',
                IMC : 0
                }
            }
           
        },
        computed: {
            x(){
                if(this.person.IMC >0){
                    return this.person.IMC
                }else{
                    return "Veuillez remplir le formulaire pour calculer votre IMC"
                }
            },
            retour(){
                if (this.person.IMC > 0){
                    let retour="impossible à déterminer"
                    if (this.person.IMC < 16.5) {  
                        retour = "de Dénutrition."
                    }else if (this.person.IMC >= 16.5 && this.person.IMC<18.5 ){
                        retour = "de Maigreur"
                    }else if (this.person.IMC>=18.5 && this.person.IMC <25){
                        retour = "de poids normal"
                    }
                    else if(this.person.IMC>=25 && this.person.IMC <30){
                        retour = "de surpoids"
                    }
                    else if(this.person.IMC>=30 && this.person.IMC <35){
                        retour = "d'obésité modéré"
                    }
                    else if(this.person.IMC>=35 && this.person.IMC <40){
                        retour = "d'obésité sévère"
                    }
                    else if(this.person.IMC>=40){
                        retour = "d'obésité morbide"
                    }else{
                        retour = "impossible à déterminer vous avez du entrer une mauvaise valeur"
                    }
                    return retour
                }
                else{
                    return "Veuillez remplir le formulaire pour calculer votre IMC et connaître votre état"
                }
            }
        },
        methods: {
            calculerIMC(){
                console.log('calculerIMC')
                
                let IMC_c = this.person.poids / (this.person.taille * this.person.taille)
                this.person.IMC=IMC_c;
                console.log(this.person);
                /*
                db.create(this.person)
                .then((data) => {
                    console.log(data)
                })
                .catch((error) => {
                    console.error(error)
                });
                */
            },
            sendtoBDD() {
                console.log('sendtoBDD');
                console.log(this.person);

                db.create(this.person)
                .then((data) => {
                    console.log(data);
                    this.$emit('created');
                    this.resetForm();
                })
                .catch((error) => {
                    console.error(error)
                });
                
                
            },
            resetForm(){
                this.person.first_name = '';
                this.person.last_name = '';
                this.person.age_client = '';
                this.person.poids = '';
                this.person.taille = '';
                this.person.IMC = 0;
            }
        },
    };

</script>

<style scoped>
    
</style>