// API Data
const key = "f7d9f1ddfc8667b82dd034682dd56f39"
const weatherUrl = "https://api.openweathermap.org/data/2.5/weather?zip="

// Event listener
const button = document.getElementById("generate")
button.addEventListener("click", () => getValues(weatherUrl, key))

// GET Web API Data
const getApiData = async (weatherUrl, zip, key, country) => {   
    const res = await fetch(weatherUrl + zip + "," + country + "&appid=" + key)
    try {
      const data = await res.json();
      console.log(data)
      return data;
    }
    // Errorhandler
    catch(error) {
      console.log("Error:", error);
    }
}

// POST data
const postData = async ( url = '', data = {}) => {
  const response = await fetch(url, {
  method: 'POST', 
  credentials: 'same-origin',
  headers: {
      'Content-Type': 'application/json',
  },      
  body: JSON.stringify(data)
});
  try {
    const newData = await response.json();
    console.log(newData);
    return "new data: " + newData;
  } 
  // Errorhandler
  catch(error) {
  console.log("Error sending data", error);
  }
}

// GET Project Data and change website display*/
const retrieveData = async (url = "") => { 
  const request = await fetch(url);
  try {
    const allData = await request.json()
    
    // Change display
    const recent = allData[allData.length -1]
    document.querySelector("#date").textContent = recent.date
    document.querySelector("#temp").textContent = recent.temp + "°C"
    document.querySelector("#content").textContent = recent.weather
    const searches = document.querySelector("#searches")
    const item = document.createElement("p")
    const content = 
      `Date: ${recent.date}
Location: ${recent.zip}, ${recent.country}
Result: ${recent.temp}°C, ${recent.weather}
Mood: ${recent.feelings}`
    item.innerHTML = 
      "<pre><p class = 'listItems'>" + content + "</p></pre></br>"
    searches.appendChild(item)
    const img = document.querySelector("#weatherIcon")
    img.setAttribute("src", recent.icon)
    img.style.display = "block"
  }
  // Errorhandler
  catch(error) {
    console.log("Error getting data", error);
  }
}

// Function called by event listener
const getValues = (weatherUrl, key) => {
  // get input
  const feelings = document.getElementById("feelings").value
  const zip = document.getElementById("zip").value
  const country = document.getElementById("country").value
  // use input to fetch API data
  getApiData(weatherUrl, zip, key, country)
  .then((data) => {
    // post data to storage array
    const icon = "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png"
    const weather = data.weather[0].main
    const temp = Math.round(100 * (data.main.temp - 273.15)) / 100
    const date = new Date()
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const today = (date.getDate() + ". of " + months[date.getMonth()])
    postData("/addData", {feelings, zip, country, weather, temp, date: today, icon})
  })
  .then(() => {
    // fetch data from storage array to display
    retrieveData("/getData")
  })
}