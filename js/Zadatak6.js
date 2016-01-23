var map = new OpenLayers.Map('map');

var ol_wms = new OpenLayers.Layer.WMS(
    "OpenLayers WMS",
    "http://vmap0.tiles.osgeo.org/wms/vmap0",
    {layers: "basic"}
);

layer = new OpenLayers.Layer.OSM("Simple OSM Map");
map.addLayer(layer);

map.addLayers([ol_wms]);
map.addControl(new OpenLayers.Control.LayerSwitcher());

map.setCenter(
					new OpenLayers.LonLat(19.8369400,45.2516700).transform(
                    new OpenLayers.Projection("EPSG:4326"),
                    map.getProjectionObject()
                ), 12
            ); 

map.addLayers([ol_wms]);
map.addControl(new OpenLayers.Control.LayerSwitcher());	

var markers = new OpenLayers.Layer.Markers( "Markers" );
map.addLayer(markers);

var size = new OpenLayers.Size(21,25);
var offset = new OpenLayers.Pixel(-(size.w/2), -size.h);
var icon1 = new OpenLayers.Icon('img/Legenda4.png', size, offset);
var icon2 = new OpenLayers.Icon('img/Legenda5.png', size, offset);
var icon3 = new OpenLayers.Icon('img/Legenda6.png', size, offset);

var marker1 = markers.addMarker(new OpenLayers.Marker(new OpenLayers.LonLat(19.8418586,45.2431756).transform(new OpenLayers.Projection("EPSG:4326"), map.getProjectionObject()), icon1));
icon1.setOpacity(0);
var marker2 = markers.addMarker(new OpenLayers.Marker(new OpenLayers.LonLat(19.8462047,45.2473731).transform(new OpenLayers.Projection("EPSG:4326"), map.getProjectionObject()),icon2));
icon2.setOpacity(0);
var marker3 = markers.addMarker(new OpenLayers.Marker(new OpenLayers.LonLat(19.8485134,45.241694).transform(new OpenLayers.Projection("EPSG:4326"), map.getProjectionObject()),icon3));
icon3.setOpacity(0);

function togglep1(element) {
	if (element.checked)
	{
		icon1.setOpacity(1);
	}
	else{
		icon1.setOpacity(0);
	}
}

function togglep2(element) {
	if (element.checked)
	{
		icon2.setOpacity(1);
	}
	else{
		icon2.setOpacity(0);
	}
}

function togglep3(element) {
	if (element.checked)
	{
		icon3.setOpacity(1);
	}
	else{
		icon3.setOpacity(0);
	}
}

marker.events.register('click', marker1, function(e){
	popup1 = new OpenLayers.Popup("chicken",
	new OpenLayers.LonLat(19.8418586,45.2431756).transform(new OpenLayers.Projection("EPSG:4326"), map.getProjectionObject()),
	new OpenLayers.Size(200, 200),
	"example popup",
	null, true);

	map.addPopup(popup1);
});

