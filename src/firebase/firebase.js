import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDesksyvy7K7IvRlQWV53euq9lPHkoOnmI",
  authDomain: "todo-app-460e1.firebaseapp.com",
  projectId: "todo-app-460e1",
  storageBucket: "todo-app-460e1.appspot.com",
  messagingSenderId: "208814766520",
  appId: "1:208814766520:web:465d11b242857d2513374d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
