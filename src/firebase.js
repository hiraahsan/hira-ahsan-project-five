import firebase from 'firebase/app';
import 'firebase/database';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAyf12FdGTgypQ0Ae48KszC61cViIsSRAU",
    authDomain: "project-five-tests.firebaseapp.com",
    databaseURL: "https://project-five-tests.firebaseio.com",
    projectId: "project-five-tests",
    storageBucket: "project-five-tests.appspot.com",
    messagingSenderId: "909191868794",
    appId: "1:909191868794:web:1046029a4765b1b69566c3"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);



export default firebase;