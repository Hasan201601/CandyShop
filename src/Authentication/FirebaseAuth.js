import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import initializeApplication from "./firebase/firebase.init";


initializeApplication()
const Firebase = () => {
    const auth = getAuth();

    const userCreateAccount = (email, password, name, location, navigate) => {
        console.log(email, password);
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user)

                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
        const destination = location?.state?.from || "/";
        navigate(destination)
    }
    const userLogin = (email, password, location, navigate) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user);
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
        const destination = location?.state?.from || "/";
        navigate(destination)
    }
    return { userCreateAccount, userLogin }
}
export default Firebase;