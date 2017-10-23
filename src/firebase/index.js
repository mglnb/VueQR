import Firebase from 'firebase'

let config = {
    apiKey: "AIzaSyB5RE6D57agLEMGeqsZMyZ-NVCtYdAqym0",
    authDomain: "vueqr-85452.firebaseapp.com",
    databaseURL: "https://vueqr-85452.firebaseio.com",
    projectId: "vueqr-85452",
    storageBucket: "vueqr-85452.appspot.com",
    messagingSenderId: "526527730693"
  };
  let firebaseApp = Firebase.initializeApp(config);
  const db = firebaseApp.database()

  export default db