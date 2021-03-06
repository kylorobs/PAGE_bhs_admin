import { config } from './config.js';
import { updateArtist } from './updateArtist.js'

export function uploadNewImage(selectedFile, fileName, data){
  let imageURL;
  var storage = firebase.storage();
  console.log(fileName);
  var storageRef = firebase.storage().ref('/profiles/' + fileName);
  var uploadTask = storageRef.put(selectedFile);

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

    //RETURN UPLOADED IMAGE URL
    imageURL = uploadTask.snapshot.downloadURL;
    console.log(imageURL)
    // return imageURL;
    data.image = imageURL
    updateArtist(data)
    });
}
