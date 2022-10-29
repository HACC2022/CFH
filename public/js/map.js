var map = L.map('map').setView([37.8, -96], 2);
var geojson;
var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    this._div.innerHTML = '<h4>Countries</h4>' +  (props ?
        '<b>' + props.name + '</b><br />' + (props.density || '0') + ' redirections'
        : 'Hover over a country');
};

info.addTo(map);

function getColor(d) {
    return d > 7 ? '#800026' :
           d > 6  ? '#BD0026' :
           d > 5  ? '#E31A1C' :
           d > 4  ? '#FC4E2A' :
           d > 3   ? '#FD8D3C' :
           d > 2   ? '#FEB24C' :
           d > 0    ? '#FED976' :
                      '#FFEDA0';
}

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    layer.bringToFront();
    info.update(layer.feature.properties);
}

function resetHighlight(e) {
    geojson.resetStyle(e.target);
    info.update();
}

function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: zoomToFeature
    });
}

fetch("/admin/country")
  .then(response => response.json())
  .then(data => {
    // const newCountriesData = JSON.parse(JSON.stringify(countriesData));
    console.log(data);
    for (const country of countriesData.features) {
        for (const countryData of Object.keys(data)) {
            if (country.properties.name.includes(countryData)) {
                country.properties.density = data[countryData];
            }
        }
    }
    console.log(countriesData);
    geojson = L.geoJson(countriesData, {style, onEachFeature}).addTo(map);
  });

function style(feature) {
    return {
        fillColor: getColor(feature.properties.density),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}

var tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
