import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAOzTimED4fuS6_FkpH0tbe84_mH4C6Wuw",
    authDomain: "yt-clone-23202.firebaseapp.com",
    projectId: "yt-clone-23202",
    storageBucket: "yt-clone-23202.appspot.com",
    messagingSenderId: "737256947102",
    appId: "1:737256947102:web:fc5e3b2e743ec1ac73ea8f"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;