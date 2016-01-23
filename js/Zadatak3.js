var apiKey = "27oyRfyGsUGGzpcfOEcL~kOftlxu9yu2N9bmI6DEuaA~Apr4kkqL9DaomWxA0ucPOgrF6iLOUebQf7ga3jaBm4ftZ_B-RZfHf5qR_O5L9RfT";
var map = new OpenLayers.Map('map');

var ol_wms = new OpenLayers.Layer.WMS(
    "OpenLayers WMS",
    "http://vmap0.tiles.osgeo.org/wms/vmap0",
    {layers: "basic"}
);

var road = new OpenLayers.Layer.Bing({
                name: "Road",
                key: apiKey,
                type: "Road"
});
var hybrid = new OpenLayers.Layer.Bing({
	name: "Hybrid",
	key: apiKey,
	type: "AerialWithLabels"
});
var aerial = new OpenLayers.Layer.Bing({
	name: "Aerial",
	key: apiKey,
	type: "Aerial"
});

map.addLayers([road, hybrid, aerial, ol_wms]);
map.addControl(new OpenLayers.Control.LayerSwitcher());
map.setCenter(
                new OpenLayers.LonLat(19.8369400,45.2516700).transform(
                    new OpenLayers.Projection("EPSG:4326"),
                    map.getProjectionObject()
                ), 12
            ); 