import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBF3OKJlia5uuVvc-Nghwu-G-nl4rHbShg",
    authDomain: "cooking-directory-site.firebaseapp.com",
    projectId: "cooking-directory-site",
    storageBucket: "cooking-directory-site.appspot.com",
    messagingSenderId: "605731671774",
    appId: "1:605731671774:web:254c7ec9c8eae994bcfc4f"
};

// init firebase
firebase.initializeApp(firebaseConfig)

// init services
const projectFirestore = firebase.firestore()

export { projectFirestore }