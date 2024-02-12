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

    useEffect(() => {
        if (!routesLibrary || !map) return;

        setDirectionsService(new routesLibrary.DirectionsService());
        setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));

    }, [routesLibrary, map]);

    useEffect(() => {
        if (!directionsService || !directionsRenderer) return;

        directionsService.route({
            origin: "75 Aminu Kano Cresent, Wuse 2, Abuja",
            destination: "Old parade ground, Garki, Abuja",
            travelMode: google.maps.TravelMode.DRIVING,
            provideRouteAlternatives: true,
        }).then(response => {
            directionsRenderer.setDirections(response);
            setRoutes(response.routes);
        });

    }, [directionsService, directionsRenderer]);

    return null;
}