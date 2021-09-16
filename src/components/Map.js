import React, { useEffect, useRef, useState } from 'react';
import '../css/map.css';
import { loadModules } from 'esri-loader';

function EsriMap() {
    const mapRef = useRef();

    // Local state
    const [mapViewInstance, setMapViewInstance] = useState(null);
    const [mapInstance, setMapInstance] = useState(null); 

    useEffect(
      () => {
        if(mapViewInstance === null && mapInstance === null){ //Only trigger once
          console.log("Map triggered")
          // lazy load the required ArcGIS API for JavaScript modules and CSS
          loadModules(
            [
              'esri/Map',
              'esri/views/MapView',
              "esri/WebMap"
            ], { css: true })
          .then((
            [
              ArcGISMap,
              MapView,
              WebMap           
            ]) => {

            const map = new WebMap({
              portalItem: {
                  id: "4c8909c2462d4dff8549ee407007cd83" //Test agol-kart 
              }
            });
           
            setMapInstance(map);

            const view = new MapView({
              container: mapRef.current,
              map: map,
              center: [-118, 34],
              zoom: 8
            });

            view.ui.move("zoom", "bottom-right");

            view.when(function () {                            
              
            });

            setMapViewInstance(view);
            
            return () => {
              if (view) {

                // destroy the map view
                view.container = null;
              }
            };
          });
        }
      }, [mapViewInstance, mapInstance]);


  const toggle = (mapInstance) => {
    var basemapIsBilder = !document.getElementById("basemapToggle").classList.contains("basemapToggleBilder");
    document.getElementById("basemapToggle").classList.toggle("basemapToggleBilder");
    if (basemapIsBilder) {
        document.getElementById("basemapToggleText").innerHTML = "Fargekart";
    }
    else {
        document.getElementById("basemapToggleText").innerHTML = "Flyfoto";
    }
    if(mapInstance){ //Crash prevention
        for (var i=0; i<mapInstance.allLayers.items.length; i++) {
            var layer = mapInstance.allLayers.items[i]
            if (basemapIsBilder) {
                if (layer.id.indexOf("GeocacheBilder") > -1) {
                    layer.visible = true;
                }
                if (layer.id.indexOf("GeocacheBasis") > -1) {
                    layer.visible = false;
                }
            }
            else {
                if (layer.id.indexOf("GeocacheBilder") > -1) {
                    layer.visible = false;
                }
                if (layer.id.indexOf("GeocacheBasis") > -1) {
                    layer.visible = true;
                }
            }
        }
    }
};

  return (
      <div className="kartdiv">
        <div className="webmap" ref={mapRef}>      
          {/* <Search /> */}
          {/* <div id="mousefollowinfo" style={{display: 'none'}}>Mousefollowertext</div> */}
        </div>
        <div id="basemapToggle" className="basemapToggle" onClick={() => {toggle(mapInstance)}}>
          <div id="basemapToggleText" className="basemapToggleText">Flyfoto</div>
        </div>
      </div>

  );


}

export default EsriMap;
