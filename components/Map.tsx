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
        zoom: 3 // Initial map zoom level (reduced to show more area)
      });

      // Add multiple markers
      const markers = [
        { lngLat: [-74.5, 40], color: "#FF0000" },    // New York (red)
        { lngLat: [-122.4194, 37.7749], color: "#00FF00" }, // San Francisco (green)
        { lngLat: [-87.6298, 41.8781], color: "#0000FF" },  // Chicago (blue)
        { lngLat: [-95.3698, 29.7604], color: "#FFFF00" },  // Houston (yellow)
      ];

      markers.forEach(({ lngLat, color }) => {
        new mapboxgl.Marker({ color })
          .setLngLat(lngLat as [number, number])
          .addTo(map.current);
      });

    }, []); // Empty dependency array ensures this effect runs only once
  
    return <div ref={mapContainer} className="w-full h-full"/>; // Map container div
};

export default Map; 