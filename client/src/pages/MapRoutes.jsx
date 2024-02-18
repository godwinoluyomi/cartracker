import React, { useEffect, useState } from 'react'
import { APIProvider, Map, Marker, useMap, useMapsLibrary } from '@vis.gl/react-google-maps';

const MapRoutes = () => {
    const position = { lat: 9.059657, lng: 7.403067 };

    // console.log(APIProvider);

    return (
        <div style={{ height: "90vh", width: "100%" }}>
            <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
                <Map defaultZoom={15} defaultCenter={position} mapId={import.meta.env.VITE_GOOGLE_MAPS_MAP_ID} fullscreenControl={false}>
                    <Marker position={position} />
                    <Directions />
                </Map>
            </APIProvider>
        </div>
    )
}

export default MapRoutes

function Directions() {

    const map = useMap();
    const routesLibrary = useMapsLibrary("routes");
    const [directionsService, setDirectionsService] = useState();
    const [directionsRenderer, setDirectionsRenderer] = useState();
    const [routes, setRoutes] = useState([]);

    const waypts = [
        { location: { lat: 9.064525, lng: 7.472856 }, stopover: false, },
        { location: { lat: 9.064636, lng: 7.472753 }, stopover: false, },
        { location: { lat: 9.064661, lng: 7.472709 }, stopover: false, },
        { location: { lat: 9.064632, lng: 7.472780 }, stopover: false, },
        { location: { lat: 9.064642, lng: 7.472791 }, stopover: false, },
        { location: { lat: 9.064523, lng: 7.472766 }, stopover: false, },
        { location: { lat: 9.065321, lng: 7.474026 }, stopover: false, },
        { location: { lat: 9.067711, lng: 7.475718 }, stopover: false, },
        { location: { lat: 9.074468, lng: 7.476243 }, stopover: false, },
        { location: { lat: 9.076224, lng: 7.475013 }, stopover: false, },
        { location: { lat: 9.077507, lng: 7.472563 }, stopover: false, },
        { location: { lat: 9.079063, lng: 7.469913 }, stopover: false, },
        { location: { lat: 9.081321, lng: 7.466562 }, stopover: false, },
        { location: { lat: 9.084172, lng: 7.461789 }, stopover: false, },
        { location: { lat: 9.065038, lng: 7.394791 }, stopover: false, },
    ];

    useEffect(() => {
        if (!routesLibrary || !map) return;

        setDirectionsService(new routesLibrary.DirectionsService());
        setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));

    }, [routesLibrary, map]);

    useEffect(() => {
        if (!directionsService || !directionsRenderer) return;

        directionsService.route({
            origin: { lat: 9.064525, lng: 7.472856 },
            destination: { lat: 9.065038, lng: 7.394791 },
            waypoints: waypts,
            travelMode: google.maps.TravelMode.DRIVING,
            provideRouteAlternatives: true,
        }).then(response => {
            directionsRenderer.setDirections(response);
            setRoutes(response.routes);
        });

    }, [directionsService, directionsRenderer]);

    return null;
}