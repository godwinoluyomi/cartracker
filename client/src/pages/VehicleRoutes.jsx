import React, { useEffect, useState } from 'react';
import { Col, Row, Breadcrumb, Layout, Menu, Button, theme } from 'antd';
import { fetchSinglePath, selectVehiclePaths } from '../redux/pathSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignLeft, faAlignRight, faCalendarDay, faEllipsis, faMinus, faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { APIProvider, Map, Marker, useMap, useMapsLibrary } from '@vis.gl/react-google-maps';

const { Header, Content, Footer, Sider } = Layout;


const formatDate = (dateString) => {
    const dateParts = dateString.split('-');
    const year = dateParts[0].slice(-2); // Extract last two digits of the year
    const month = new Date(`${dateParts[0]}-${dateParts[1]}-${dateParts[2]}`).toLocaleDateString('en-GB', { month: 'short' });
    const day = parseInt(dateParts[2], 10); // Convert day to integer to remove leading zero

    return `${day} ${month} ${year}`;
};

/* const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map((icon, index) => {
    const key = String(index + 1);
    return {
        key: `sub${key}`,
        icon: React.createElement(icon),
        label: `subnav ${key}`,
        children: new Array(4).fill(null).map((_, j) => {
            const subKey = index * 4 + j + 1;
            return {
                key: subKey,
                label: `option${subKey}`,
            };
        }),
    };
}); */


const VehicleRoutes = () => {

    const dispatch = useDispatch();
    const { vehicleId, pathDate } = useParams();
    const vehiclePaths = useSelector(selectVehiclePaths);

    // Filter with selected dates
    const vehiclePathsDate = vehiclePaths.filter(item => item.created_at.includes(pathDate));

    // Remove objects with the same longitude and latitude as the one before it i.e parked car
    for (let i = 1; i < vehiclePathsDate.length; i++) {
        // Compare longitude and latitude with the previous object
        if (
            vehiclePathsDate[i].latitude === vehiclePathsDate[i - 1].latitude &&
            vehiclePathsDate[i].longitude === vehiclePathsDate[i - 1].longitude
            // || vehiclePathsDate[i].speed == 0
        ) {
            // Remove the current object if longitude and latitude match the previous one
            vehiclePathsDate.splice(i, 1);
            // Decrement the index to account for the removed object
            i--;
        }
    }


    // Build waypoint object from vahiclepathdate
    const waypoints = vehiclePathsDate.map(item => ({
        location: {
            lat: parseFloat(item.latitude),
            lng: parseFloat(item.longitude)
        },
        stopover: false
    }));

    const defaultPosition = waypoints[0].location;

    useEffect(() => {
        dispatch(fetchSinglePath({ vehicleId }));
    }, []);

    console.log(vehiclePathsDate);
    // console.log(waypoints);
    // console.log(pathDate, vehicleId, defaultPosition);

    return (
        <>
            <Layout
                style={{
                    background: '#fff',
                    borderRadius: '3px',
                }}

                className='mt-3 mb-10'
            >
                <div className=' flex mb-5'>
                    <Link to={`/history/${vehicleId}`}> <Button className=' bg-gray-900 text-white mr-10'><FontAwesomeIcon icon={faAngleLeft} className='mr-2' /> Back </Button></Link>
                    <div className=' text-lg mr-10'> Number Plate: <span className=' font-bold'> RSH 222 XS </span> </div>
                    <div className=' text-lg mr-10'>Date: <span className=' font-bold'> {formatDate(pathDate)}  </span></div>
                </div>
                <Content
                    style={{
                        // padding: '0 24px',
                        minHeight: 280,
                    }}
                >

                    <div style={{ height: "90vh", width: "100%" }}>
                        <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
                            <Map defaultZoom={15} defaultCenter={defaultPosition} mapId={import.meta.env.VITE_GOOGLE_MAPS_MAP_ID} fullscreenControl={false}>
                                {/* <Marker position={defaultPosition} /> */}
                                <Directions waypointsProp={waypoints} />

                            </Map>
                        </APIProvider>
                    </div>
                    {/* {vehiclePathsDate?.map((vehiclePathDate) => <p key={vehiclePathDate.id}> {...vehiclePathDate.latitude} {...vehiclePathDate.longitude} </p>)} */}

                </Content>
            </Layout>
            {/* <FontAwesomeIcon icon={faEnvelope} /> */}


        </ >
    )
}

export default VehicleRoutes


function Directions({ waypointsProp }) {

    // Select the first object
    let startPoint = waypointsProp[0].location;
    let endPoint = waypointsProp[waypointsProp.length - 1].location;

    // Select 19 to 22 objects at equal object number spacing
    let waypointsPropSlim;
    const spacing = Math.ceil(waypointsProp.length / 22); // Calculate spacing

    if (waypointsProp.length <= 22) {
        waypointsPropSlim = waypointsProp;
    } else {
        // Otherwise, select 22 objects with equal spacing
        waypointsPropSlim = waypointsProp.filter((_, index) => index % spacing === 0).slice(0, 22);
    }

    // console.log(waypointsPropSlim);

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
            origin: startPoint ? startPoint : { lat: 9.060943, lng: 7.403181 },
            destination: endPoint ? startPoint : { lat: 9.064525, lng: 7.472856 },
            waypoints: waypointsPropSlim,
            travelMode: google.maps.TravelMode.DRIVING,
            // provideRouteAlternatives: true,
        }).then(response => {
            directionsRenderer.setDirections(response);
            setRoutes(response.routes);
        });

    }, [directionsService, directionsRenderer]);

    return null;
}