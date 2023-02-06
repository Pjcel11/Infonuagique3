<template lang="">
    <div>
        <div v-if="!isInEditMode" class="card" style="width: 18rem;margin-bottom: 10px;">
            <div class="card-body">
                <h5 class="card-title">{{client.data().first_name }} {{client.data().last_name }} ({{client .data().age_client}} ans)</h5>
                <h6 class="card-subtitle mb-2 text-muted"> IMC : {{ client.data().IMC }}</h6>
                <p class="card-text">Id : {{client.id}}</p>
                <button class="btn btn-sm btn-warning" @click="editClient">Modifier</button>
                <button class="btn btn-sm btn-danger" @click="$emit('deleteClient',client)">Supprimer de BDD</button>
            </div>
        </div>
    
        <div v-if="isInEditMode" class="card" style="width: 18rem;margin-bottom: 10px;">
            <div class="card-body">
                <input type="text" placeholder="prénom" v-model="clientCopy.first_name"><br>
                <input type="text" placeholder="nom" v-model="clientCopy.last_name"><br>
                <input type="text" placeholder="age" v-model="clientCopy.age_client"><br>
                <input type="text" placeholder="poids" v-model="clientCopy.poids"><br>
                <input type="text" placeholder="taille(m)" v-model="clientCopy.taille"><br>

                <h5 class="card-title">{{client.data().first_name }} {{client.data().last_name }} ({{client .data().age_client}} ans)</h5>
                <h6 class="card-subtitle mb-2 text-muted"> IMC : {{ client.data().IMC }}</h6>
                <p class="card-text">Id : {{client.id}}</p>
                <button
                    class="btn btn-sm btn-success"
                    @click="saveEdit">
                    Confirmer
                </button>
                <button
                    class="btn btn-sm btn-warning"
                    @click="cancelEdit">
                    Annuler
                </button>
            </div>
        </div>            
    </div>
</template>
<script>
// CREER FONCTION ACTUALISER IMC et une fonction afficher infos complémentaires dans la card !!!!
export default {
    data(){
        
        return {
            clientCopy: {},
            isInEditMode: false
        }
    },
    emits:["deleteClient","editClient","saveEdit"],
    props:['client'],
    methods:{
        editClient(){
            const {
                first_name,
                last_name,
                age_client,
                poids,
                taille,
                IMC
            } = this.client.data();
            
            let IMC_c = this.client.data().poids / (this.client.data().taille * this.client.data().taille);
            
            this.clientCopy = {
                id: this.client.id,
                first_name,
                last_name,
                age_client,
                poids,
                taille,
                IMC: IMC_c
            }
            this.isInEditMode = true;
            console.log(this.clientCopy,this.isInEditMode);
        },
        saveEdit(){
            this.$emit('saveEdit',this.clientCopy);
            console.log("on essaye de sauvegarder modifs sur un client (ici DataDetails pour DataList)");
            this.isInEditMode = false;
        },
        cancelEdit(){
            this.isInEditMode = false;
        },

    }
    
}

</script>
<style >
button{
    margin-right: 5px;
}
</style>