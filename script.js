// pseudo code
//  1. log in myrunning worrkouts wih location , distannce,time, pace and steps so i can keep a log of all  off  rrunnuing
//  --> click on map so user can add new workout with geolocation to displaay current location
//  --> form to input disancee, pace,steps
//  2.log in all  cyling workouts ( location,distance,time,speed and elevation)
//  --> form to input distance, time, speed, elevation
//  3.see all my workouts so i can tranck my progress
// --> displ;ay all workouts in a list
//  4.see all workouts on a map so i can check where i work out the most
//  --> display all work outs on the map
//  5.see all my workouts when i leave the app and come back later so i can keep using the app over time
//  --> store workout data in browser

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const form = document.querySelector(".form");
const containerWorkouts = document.querySelector(".workouts");
const Type = document.querySelector(".formInputType");
const Distance = document.querySelector(".formInputDistance");
const Duration = document.querySelector(".formInputDuration");
const Cadence = document.querySelector(".formInputCadence");
const Elevation = document.querySelector(".formInputElevation");

class Workout {
  date = new Date();
  id = (new Date()  + '').slice(-10);
  constructor(coords, distance, duration) {

    this.coords = coords;
    this.distance = distance;
    this.duration = duration;
  }
}


class App {
  #map;
  #mapEvent;
  constructor() {
    this._getPosition();
    form.addEventListener("submit", this._newWorkout.bind(this));
    Type.addEventListener("change", this._toggleElevationField);

  }

_getPosition() { 
  if (navigator.geolocation)
  navigator.geolocation.getCurrentPosition(this._loadMap.bind(this), function () {
      alert("could not get your position");
    } );
}
_loadMap(position) {
  
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

    const coords = [latitude, longitude];
    this.#map = L.map("map").setView(coords, 13);

    L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    // handling clicks on map

    this.#map.on("click", this._showForm.bind(this));
  
}
_showForm(mapE) {
  this.#mapEvent = mapE;
  form.classList.remove("hidden");
  Distance.focus();
}
_toggleElevationField() {
       Elevation.closest(".formRow").classList.toggle("formRowHidden");
      Cadence.closest(".formRow").classList.toggle("formRowHidden");
}
_newWorkout(e) {
  e.preventDefault();
      // clear input fields
      Distance.value = Duration.value = Cadence.value = Elevation.value = "";
      // display marker
      
      const { lat, lng } = this.#mapEvent.latlng;
    
      L.marker([lat, lng])
        .addTo(this.#map)
        .bindPopup(
          L.popup({
            maxWidth: 250,
            minWidth: 100,
            autoClose: false,
            closeOnClick: false,
            className: "runningPopup",
          })
        )
        .setPopupContent("Workout")
        .openPopup();
}
}


const app = new App();





