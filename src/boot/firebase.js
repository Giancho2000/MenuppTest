import { initializeApp } from 'firebase/app';
import 'firebase/auth'
import 'firebase/firestore'
import { getStorage, ref } from "firebase/storage";

// Agregar configuración firebase:
var firebaseConfig = ({
    apiKey: "AIzaSyAU5gCzMDm_VvZC7HLSbHkpMwv7LgrdFL0",
    authDomain: "menupptest.firebaseapp.com",
    projectId: "menupptest",
    storageBucket: "menupptest.appspot.com",
    messagingSenderId: "1030425647128",
    appId: "1:1030425647128:web:865efbcff8332dada80b6d"
})

let app = initializeApp(firebaseConfig);
const storage = getStorage();
const storageRef = ref(storage);

const auth = firebase.auth()
const db = firebase.firestore()

export default{ app, storageRef, storage, auth, db}