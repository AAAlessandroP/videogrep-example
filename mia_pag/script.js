
var mymap = L.map('map').setView([45.505, 9], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);

fetch(
    "/data/example.xml"
)
    .then(res => {
        res.text()
            .then(xml => {
                console.log(`xml`, xml);
                let gpx = new gpxParser();
                gpx.parse(xml)
                let coordinates = gpx.tracks[0].points.map(p => [p.lat.toFixed(5), p.lon.toFixed(5)]);
                var polyline = L.polyline(coordinates, { weight: 6, color: 'darkred' }).addTo(mymap);
                mymap.fitBounds(polyline.getBounds());


                // document.getElementById("track-name").innerText = gpx.tracks[0].name;
                // `<b>${gpx.tracks[0].name}</b><br>Dist: ` + gpx.tracks[0].distance.total
                // document.getElementById("totalDistance").innerText = (gpx.tracks[0].distance.total / 1000).toFixed(3);
                L.geoJSON(coordinates, {
                    style: function (feature) {
                        return { color: feature.properties.color };
                    }
                }).addTo(mymap)
            })
    })
