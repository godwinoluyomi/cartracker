import React, { useEffect, useState } from 'react'
import { Col, Row, Badge, Descriptions, Button } from 'antd';
import { fetchAllPath } from '../redux/pathSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleLeft, faAngleLeft } from '@fortawesome/free-solid-svg-icons';

const items = [
    {
        key: '1',
        label: 'Type',
        children: 'Official Car',
    },
    {
        key: '2',
        label: 'Assigned',
        children: 'Managing Director',
        span: 2,
    },
    {
        key: '3',
        label: 'Number Plate',
        children: 'RSH 222 XS',
    },
    {
        key: '4',
        label: 'Driver',
        children: 'Aminu Bolade Eze',
        span: 2,
    },
    {
        key: '5',
        label: 'Serviceablity Status',
        children: <Badge status="processing" text="Active" />,
    },
    {
        key: '6',
        label: 'Total Mileage',
        children: '148,356 Km',
        span: 2
    },
    {
        key: '8',
        label: 'Vehicle Info',
        children: (
            <>
                Model: Toyota Camry
                <br />
                Year: 2017
                <br />
                Colour: Black
                <br />
                Fuel Type: PMS
                <br />
                Tint Glass: No
                <br />
            </>
        ),
        span: 3,
    },
];

const Location = ({ vehicle_id }) => {

    const dispatch = useDispatch();

    // console.log(import.meta.env.VITE_GOOGLE_MAPS_API_KEY);
    // console.log(getPathData());

    useEffect(() => {
        dispatch(fetchAllPath());
    }, []);

    return (
        <>
            <div className=' mt-3'>
                <Link to={'/'}> <Button className=' bg-gray-900 text-white mb-5'><FontAwesomeIcon icon={faAngleLeft} className='mr-2' /> Back </Button></Link>
                <Descriptions title="RSH 222 XS" bordered items={items} />
            </div>
        </>
    )
}

export default Location