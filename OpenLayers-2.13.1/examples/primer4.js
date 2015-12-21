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

var gphy = new OpenLayers.Layer.Google(
	"Google Physical",
	{type: G_PHYSICAL_MAP}
);
var gmap = new OpenLayers.Layer.Google(
	"Google Streets", // the default
	{numZoomLevels: 20}
);
var ghyb = new OpenLayers.Layer.Google(
	"Google Hybrid",
	{type: G_HYBRID_MAP, numZoomLevels: 20}
);
var gsat = new OpenLayers.Layer.Google(
	"Google Satellite",
	{type: G_SATELLITE_MAP, numZoomLevels: 22}
);


map.addLayers([ gphy, gmap, ghyb, gsat, ol_wms, opstine_wms, reke_wms, zajedno]);
map.addControl(new OpenLayers.Control.LayerSwitcher());
map.setCenter(new OpenLayers.LonLat(21,44),6);
