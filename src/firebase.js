import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDDWFiOFAcP-FycqaHbRPHFhHmoq-7WcqE",
  authDomain: "react-2022-e600a.firebaseapp.com",
  projectId: "react-2022-e600a",
  storageBucket: "react-2022-e600a.appspot.com",
  messagingSenderId: "198197421410",
  appId: "1:198197421410:web:33e32d65980fdb41e3b83b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)

export { auth, db };