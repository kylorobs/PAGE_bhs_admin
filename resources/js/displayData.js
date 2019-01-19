import { config } from './config.js'
var db = firebase.database();
var ref = db.ref("artists");
const artistNames = [];

// DOM SELECTIONS
const upcoming = document.getElementById('upcoming-list');
const filmmakers = document.getElementById('filmmakers-list');
const musicians = document.getElementById('musicians-list');
const photographers = document.getElementById('photographers-list');
const artists = document.getElementById('artists-list');
const poets = document.getElementById('poets-list');
const grid = document.getElementById('grid-area');
const popup = document.querySelectorAll('.popup-container')[0];

console.log("UOPDATED VERSION ----------------")

//EDIT ARTIST DETAILS
let image;
let category;
let name;
let description;
let facebook;
let twitter;
let instagram;
let website;
let key;

function loadArtists(){

  ref.orderByChild("name").on("child_added", function(snapshot) {
    console.log("List all the Achilles")
    console.log("snapshot key: " + snapshot.key);
    artistNames.push(snapshot.val().name);
    console.log("data snapshot");
    let data = snapshot.val();
    console.log(data)
    let type = snapshot.val().type;
    let li = document.createElement('li');
    li.innerHTML = name;
    switch(type){
      case "upcoming" :
        upcoming.appendChild(li);
      break;
      case "filmmakers" :
        filmmakers.appendChild(li);
      break;
      case "musicians" :
        musicians.appendChild(li);
      break;
      case "photographers" :
        photographers.appendChild(li);
      break;
      case "artists" :
        artists.appendChild(li);
      break;
      case "poets" :
        poets.appendChild(li);
      break;
      default: console.log("Artist does not fall into category")

    }

    li.addEventListener('click', function editArtist(){
      image = data.image;
      category = data.type;
      name = data.name;
      description = data.description
      facebook = data.facebook;
      twitter = data.twitter;
      instagram = data.instagram;
      website = data.website;
      key = snapshot.key;

      }
    });

  });

}

function editArtist(){
  document.getElementById('edit-name').value = name;
  document.getElementById('edit-description').value = description;
  document.getElementById('edit-image').value = image;
  document.getElementById('edit-facebook').value = facebook;
  document.getElementById('edit-twitter').value = twitter;
  document.getElementById('edit-instagram').value = instagram;
  document.getElementById('edit-website').value = website;
  document.getElementById('edit-type').value = category;

  if (!popup.classList.contains('active')){
    popup.classList.add('active');
  }

}

function deleteArtist(){
  console.log("delete artist")
}

function updateArtist(){
    console.log("ypdates artist")
}

function hidePopUp(){
  if (popup.classList.contains('active')){
    popup.classList.remove('active');
  }
}

loadArtists();
