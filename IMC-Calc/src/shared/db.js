import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getFirestore, addDoc, collection,getDocs, doc ,deleteDoc } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js"
import config from "./privatetoken";

const firebaseApp = initializeApp (config)
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(firebaseApp);

export default {
    create: async function (person) {
      console.log('sending !')
      try {
          const docRef = await addDoc(collection(db, "DONNEES_IMC"), person);
          console.log("Document written with ID: ", docRef.id);
          return docRef;
        } catch (e) {
          console.error("Error adding document: ", e);
        }
        
      
    },
    read: async function () {
    console.log('reading !');
    const querySnapshot = await getDocs(collection(db, "DONNEES_IMC"));
    console.log(querySnapshot);
    console.log('transfer of data is good !');
    querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
    });
    
    return querySnapshot; //permet d'aller chercher une collection complète
    },
    delete: async function (id){
      console.log('deleting !');//permet de supprimer un document
      return await deleteDoc(doc(db, "DONNEES_IMC", id));
    }
}