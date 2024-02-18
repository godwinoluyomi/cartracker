import React, { useEffect } from 'react'
import { Col, Row, Avatar, Card, Skeleton, Switch } from 'antd';
import { fetchAllPath, selectVehiclePaths } from '../redux/pathSlice';
import { useDispatch, useSelector } from 'react-redux';
import VehicleCard from '../components/VehicleCard';

const { Meta } = Card;

const Vehicles = () => {

    const dispatch = useDispatch();
    const vehiclePaths = useSelector(selectVehiclePaths);

    const vehicleIds = [...new Set(vehiclePaths.map(item => item.vehicle_id))];

    console.log(vehicleIds);

    useEffect(() => {
        dispatch(fetchAllPath());
    }, []);

    return (
        <>
            <Row className=' mt-10'>
                <Col xs={{ span: 22, offset: 1 }} sm={{ span: 20, offset: 2 }} md={{ span: 16, offset: 4 }} lg={{ span: 16, offset: 4 }} xl={{ span: 16, offset: 4 }}>

                    <Row gutter={16}>

                        {vehicleIds.map(vehicleId => (<VehicleCard key={vehicleId} vehicle_id={vehicleId} />))}

                    </Row>
                </Col>
            </Row>
        </>
    )
}

export default Vehicles