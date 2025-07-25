// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "onlynotes-9fc95.firebaseapp.com",
  projectId: "onlynotes-9fc95",
  storageBucket: "onlynotes-9fc95.firebasestorage.app",
  messagingSenderId: "290162459845",
  appId: "1:290162459845:web:72a1f6c8f08fe72e9d9cac",
  measurementId: "G-S1VZ7YCE8T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)

export async function uploadFileToFirebase(b64: string, name: string) {
    try {
        const raw = b64.replace(/^data:image\/\w+;base64,/, "")
        const bytes = Buffer.from(raw, "base64")
        
        const safeName = name.replace(/\s+/g, "_")
        const fileName = `${safeName}_${Date.now()}.jpeg`;
        const storageRef = ref(storage, fileName)
        
        // upload raw bytes
        await uploadBytes(storageRef, bytes, {
            contentType: 'image/jpeg'
        })

        const firebase_url = await getDownloadURL(storageRef)
        return firebase_url
    } catch (error) {
        console.error(error)
    }
}