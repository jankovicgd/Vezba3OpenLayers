 var apiKey = "27oyRfyGsUGGzpcfOEcL~kOftlxu9yu2N9bmI6DEuaA~Apr4kkqL9DaomWxA0ucPOgrF6iLOUebQf7ga3jaBm4ftZ_B-RZfHf5qR_O5L9RfT";
var map = new OpenLayers.Map("map");

var ol_wms = new OpenLayers.Layer.WMS(
    "OpenLayers WMS",
    "http://vmap0.tiles.osgeo.org/wms/vmap0",
    {layers: "basic"}
);


var opstine_wms = new OpenLayers.Layer.WMS(
    "Opštine",
    "http://localhost:8080/geoserver/ows",
    {
        layers: "vzb:opstine",
        transparent: "true",
        format: "image/png"
    },
    {isBaseLayer: false, visibility: false}
);

var reke_wms = new OpenLayers.Layer.WMS(
    "Reke",
    "http://localhost:8080/geoserver/ows",
    {
        layers: "vzb:reke",
        transparent: "true",
        format: "image/png"
    },
    {isBaseLayer: false, visibility: false}
);

var zajedno = new OpenLayers.Layer.WMS(
    "Reke i opštine",
    "http://localhost:8080/geoserver/ows",
    {
        layers: "vzb:opstine,vzb:reke",
        transparent: "true",
        format: "image/png"
    },
    {isBaseLayer: false, visibility: false}
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



map.addLayers([ road, hybrid, aerial, ol_wms, opstine_wms, reke_wms, zajedno]);
map.addControl(new OpenLayers.Control.LayerSwitcher());
map.zoomToMaxExtent();
