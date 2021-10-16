// api.openweathermap.org/data/2.5/weather?q=tehran&appid=3f62157d57cc0488fb96ebb839e84bf5&units=metric

const form = document.querySelector(".top-banner form") ;
const input =document.querySelector(".top-banner input");
const msg = document.querySelector(".top-banner .msg");
const ul = document.querySelector(".ajax-section .cities" );

const API_key = "3f62157d57cc0488fb96ebb839e84bf5";

form.addEventListener("submit" , submitFunc);
function submitFunc(event) {
   event.preventDefault();
   let inputVal = input.value;
   const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${API_key}&units=metric`;
   fetch(url)
   .then(response => response.json())
   .then(data => {
       const{ main ,sys ,name,weather} = data;  //destructure
    const icon =`https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`
   //create li
   const li =document.createElement("li");
   li.classList.add("city");
   const markup =`
    <h2 class="city-name" data-name=${name},${sys.country}>
          <span>${name}</span>
          <span>${sys.country}</span>
    </h2>
    <div class ='city-temp'>${Math.round(main.temp)}</div>
    <figure>
          <img class='city-icon' src='${icon}' alt ='city'>
          <figurecaption>${weather[0]["description"]}</figurecaption>
    </figure>     
   `;
    li.innerHTML =markup;
    ul.appendChild(li);
    msg.innerHTML = "";
})
    .catch(() =>{
        msg.innerHTML = "Search for a valid city!"
    })

    input.value = "";
}