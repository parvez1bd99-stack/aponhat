// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = { 
    apiKey: "AIzaSyD8xa2qosGeDU_IXfecYxTVO8BlnvM9esU", 
    authDomain: "aponhat.firebaseapp.com", 
    projectId: "aponhat", 
    storageBucket: "aponhat.firebasestorage.app", 
    messagingSenderId: "904413579712", 
    appId: "1:904413579712:web:4a3a4ba2014b0783c0a025" 
};

// অ্যাপ এবং অফলাইন ডাটাবেজ সেটআপ
const app = initializeApp(firebaseConfig);
const db = initializeFirestore(app, {
    localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() })
});
const auth = getAuth(app);

export { app, db, auth };