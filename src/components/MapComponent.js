import React, { useEffect, useRef } from "react";

const MapComponent = ({ path, currentPosition }) => {
    const mapRef = useRef(null);
    const googleMapRef = useRef(null);
    const markerRef = useRef(null);
    const polylineRef = useRef(null);

    const initializeMap = () => {
        googleMapRef.current = new window.google.maps.Map(mapRef.current, {
            zoom: 4,
            center: path.length > 0 ? { lat: path[0].lat, lng: path[0].lng } : { lat: 0, lng: 0 },
        });
    };

    useEffect(() => {
        if (!googleMapRef.current) {
            initializeMap();
        }
    });

    useEffect(() => {
        if (path.length > 0) {
            const bounds = new window.google.maps.LatLngBounds();
            path.forEach(({ lat, lng }) => bounds.extend({ lat, lng }));
            googleMapRef.current.fitBounds(bounds);
        }
        updatePolyline();
    });

    useEffect(() => {
        updateMarker();
    });

    const updateMarker = () => {
        if (!currentPosition || !googleMapRef.current) return;

        if (!markerRef.current) {
            markerRef.current = new window.google.maps.Marker({
                position: currentPosition,
                map: googleMapRef.current,
                title: "Drone Position",
                icon: {
                    url: "/drone.png",
                    scaledSize: new window.google.maps.Size(50, 50),
                },
            });
        } else {
            markerRef.current.setPosition(currentPosition);
        }
    };

    const updatePolyline = () => {
        if (!path.length || !googleMapRef.current) return;

        if (!polylineRef.current) {
            polylineRef.current = new window.google.maps.Polyline({
                path: path.map(({ lat, lng }) => ({ lat, lng })),
                geodesic: true,
                strokeColor: "#FF0000",
                strokeOpacity: 1.0,
                strokeWeight: 2,
            });
            polylineRef.current.setMap(googleMapRef.current);
        } else {
            polylineRef.current.setPath(path.map(({ lat, lng }) => ({ lat, lng })));
        }
    };

    return <div ref={mapRef} style={{ height: "80vh", width: "100%" }} />;
};

export default MapComponent;
