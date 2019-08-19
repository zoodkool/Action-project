
const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions


const admin = require('firebase-admin');
let serviceAccount = require('./thayjsoncuaemvaoday.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// var AuthenticationClient = require('auth0').AuthenticationClient;
// var auth0 = new AuthenticationClient({
//   'clientId': '5e3FdBNI96XTrMKM0Ng9eRjBxXLpgUJC',
//   'domain': 'lbminhautomation.auth0.com'
// });
const {smarthome} = require('actions-on-google');
const app = smarthome();
let db = admin.firestore();
// const getEmail = async (headers) => {
//   const accessToken = headers.authorization.substr(7);
//   const {email} = await auth0.getProfile(accessToken);
//   return email;
// }
app.onSync(	async (body, headers) => {
  // var userEmail = await getEmail(headers);
  // console.log("userEmail",userEmail);
  // console.log((headers.authorization).slice(6));
  email=(headers.authorization).slice(6).trim();
  console.log(email);
  var userDevices = await db.collection('users').doc(email).collection("devices").get();
  devices=[];
  userDevices.forEach(deviceDoc => {
    var data = deviceDoc.data();
    
    var device = {
    	id: data.id,
    	type: data.type,
    	traits: [data.traits],
    	name: {
    		defaultNames: [data.defaultNames],
    		name: data.name,
    		nicknames: [data.nicknames]
    	},
    	deviceInfo: {
          manufacturer: data.manufacturer,
          model: data.model,
          hwVersion: data.hwVersion,
          swVersion: data.swVersion
      },
      willReportState: false,
      attributes: {}
    };
    
    devices.push(device);
    console.log("devices la: ",devices);
  });




  return {
    requestId: body.requestId,
    payload: {
      agentUserId: email,
      devices: devices
    }
  };
});
app.onQuery((body, headers) => {
  // TODO Get device state
  return {
    requestId: body.requestId,
    payload: {
      devices: {
        123: {
          on: true,
          online: true
        },
        456: {
          on: true,
          online: true,
          brightness: 80,
          color: {
            name: "cerulean",
            spectrumRGB: 31655
          }
        }
      }
    }
  };
});
app.onExecute((body, headers) => {
  // TODO Send command to device
  return {
    requestId: body.requestId,
    payload: {
      commands: [{
        ids: ["123"],
        status: "SUCCESS",
        states: {
          on: true,
          online: true
        }
      }, {
        ids: ["456"],
        status: "ERROR",
        errorCode: "deviceTurnedOff"
      }]
    }
  };
});
app.onDisconnect((body, headers) => {
  // TODO Disconnect user account from Google Assistant
  // You can return an empty body
  return {};
});

exports.helloWorld1 = functions.https.onRequest(app)
