import config  from './config.js';
firebase.initializeApp(config);


document.addEventListener('DOMContentLoaded', function(){

    const uploadButton = document.getElementById('upload-button');
    const uploadInput = document.getElementById('file-select');

    // Initialize Firebase



    const query = firebase.database().ref();


  //UPLOAD
    var selectedFile;
    uploadInput.addEventListener("change", function(e){
      console.log(e.target.files);
      selectedFile = e.target.files[0];
    })



  //IMAGE UPLOAD AND STORAGE
  // Get a reference to the storage service, which is used to create references in your storage bucket


  uploadButton.addEventListener("click", uploadFile);

  function uploadFile(e){
    var storage = firebase.storage();
    var fileName = selectedFile.name;
    console.log(fileName);
    var storageRef = firebase.storage().ref('/f35s/' + fileName);
    var uploadTask = storageRef.put(selectedFile);
    var imageURL;

      // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on('state_changed', function(snapshot){
      // Observe state change events such as progress, pause, and resume
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log('Upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log('Upload is running');
          break;
      }
    }, function(error) {
      // Handle unsuccessful uploads
        console.log("Upload unsuccessful")
    }, function() {
      // Handle successful uploads on complete
      uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
        console.log('File available at', downloadURL);
      });

      imageURL = uploadTask.snapshot.downloadURL;
      var postKey = firebase.database().ref('second/').push().key;
      var updates = {};
      var postData = {
        url: imageURL,
      }
      console.log(imageURL)
      updates['/second/' + postKey] = postData;
      firebase.database().ref().update(updates)
    });

  }




});
