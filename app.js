import "https://unpkg.com/maplibre-gl@4.7.1/dist/maplibre-gl.js";
//import jsonText from "./jsonTest.json" assert {type: 'json'};
const Seattle = [-122.3, 47.6];
var markerJSON;

async function getData(path) {
    const response = await fetch(path);
    return response.json();
}

async function processMarkers(points, map) {
    for (let i = 0; i < points.length; i++) {
        let popupHTML = "<img src='./photos/" + points[i].photoID + ".gif' alt=' + markerData[i].description + ' style='width:200px;height:200px;'><h3>" + points[i].date + "</h3><p>" + points[i].description + "</p>";
        console.log(popupHTML);
        let popup = new maplibregl.Popup().setHTML(popupHTML).addTo(map);
        let marker = new maplibregl.Marker({
            color: points[i].color,
            draggable: false
        })
            .setLngLat(points[i].coordinates)
            .setPopup(popup)
            .addTo(map)
    }
}

async function init() {
    let markerJSON = await getData("./jsonTest.json");
    console.log(markerJSON)
    const map = new maplibregl.Map({
        // style: "/styles/dark.json",
        style: "https://tiles.openfreemap.org/styles/liberty",
        center: Seattle,
        zoom: 11,
        container: "map",
    });

    await processMarkers(markerJSON.points, map);
}

init();