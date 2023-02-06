<template>
    <div>
        <h1>Trouver des données</h1>
        <button style="margin-bottom: 5px;">Faire apparaître les autres utilisateurs</button>
        <ul>
            <data-details :client="client" v-for="client in clients">
            </data-details>
        </ul>
    </div>
</template>
<script>
import DataDetails from "./DataDetails.vue";
export default {
    emits:["deleteClient"],
    props:["clients"],
    components:{
        DataDetails
    },
    methods:{
        deleteClient(client){
            console.log("on essaye de supprimer un client");
            this.$emit('deleteClient',client);
        }
    }
};
</script>
<style scoped>
    
</style>