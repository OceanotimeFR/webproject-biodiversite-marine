var map = L.map('map').setView([0.0, 0.0], 2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
    minZoom: 3
}).addTo(map);

var southWest = L.latLng(-90, -200);
var northEast = L.latLng(90, 180);
var bounds = L.latLngBounds(southWest, northEast);
map.setMaxBounds(bounds);

// Définition des icônes
const defaultIcon = L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    shadowSize: [41, 41]
});

const selectedIcon = L.icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    shadowSize: [41, 41]
});

let selectedMarker = null;

const data = "../json/map.json";

fetch(data)
    .then(response => {
        if (!response.ok) throw new Error(`Erreur HTTP ${response.status}`);
        return response.json();
    })
    .then(areas => {
        areas.forEach(function (zone) {
            const marker = L.marker(zone.coords, { icon: defaultIcon }).addTo(map);

            marker.bindPopup(`
                <div class="popup-content" style="
                    width: 240px;
                    height: 120px;
                    background-image: url('${zone.image}');
                    background-size: cover;
                    background-position: center;
                    display: flex;
                    align-items: flex-end;
                    border-radius: 8px;
                    overflow: hidden;
                ">
                    <div style="
                        background: linear-gradient(to top, rgba(0,0,0,1) 10%, rgba(0,0,0,0) 100%);
                        color: white;
                        width: 100%;
                        text-align: center;
                        padding: 5px;
                    ">
                        <b>${zone.nom}</b><br>${zone.description}
                    </div>
                </div>
            `, {
                className: 'no-background-popup'
            });

            // Gestion du clic pour changer la couleur du marker
            marker.on('click', () => {
                if (selectedMarker && selectedMarker !== marker) {
                    selectedMarker.setIcon(defaultIcon);
                }
                selectedMarker = marker;
                marker.setIcon(selectedIcon);
            });
        });
    })
    .catch(error => {
        console.error("Erreur lors du chargement des données :", error);
    });
