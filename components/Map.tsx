'use client'

import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

// Add your Mapbox access token here
mapboxgl.accessToken = 'pk.eyJ1IjoidWFza2VkNGRhdCIsImEiOiJjbHpjMXlnMWIwOHBwMmxzNmk0ZWxmb2VzIn0.k9D6pWwGpyucKMroxp6R2A';

const Map = () => {
    const mapContainer = useRef(null);
    const map = useRef(null);
  
    useEffect(() => {
      if (map.current) return; // initialize map only once
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/dark-v11',
        center: [-74.5, 40],
        zoom: 9
      });
    }, []);
  
    return <div ref={mapContainer} className="w-full h-full"/>;
  };

export default Map;