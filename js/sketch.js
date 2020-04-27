'use strict';


//databaseURL: https://console.firebase.google.com/u/1/project/messageinabottle-8f3ec/database/messageinabottle-8f3ec/data

let nodeData; // object we will push to firebase
let fbData; // data we pull from firebase
let fbDataArray; // firebase data values converted to an array
let database; // reference to our firebase database
let folderName = 'messages'; // name of folder you create in database
let messageInput;
let sendMessageBtn;



function setup() {
  noCanvas();

  // messageInput = select ("#messageInput");
  messageInput = document.querySelector ("#messageInput");
  sendMessageBtn = document.querySelector ("#sendMessageBtn");

  sendMessageBtn.addEventListener('click',sendMessage);

  let config = {
      apiKey: "AIzaSyCbjQyU1Di20_Ck-sC60IfAuqzM2hgY2ek",
      authDomain: "messageinabottle-8f3ec.firebaseapp.com",
      databaseURL: "https://messageinabottle-8f3ec.firebaseio.com",
      projectId: "messageinabottle-8f3ec",
      storageBucket: "messageinabottle-8f3ec.appspot.com",
      messagingSenderId: "722089260841",
      appId: "1:722089260841:web:f368fb761e2d49fcf36938"

  };

  firebase.initializeApp(config);

  database = firebase.database();

  //this references the folder you want your data to appear in
  let ref = database.ref(folderName);
  //folderName must be consistant across all calls to this folder

  ref.on('value', gotData, errData);

}

function draw() {

}

function sendMessage(){
  if (messageInput.value){
  let timestamp = Date.now();

  nodeData = {

    messageText: messageInput.value,
    timestamp: timestamp,
  }

  console.log(messageInput.value);

  // console.log (timestamp);
  createNode(folderName, timestamp, nodeData);

  createP(`send message: ${nodeData.messageText}`);

  messageInput.value = ''

  }else {
  alert("uh oh. type message first")
  }

}
