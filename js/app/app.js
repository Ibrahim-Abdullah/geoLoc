// Since we will be making use of 3rd party functions (eg. navigator.geolocation.getCurrentPosition) which are not native javascript functions we will need
// to add this function to the list of native javascript functions to allow javascript identify and execute it each time its called.
// This is done by using the addEventListener() function.
//

var map = "";
var longitude = "";
var latitude = "";
var markers = [];

//document.addEventListener("deviceready", onDeviceReady, false);


//When device is ready, check if location is enabled.
function onDeviceReady() {
    cordova.plugins.diagnostic.isLocationEnabled(successCallback, errorCallback)
    
}

function successCallback(){
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
}

// onError Callback receives a PositionError object
//
function errorCallback(error) {
    cordova.plugins.diagnostic.switchToLocationSettings();
    successCallback();
}

function showLocation(){
    var button = document.getElementById("bot");

    if(button.value === "showLocation"){
        addMarker();
        button.value = "removeLocation";
        button.innerHTML = "Remove Location";
    }
    else{
        removeMarker();
        button.value = "showLocation";
        button.innerHTML = "Show Location";
    }
}

// onSuccess Geolocation
//
function onSuccess(position) {

    //GET THE LONGITUDE AND LATITUDE OF CURRENT LOCATION
    latitude=position.coords.latitude;
    longitude=position.coords.longitude;

    //
    showMap();
    
}

//DRAW THE MAP ON THE WEBPAGE

function showMap(){

    var latLong = new google.maps.LatLng(latitude,longitude);

    //MAP OPTIONS 
    var mapOptions = {
        center:latLong,
        zoom:12
    };
    map = new google.maps.Map(document.getElementById('map'),mapOptions);
}


//ADD A MARKER TO THE MAP
function addMarker(){

    var latLong = new google.maps.LatLng(latitude,longitude);
    var marker = new google.maps.Marker({position: latLong,map: map});
    markers.push(marker);
}

function addMoreMarkers(latLang){

    var marker = new google.maps.Marker({position: latLong,map: map});
    markers.push(marker);   
}

function removeMarker(){
    setMapOnAll(null);
}

function setMapOnAll(map){
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}


// onError Callback receives a PositionError object
//
function onError(error) {
    latitude = 0.0;
    longitude = 0.0;
    showMap();
}

map.addListener('click', function(event) { addMoreMarkers(event.latLng);});

