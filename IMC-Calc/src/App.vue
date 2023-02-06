<template>
  <div id="app">
  <DataEntry @created="getAllClients"/>
  <br/>
  <DataList :clients="clients" @saveEdit="saveEdit" @deleteClient="deleteC"/>
  </div>
</template>

<script>
import DataEntry from './components/DataEntry.vue';
import DataList from './components/DataList.vue';
import db from './shared/db.js' ;

export default {
  data(){
    return{
      clients: []
    }
  },
  created(){
        console.log("DataList created")
        this.getAllClients();
  },
  methods: {
    getAllClients(){
      console.log('on lance getAllClients');
      db.read()
      .then((datasquery) =>{
          console.log('On essaye de mettre dans clients');
          this.clients=datasquery.docs;
          console.log('On a mis dans clients');
          datasquery.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
          })
          console.log('on a fini de lire la bdd');
        });
            /*
            .then(console.log('on a fini de lire la bdd'))
            */
      },
      deleteC(client){
        console.log("Tentative de suppression en cours");
        db.delete(client.id).then(() => {
          console.log("Suppression réussie");
          this.getAllClients();
        })
        .catch(error => {
          console.error(error);
        })
      },
      saveEdit(clientCopy){
        console.log("Tentative de sauvegarde des modifications en cours (Ici App appel à db.js)");
        db.updateC(clientCopy).then(() => {
          console.log("Sauvegarde réussie");
          this.getAllClients();
        })
        .catch(error => {
          console.error(error);
        })
      }
  },
  name: 'App',
  components: {
    DataEntry,
    DataList
  }
}
</script>

<style scoped>
</style>
