/*
 * Copyright 2016 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the
 * License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing permissions and
 * limitations under the License.
 */

var config = {
  apiKey: "AIzaSyAEplAYJKQa6oDO_0bzVl2ZkCxKplfv5dg",
  authDomain: "go-link-75cab.firebaseapp.com",
  databaseURL: "https://go-link-75cab.firebaseio.com",
  projectId: "go-link-75cab",
  storageBucket: "go-link-75cab.appspot.com",
  messagingSenderId: "1061758672978",
  appId: "1:1061758672978:web:97655767cfd14b38"
};
firebase.initializeApp(config);

// Google OAuth Client ID, needed to support One-tap sign-up.
// Set to null if One-tap sign-up is not supported.
var CLIENT_ID = '1061758672978-idktj67io9poie4s5hqhi5krsbtcs6fq.apps.googleusercontent.com';
