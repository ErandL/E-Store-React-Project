import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyDgGWIVf7wIRCvClFwL--UbD_pEipnSc5U",
    authDomain: "e-store-e2894.firebaseapp.com",
    databaseURL: "https://e-store-e2894-default-rtdb.firebaseio.com",
    projectId: "e-store-e2894",
    storageBucket: "e-store-e2894.firebasestorage.app",
    messagingSenderId: "177719657502",
    appId: "1:177719657502:web:47975fdeeff9a0049d9a0f",
    measurementId: "G-CZ41W2LH5R"
};

const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);