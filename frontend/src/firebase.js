import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyBeAijrRtopRJX5sQIrLr57Nw9Puvmr614",
  authDomain: "cobit-qimages.firebaseapp.com",
  projectId: "cobit-qimages",
  storageBucket: "cobit-qimages.appspot.com",
  messagingSenderId: "783787277487",
  appId: "1:783787277487:web:963fc7294d78f08d65685a"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)