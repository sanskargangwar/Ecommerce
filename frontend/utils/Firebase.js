import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "aipoweredecommerce.firebaseapp.com",
  projectId: "aipoweredecommerce",
  storageBucket: "aipoweredecommerce.firebasestorage.app",
  messagingSenderId: "330891062438",
  appId: "1:330891062438:web:78eefe0defb38020909867"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()


export {auth , provider}

