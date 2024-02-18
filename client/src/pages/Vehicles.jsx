import React, { useEffect } from 'react'
import { Col, Row, Avatar, Card, Skeleton, Switch } from 'antd';
import { fetchAllPath, selectVehiclePaths } from '../redux/pathSlice';
import { useDispatch, useSelector } from 'react-redux';
import VehicleCard from '../components/VehicleCard';

const { Meta } = Card;

const Vehicles = () => {

    const dispatch = useDispatch();
    const vehiclesPaths = useSelector(selectVehiclePaths);

    const vehicleIds = [...new Set(vehiclesPaths.map(item => item.vehicle_id))];

    // console.log(vehicleIds);

    useEffect(() => {
        dispatch(fetchAllPath());
    }, []);

    return (
        <>
            <Row gutter={16} className=' mt-10'>

                {vehicleIds.map(vehicleId => (<VehicleCard key={vehicleId} vehicle_id={vehicleId} />))}

            </Row>
        </>
    )
}

export default Vehicles