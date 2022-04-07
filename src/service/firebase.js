import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyDqq6QMI8mvVrR-NY4dnpI3yhZjz0FxPME",
    authDomain: "ugether-f8551.firebaseapp.com",
    databaseURL: "https://ugether-f8551-default-rtdb.firebaseio.com",
    projectId: "ugether-f8551",
    storageBucket: "ugether-f8551.appspot.com",
    messagingSenderId: "542030901953",
    appId: "1:542030901953:web:abb6a676864c9659b59a40",
    // For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
    // measurementId: "G-MEASUREMENT_ID",
};

const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);
export default app;
