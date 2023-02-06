<template>
    <div>
        <h1>Trouver des données</h1>
        <button>Faire apparaître les autres utilisateurs</button>
        <ul>
            <li v-for="client in clients" >
                ID : {{ client.id }} // Client : {{ client.data().first_name }} //IMC : {{ client.data().IMC }}
                <button @click="deleteClient(client)">Supprimer de BDD</button>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    emits:["deleteClient"],
    props:["clients"],
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