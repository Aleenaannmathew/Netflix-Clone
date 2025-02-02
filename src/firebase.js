import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyC6XW1cyl4KiLDIqC8ZUbcwpoCTE603pag",
  authDomain: "netflix-clone-16c5d.firebaseapp.com",
  projectId: "netflix-clone-16c5d",
  storageBucket: "netflix-clone-16c5d.firebasestorage.app",
  messagingSenderId: "365981364304",
  appId: "1:365981364304:web:84951b547d541d3fc36155"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password)=>{
    try {
       const res = await createUserWithEmailAndPassword(auth, email, password);
       const user = res.user;
       await addDoc(collection(db, "user"), {
        uid: user.uid,
        name,
        authProvider: "local",
        email,
       })
    } catch(error) {
        console.log(error)
        toast.error(error.code.split('/')[1].split('-').join(' '))
    }
}

const login = async (email, password)=>{
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(' '))
    }
}

const logout = ()=>{
    signOut(auth);
}

export {auth, db, login, signup, logout};