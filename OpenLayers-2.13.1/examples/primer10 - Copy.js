
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

vlayer = new OpenLayers.Layer.Vector( "Editable" );
map = new OpenLayers.Map( 'map', {
	controls: [
		new OpenLayers.Control.PanZoom(),
		new OpenLayers.Control.EditingToolbar(vlayer)
	]
});

map.addLayers([ol_wms, opstine_wms, reke_wms, zajedno, vlayer]);
map.addControl(new OpenLayers.Control.LayerSwitcher());
map.setCenter(new OpenLayers.LonLat(21,44),6);

