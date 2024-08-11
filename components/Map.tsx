'use client' 

import { useEffect, useRef } from "react"; 
import mapboxgl from "mapbox-gl"; 
import "mapbox-gl/dist/mapbox-gl.css"; 

// Mapbox access token.
mapboxgl.accessToken = 'pk.eyJ1IjoidWFza2VkNGRhdCIsImEiOiJjbHpjMXlnMWIwOHBwMmxzNmk0ZWxmb2VzIn0.k9D6pWwGpyucKMroxp6R2A';

// Map component

// Map country/city should be highlighted when a record exists for that date.
// Hover displays lists of profiles within the country.


// General hover over any country shows friends that have been in the country recently.
const Map = () => {
    const mapContainer = useRef(null); // Creating a ref for the map container
    const map = useRef(null); // Creating a ref to store the map instance
  
    useEffect(() => {
      if (map.current) return; // If the map is already initialized, do nothing
      // Initialize the map
      map.current = new mapboxgl.Map({
        container: mapContainer.current, // Reference to the map container
        style: 'mapbox://styles/mapbox/dark-v11', // Map style
        center: [-74.5, 40], // Initial map center [longitude, latitude]
        zoom: 9 // Initial map zoom level
      });

    const marker = new mapboxgl.Marker() // initialize a new marker  
      .setLngLat([-74.5, 40]) // Marker [lng, lat] coordinates  
      .addTo(map.current); // Add the marker to the map
    }, []); // Empty dependency array ensures this effect runs only once
  
    return <div ref={mapContainer} className="w-full h-full"/>; // Map container div
};

export default Map; 