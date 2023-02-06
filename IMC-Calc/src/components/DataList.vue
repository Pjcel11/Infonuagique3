<template>
    <div>
        <h1>Trouver des données</h1>
        <button style="margin-bottom: 5px;">Faire apparaître les autres utilisateurs</button>
            <data-details :client="client" v-for="client in clients" @saveEdit="saveEdit" @deleteClient="deleteClient">
            </data-details>
    </div>
</template>
<script>
import DataDetails from "./DataDetails.vue";
export default {
    emits:["deleteClient","saveEdit"],
    props:["clients"],
    components:{
        DataDetails
    },
    methods:{
        deleteClient(client){
            console.log("on essaye de supprimer un client");
            this.$emit('deleteClient',client);
        },
        saveEdit(clientCopy){
            console.log("on essaye de sauvegarder modifs sur un client (ici DataList pour App)",clientCopy);
            this.$emit('saveEdit',clientCopy);
        }
    }
};
</script>
<style scoped>
    
</style>