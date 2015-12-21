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
    {isBaseLayer: false, visibility: true}
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


map.addLayers([ol_wms, opstine_wms, reke_wms, zajedno]);

var markers = new OpenLayers.Layer.Markers( "Markers" );
map.addLayer(markers);

var size = new OpenLayers.Size(21,25);
var offset = new OpenLayers.Pixel(-(size.w/2), -size.h);
var icon = new OpenLayers.Icon('http://www.openlayers.org/dev/img/marker.png',size,offset);
markers.addMarker(new OpenLayers.Marker(new OpenLayers.LonLat(21,44),icon));

var newl = new OpenLayers.Layer.Text( "text", {location: "./textfile.txt"} );
map.addLayer(newl);

map.addControl(new OpenLayers.Control.LayerSwitcher());
map.setCenter(new OpenLayers.LonLat(21,44),6);
