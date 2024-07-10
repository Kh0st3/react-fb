import { createContext, useState, useEffect } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

export const UserContext = createContext();

const UserProvider = ({ children }) => {

    const [ user, setUser ] = useState (false);

    useEffect (() => {
        const unsuscribe = onAuthStateChanged (auth, user => {
            console.log (user);
            if (user) {
                const { email, photoURL, displayname, uid } = user
                setUser ({ email, photoURL, displayname, uid });
            } else {
                setUser (null);
            }
        })

        return () => unsuscribe();
    }, []);

    const registerUser = ( email, password ) => createUserWithEmailAndPassword (auth, email, password);

    const loginUser = (email, password) => signInWithEmailAndPassword (auth, email, password); 

    const signOutUser = () => signOut(auth);

    return (
        <UserContext.Provider value={{user, setUser, registerUser, loginUser, signOutUser}}>
            {children}
        </UserContext.Provider>
    )
};

export default UserProvider;