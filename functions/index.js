const functions = require('firebase-functions');

const URLSearchParams = require('url').URLSearchParams

const admin = require('firebase-admin');
let serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


const {smarthome} = require('actions-on-google');
const app = smarthome();
let db = admin.firestore();


app.onSync(	async (body, headers) => {
  //var email = headers.authorization.substr(7);
  //console.log('email la:' +email);

  email = (headers.authorization).slice(6).trim();
  console.log('email1 la:' +email);

  //var searchParams = new URLSearchParams(window.location.search);
  //email = searchParams.get('code');

  //console.log('code la: ', email);

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
exports.tokenurl = functions.https.onRequest((request, response) => {
  a = {
"token_type": "Bearer",
"access_token": "ACCESS_TOKEN987654321",
"refresh_token": "REFRESH_TOKEN987654321",
"scope": "email",
"expires_in": 10000
};
  //console.log(a);
  response.send(a);
 });
