var vlayer = new OpenLayers.Layer.Vector( "Editable" );
var map = new OpenLayers.Map( 'map', {
	controls: [
		new OpenLayers.Control.PanZoom(),
		new OpenLayers.Control.EditingToolbar(vlayer)
	]
});

var ol_wms = new OpenLayers.Layer.WMS(
    "OpenLayers WMS",
    "http://vmap0.tiles.osgeo.org/wms/vmap0", {
        layers: "basic"
    }
);

var opstine_wms = new OpenLayers.Layer.WMS(
    "Opštine",
    "http://localhost:8080/geoserver/ows", {
        layers: "zeljana:opstine",
        transparent: "true",
        format: "image/png"
    }, {
        isBaseLayer: false,
        visibility: false
    }
);

var drumskisaob_wms = new OpenLayers.Layer.WMS(
    "Drumski saobracaj",
    "http://localhost:8080/geoserver/ows", {
        layers: "zeljana:drumski_saobracaj",
        transparent: "true",
        format: "image/png"
    }, {
        isBaseLayer: false,
        visibility: false
    }
);

var overview = new OpenLayers.Control.OverviewMap({
    maximized: false,
    maximizeTitle: 'Prikaz celokupne karte',
    minimizeTitle: 'Sakrij prikaz'
});
map.addControl(overview);

var markers = new OpenLayers.Layer.Markers( "Markers" );
map.addLayer(markers);

var size = new OpenLayers.Size(21,25);
var offset = new OpenLayers.Pixel(-(size.w/2), -size.h);
var icon = new OpenLayers.Icon('https://cdn2.iconfinder.com/data/icons/filled-icons/493/Geotag-512.png',size,offset);

markers.addMarker(new OpenLayers.Marker(new OpenLayers.LonLat(21,44),icon));
markers.addMarker(new OpenLayers.Marker(new OpenLayers.LonLat(19,45),icon));
markers.addMarker(new OpenLayers.Marker(new OpenLayers.LonLat(20,44.5),icon));

map.addLayers([ol_wms, opstine_wms, drumskisaob_wms]);
map.addLayer(vlayer);
map.addControl(new OpenLayers.Control.LayerSwitcher());
map.setCenter(new OpenLayers.LonLat(21,44),6);

var sketchSymbolizers = {
		"Point": {
			pointRadius: 4,
			graphicName: "square",
			fillColor: "white",
			fillOpacity: 1,
			strokeWidth: 1,
			strokeOpacity: 1,
			strokeColor: "#333333"
		},
		"Line": {
			strokeWidth: 3,
			strokeOpacity: 1,
			strokeColor: "#666666",
			strokeDashstyle: "dash"
		},
		"Polygon": {
			strokeWidth: 2,
			strokeOpacity: 1,
			strokeColor: "#666666",
			fillColor: "white",
			fillOpacity: 0.3
		}
	};
	var style = new OpenLayers.Style();
	style.addRules([
		new OpenLayers.Rule({symbolizer: sketchSymbolizers})
	]);
	var styleMap = new OpenLayers.StyleMap({"default": style});
	
	// allow testing of specific renderers via "?renderer=Canvas", etc
	var renderer = OpenLayers.Util.getParameters(window.location.href).renderer;
	renderer = (renderer) ? [renderer] : OpenLayers.Layer.Vector.prototype.renderers;

	var measureControls = {
		line: new OpenLayers.Control.Measure(
			OpenLayers.Handler.Path, {
				persist: true,
				handlerOptions: {
					layerOptions: {
						renderers: renderer,
						styleMap: styleMap
					}
				}
			}
		),
		polygon: new OpenLayers.Control.Measure(
			OpenLayers.Handler.Polygon, {
				persist: true,
				handlerOptions: {
					layerOptions: {
						renderers: renderer,
						styleMap: styleMap
					}
				}
			}
		)
	};
	
	var control;
	for(var key in measureControls) {
		control = measureControls[key];
		control.events.on({
			"measure": handleMeasurements,
			"measurepartial": handleMeasurements
		});
		map.addControl(control);
	}
	
	
	
	document.getElementById('noneToggle').checked = true;


function handleMeasurements(event) {
	var geometry = event.geometry;
	var units = event.units;
	var order = event.order;
	var measure = event.measure;
	var element = document.getElementById('output');
	var out = "";
	if(order == 1) {
		out += "measure: " + measure.toFixed(3) + " " + units;
	} else {
		out += "measure: " + measure.toFixed(3) + " " + units + "<sup>2</" + "sup>";
	}
	element.innerHTML = out;
}

function toggleControl(element) {
	for(key in measureControls) {
		var control = measureControls[key];
		if(element.value == key && element.checked) {
			control.activate();
		} else {
			control.deactivate();
		}
	}
}

function toggleGeodesic(element) {
	for(key in measureControls) {
		var control = measureControls[key];
		control.geodesic = element.checked;
	}
}

function toggleImmediate(element) {
	for(key in measureControls) {
		var control = measureControls[key];
		control.setImmediate(element.checked);
	}
}
