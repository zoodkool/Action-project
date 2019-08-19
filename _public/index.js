var mainApp = {};
const CLIENT_ID = '1061758672978-idktj67io9poie4s5hqhi5krsbtcs6fq.apps.googleusercontent.com';
const REDIRECT_URI = 'https://oauth-redirect.googleusercontent.com/r/go-link-75cab';
(function(){
var mainContainer = document.getElementById("main_container");

    var logtout =  function(){
        firebase.auth().signOut().then(function(){
            console.log('success');
            window.location.replace("login.html");
        },function(){})
    }

var init = function(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          console.log("Da dang nhap");
          console.log(firebase.auth().currentUser.getIdToken());
          mainContainer.style.display = "";
          document.getElementById('message').innerHTML = 'UserID: ' + user.uid;

          var urlParams = new URLSearchParams(window.location.search);
          console.log(urlParams.get('client_id'));
          console.log(urlParams.get('redirect_uri'));
          console.log(urlParams.get('state'));
          console.log(urlParams.get('response_type'));
        if (urlParams.get('client_id') === CLIENT_ID &&
            urlParams.get('redirect_uri') === REDIRECT_URI &&
            urlParams.get('state') != null &&
            urlParams.get('response_type') === 'code') {
        console.log("Hien google account linking");
        document.getElementById('link-google-home').style.display = 'inline';}
    
        } else {
          // No user is signed in.
          mainContainer.style.display = "none";
          console.log("redirect");
          window.location.replace("login.html");
        }
      });

}
    
init();

mainApp.logout = logtout;
})();