const temp = document.querySelector(".tempreture-degree");
const changeTemp = document.querySelector(".degree-section");

window.addEventListener("load", () => {
  let long;
  let lat;
  const description = document.querySelector(".tempreture-description");
  const location = document.querySelector(".location-timezone");
  const icon = document.getElementById("icon");
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const api = `http://api.weatherapi.com/v1/current.json?key=7b7a2331f73a43ce8ce195400202212&q=${lat},${long}`;

      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const { temp_f } = data.current;
          description.textContent = data.current.condition.text;
          temp.textContent = temp_f + " F";
          location.textContent = data.location.name;
          icon.src = `https:${data.current.condition.icon}`;
        });
    });
  }
});

changeTemp.addEventListener("click", onPress);

function onPress(e) {
  if (temp.textContent.substring(temp.textContent.length - 1) === "F") {
    temp.textContent =
      (((parseFloat(temp.textContent) - 32) * 5) / 9).toFixed(2) + " C";
  } else if (temp.textContent.substring(temp.textContent.length - 1) === "C") {
    temp.textContent =
      ((parseFloat(temp.textContent) * 9) / 5 + 32).toFixed(1) + " F";
  }
}
