var map = new OpenLayers.Map( 'map', {
	controls: [
		new OpenLayers.Control.PanZoom(),
		new OpenLayers.Control.MousePosition()
	]
});

var ol_wms = new OpenLayers.Layer.WMS(
    "OpenLayers WMS",
    "http://vmap0.tiles.osgeo.org/wms/vmap0",
    {layers: "basic"}
);

var drzave_wms = new OpenLayers.Layer.WMS(
    "Drzave",
    "http://localhost:8080/geoserver/ows", 
	{
        layers: "Vizuelizacija2:drzave",
        transparent: "true",
        format: "image/png"
    }, 
	{
        isBaseLayer: false,
        visibility: false
    }
);


var ko_wms = new OpenLayers.Layer.WMS(
    "Katastarske opstine",
    "http://localhost:8080/geoserver/ows", {
        layers: "Vizuelizacija1:ko",
        transparent: "true",
        format: "image/png"
    }, 
	{
        isBaseLayer: false,
        visibility: false
    }
);

var soilpol_wms = new OpenLayers.Layer.WMS(
    "Soil Polution",
    "http://localhost:8080/geoserver/ows", {
        layers: "Vizuelizacija1:soil_polution_Project",
        transparent: "true",
        format: "image/png"
    }, 
	{
        isBaseLayer: false,
        visibility: false
    }
);

map.addLayers([ol_wms, drzave_wms, ko_wms, soilpol_wms]);
map.setCenter(new OpenLayers.LonLat(21,44),6);

// funkcije kojima se podesava vidljivost sloja
function toggleDrzave(element) {
	if (element.checked)
	{
		drzave_wms.setVisibility(true);
	}
	else{
		drzave_wms.setVisibility(false);
	}
}

function toggleKO(element) {
	if (element.checked)
	{
		ko_wms.setVisibility(true);
	}
	else{
		ko_wms.setVisibility(false);
	}
}

function togglesoilpolut(element) {
	if (element.checked)
	{
		soilpol_wms.setVisibility(true);
	}
	else{
		soilpol_wms.setVisibility(false);
	}
}