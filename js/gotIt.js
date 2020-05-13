'use strict';

function gotData(data){


// need to retrieve firebase data with val() method
//this returns an object of all database

  fbData = data.val();

  if (fbData) {
    console.log ('received data:');
    console.log (fbData);


    //create an array of the post values(if you need to loop through)
    fbDataArray = Object.values(fbData);


  } else {
    console.log('nothing in this folder yet');
  }


}

function errData(err){

  console.log('error! did not receive data');
  console.log(err);

}

  //create a new node
  // the node folder name, id, and object are all passed in as parameters
  function createNode(_nodeFolder, _nodeID, _nodeObject){
    firebase.database().ref(_nodeFolder + '/' + _nodeID).set(_nodeObject);
  }

  // createNode(folderName, "test", {text:"hello"});

  function updateNode(_nodeFolder, _nodeID, _updateObject) {
    firebase.database().ref(_nodeFolder + '/' + _nodeID).update(_updateObject);
  }

  function deletNode(_nodeFolder, _nodeID){
    firebase.database().ref(_nodeFolder + '/' + _nodeID).remove();

  }

  function seedDatabase (_array){

    _array.forEach(function (item){

      let timestamp = Date.now();

      nodeData = {

        messageText: item,
        timestamp: timestamp,
        receive: false,
      }

      console.log(messageInput.value);

      // console.log (timestamp);
      createNode(folderName, timestamp, nodeData);

    })



  }
