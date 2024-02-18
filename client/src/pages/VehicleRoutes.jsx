import React, { useEffect, useState } from 'react';
import { Col, Row, Breadcrumb, Layout, Menu, Button, theme } from 'antd';
import { fetchSinglePath, selectVehiclePaths } from '../redux/pathSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAlignLeft, faAlignRight, faCalendarDay, faEllipsis, faMinus } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { APIProvider, Map, Marker, useMap, useMapsLibrary } from '@vis.gl/react-google-maps';

const { Header, Content, Footer, Sider } = Layout;

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
    const position = { lat: 9.059657, lng: 7.403067 };

    const [collapsed, setCollapsed] = useState(false);
    const [current, setCurrent] = useState();

    const dispatch = useDispatch();
    const { vehicleId } = useParams();
    const vehiclePaths = useSelector(selectVehiclePaths);

    // Step 1: Extract dates and remove duplicates
    const uniqueDates = [...new Set(vehiclePaths.map(item => item.created_at.split(' ')[0]))];

    // Step 2: Format dates into the desired format
    const formattedDates = uniqueDates.map(date => {
        const [year, month, day] = date.split('-');
        const formattedDate = new Date(`${year}-${month}-${day}`).toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: '2-digit' });

        return {
            key: date,
            label: formattedDate,
            // icon: <FontAwesomeIcon icon={faMinus} />,
        };
    }).sort((a, b) => new Date(b.key) - new Date(a.key));

    // Menu Click Events
    const handleClickMenu = (e) => {
        const menuItem = e.key;
        setCurrent(menuItem);
        // console.log('click ', e);
    }

    useEffect(() => {
        dispatch(fetchSinglePath({ vehicleId }));
    }, []);

    // Filter with selected dates
    const vehiclePathsDate = vehiclePaths.filter(item => item.created_at.includes(current));

    // Build waypoint object from vahiclepathdate
    const waypoints = vehiclePathsDate.map(item => ({
        location: {
            lat: parseFloat(item.latitude),
            lng: parseFloat(item.longitude)
        },
        stopover: false
    }));

    // console.log(waypoints);
    // console.log(vehiclePathsDate);

    // console.log(formattedDates);

    return (
        <>
            <Layout
                style={{
                    padding: '24px 0',
                    background: '#fff',
                    borderRadius: '3px',
                }}
            >
                <Sider trigger={null} collapsible collapsed={collapsed}
                    style={{
                        background: '#e6e6e6',
                        overflow: 'auto',
                        // height: '100vh',
                        position: 'fixed',
                        left: 0,
                        // top: 70,
                        bottom: 0,
                    }}
                    width={200}
                >
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={current}
                        defaultOpenKeys={['sub1']}
                        onClick={handleClickMenu}
                        style={{
                            height: '100%',
                        }}
                        items={formattedDates}
                    />
                </Sider>
                <Button
                    type="text"
                    icon={collapsed ? <FontAwesomeIcon icon={faAlignRight} /> : <FontAwesomeIcon icon={faAlignLeft} />}
                    onClick={() => setCollapsed(!collapsed)}
                    style={{
                        fontSize: '16px',
                        width: 70,
                        height: 45,
                        position: 'fixed',
                        left: 6,
                        top: 70,
                        // bottom: 0,
                    }}
                />
                <Content
                    style={{
                        padding: '0 24px',
                        minHeight: 280,
                    }}
                >

                    <div style={{ height: "90vh", width: "100%" }}>
                        <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
                            <Map defaultZoom={15} defaultCenter={position} mapId={import.meta.env.VITE_GOOGLE_MAPS_MAP_ID} fullscreenControl={false}>

                                {current ? <Directions waypointsProp={waypoints} /> : <Marker position={position} />}

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

    console.log(waypointsPropSlim);
    console.log(startPoint);

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
    // console.log(waypts);

    useEffect(() => {
        if (!routesLibrary || !map) return;

        setDirectionsService(new routesLibrary.DirectionsService());
        setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));

    }, [routesLibrary, map, waypointsProp]);

    useEffect(() => {
        if (!directionsService || !directionsRenderer) return;

        directionsService.route({
            origin: startPoint ? startPoint : { lat: 9.060943, lng: 7.403181 },
            destination: endPoint ? startPoint : { lat: 9.064525, lng: 7.472856 },
            waypoints: waypointsPropSlim,
            travelMode: google.maps.TravelMode.DRIVING,
            provideRouteAlternatives: true,
        }).then(response => {
            directionsRenderer.setDirections(response);
            setRoutes(response.routes);
        });

    }, [directionsService, directionsRenderer, waypointsProp]);

    return null;
}