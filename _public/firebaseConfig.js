var app_fireBase = {};
(function(){
    const firebaseConfig = {
        apiKey: "AIzaSyAEplAYJKQa6oDO_0bzVl2ZkCxKplfv5dg",
		authDomain: "go-link-75cab.firebaseapp.com",
		databaseURL: "https://go-link-75cab.firebaseio.com",
		projectId: "go-link-75cab",
		storageBucket: "go-link-75cab.appspot.com",
		messagingSenderId: "1061758672978",
		appId: "1:1061758672978:web:97655767cfd14b38"

      };
      firebase.initializeApp(firebaseConfig);

      app_fireBase =firebase;
})()