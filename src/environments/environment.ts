

import { initializeApp } from "firebase/app";
// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyChIudFU6W4rIHyrhq_E4s2KpOhOi7tW0k",
  authDomain: "pumarinosotelo.firebaseapp.com",
  projectId: "pumarinosotelo",
  storageBucket: "pumarinosotelo.appspot.com",
  messagingSenderId: "958962820482",
  appId: "1:958962820482:web:c20d9ed4164469094edb9b"
};



// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const environment = {
  production: false,
  firebaseConfig,
  apiUrl:"https://uber-nodejs-server-git-d61f89-guillermovillacuratorres-projects.vercel.app/api/"
};