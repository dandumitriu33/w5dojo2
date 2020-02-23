function main() {
    let timeButton = document.getElementById("theButton")
    timeButton.addEventListener('click', handleTimeButtonClick)
    let cities = document.getElementById("cities");
    cities.addEventListener('change', handleCityChange);
    let autoComp = document.getElementById("autocomplete");
    autoComp.addEventListener('keyup', handleAutoCompKeyUp);
    
    
}






main();

function handleTimeButtonClick(event) {
    const url = "http://api.timezonedb.com/v2.1/get-time-zone?key=NF6PR29SXZHF&format=json&by=zone&zone=Europe/Bucharest";
    fetch(url, {
        method: "GET"
    })
    .then(response => response.json())
    .then(function(data) {
        console.log(data);
        console.log(data.formatted);
        let para = document.getElementById("theParagraph");
        para.innerText=data.formatted;
    })
}

function handleCityChange(event) {
    let queryCity;
    if (this.value === 'Bucharest') {
        queryCity = 'Bucharest,ro'
    } else if (this.value === 'Budapest') {
        queryCity = 'Budapest,hu'
    } else if (this.value === 'Warsaw') {
        queryCity = 'Warsaw,pl'
    } else if (this.value === 'Sofia') {
        queryCity = 'Sofia,bg'
    } else if (this.value === 'Prague') {
        queryCity = 'Prague,cz'
    }
    const url = `https://api.aerisapi.com/observations/${queryCity}?query=temp:!NULL&client_id=MCVvSH1I9GX54mVZ8CXD8&client_secret=a4yDDFLH9aoidAVMhbr5X7GOt9AC3ZXhuZThqEz5`;
    fetch(url, {
        method: "GET"
    })
    .then(response => response.json())
    .then(function(data) {
        document.getElementById("weatherTableRow").innerHTML='';
        let tempData = document.createElement("td");
        tempData.innerText = data.response.ob.tempC + ' Celsius';
        let overcastData = document.createElement("td");
        overcastData.innerText = data.response.ob.sky + '% overcast';
        let humidityData = document.createElement("td");
        humidityData.innerText = data.response.ob.humidity + '% humidity';
        document.getElementById("weatherTableRow").appendChild(tempData);
        document.getElementById("weatherTableRow").appendChild(overcastData);
        document.getElementById("weatherTableRow").appendChild(humidityData)
    })
}

function handleAutoCompKeyUp (event) {
    if (event.keyCode === 13) {
        console.log('enter pressed');
        document.getElementById("selectedCity").innerText=`Selected City: ${document.getElementById("autocomplete").value}`;
    } 
    fetch(`https://api.teleport.org/api/cities/?search=${event.target.value}`)
    .then(response => response.json())
    .then(function(data) {
        let cityList = [];
        for (let i=0; i<data._embedded["city:search-results"].length; i++) {
            cityList.push(data._embedded["city:search-results"][i]["matching_full_name"])
            }
        $( "#autocomplete" ).autocomplete({
            source: cityList
                    })
        
                    
    })
         
};
