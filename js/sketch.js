'use strict';


//databaseURL: https://console.firebase.google.com/u/1/project/messageinabottle-8f3ec/database/messageinabottle-8f3ec/data

let nodeData; // object we will push to firebase
let fbData; // data we pull from firebase
let fbDataArray; // firebase data values converted to an array
let database; // reference to our firebase database
let folderName = 'messages'; // name of folder you create in database
let messageInput;
let sendMessageBtn;
let receiveMessageBtn;
let sendAgainBtn;
let receivedMessage;
let receiveDiv;
let sendDiv;
let chatsLoaded = false;




function setup() {
  noCanvas();
  // access DOM elements
  // messageInput = select ("#messageInput");
  messageInput = document.querySelector("#messageInput");
  sendMessageBtn = document.querySelector("#sendMessageBtn");
  receiveMessageBtn = document.querySelector("#receiveMessageBtn");
  sendAgainBtn = document.querySelector("#sendAgainBtn");
  receivedMessage = document.querySelector("#receivedMessage");
  receiveDiv = document.querySelector("#receiveDiv");
  sendDiv = document.querySelector("#sendDiv");

  sendMessageBtn.addEventListener('click', sendMessage);
  receiveMessageBtn.addEventListener('click', receiveMessage);
  sendAgainBtn.addEventListener('click', sendAgain);

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

function sendMessage() {
  if (messageInput.value) {
    let timestamp = Date.now();

    nodeData = {

      messageText: messageInput.value,
      timestamp: timestamp,
      receive: false,
    }

    console.log(messageInput.value);

    // console.log (timestamp);
    createNode(folderName, timestamp, nodeData);

    createP(`send message: ${nodeData.messageText}`);

    messageInput.value = ''

    sendDiv.style.display = "none";
    receiveDiv.style.display = "block";

  } else {
    alert("uh oh. type message first")
  }

}



function receiveMessage() {

  //shuffle array first

  shuffleArray(fbDataArray);

  for (let i = 0; i < fbDataArray.length; i++) {

    if (fbDataArray[i].receive === false) {
      // console.log("receive message");
      // console.log(fbDataArray[i].messageText);

      receivedMessage.innerHTML = fbDataArray[i].messageText;

      updateNode(folderName, fbDataArray[i].timestamp, {
        receive: true,
      });

      receiveMessageBtn.style.display = "none";
      sendAgainBtn.style.display = "block";

      break;

    } else {

      receivedMessage.innerHTML = "no more message out at sea";
      //console.log("no more message out at sea")

    }
  }
}

function sendAgain() {
  //reset receive div

  receivedMessage.innerHTML = "";
  receiveMessageBtn.style.display = "block";
  sendAgainBtn.style.display = "none";

  //return to beginning
  receiveDiv.style.display = "none";
  sendDiv.style.display = "block";


}

function shuffleArray(_array) {
  // iterate backwards through an array
  for (let i = _array.length - 1; i > 0; i--) {

    // grab random index from 0 to i
    let randomIndex = Math.floor(Math.random() * (i + 1));

    // swap elements _array[i] and _array[j]
    [_array[i], _array[randomIndex]] = [_array[randomIndex], _array[i]]; // using "destructuring assignment" syntax

    // same can be written as:
    // let _arrayItem = _array[i]; // _array item in original position array[i]
    // _array[i] = _array[randomIndex]; // overwrite _array[i] with new item at random index
    // _array[randomIndex] = _arrayItem; // now move _array item from original position into random position

  }
}
