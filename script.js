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

let map, mapEvent;
if (navigator.geolocation)
  navigator.geolocation.getCurrentPosition(
    function (position) {
      const { latitude } = position.coords;
      const { longitude } = position.coords;
      console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

      const coords = [latitude, longitude];
      map = L.map("map").setView(coords, 13);

      L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // handling clicks on map

      map.on("click", function (mapE) {
        mapEvent = mapE;
        form.classList.remove("hidden");
        Distance.focus();
      });
    },
    function () {
      alert("could not get your position");
    }
  );

form.addEventListener("submit", function (e) {
  e.preventDefault();
  // clear input fields
  Distance.value = Duration.value = Cadence.value = Elevation.value = "";
  // display marker
  console.log(mapEvent);
  const { lat, lng } = mapEvent.latlng;

  L.marker([lat, lng])
    .addTo(map)
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
});
Type.addEventListener("change", function () {
  Elevation.closest(".formRow").classList.toggle("formRowHidden");
  Cadence.closest(".formRow").classList.toggle("formRowHidden");
});
