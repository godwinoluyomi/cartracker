import React from 'react'
import { Col, Row, Card, Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faMapMarked, faMapMarkedAlt, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
const { Meta } = Card;

const VehicleCard = ({ vehicle_id }) => {
    return (
        <>
            <Col xs={{ span: 12 }} sm={{ span: 12 }} md={{ span: 8 }} lg={{ span: 6 }} xl={{ span: 6 }}>
                <Card
                    bordered={false}
                    cover={
                        <img
                            alt="example"
                            src="./images/app_vehicle.png"
                        />
                    }
                    actions={[
                        <Link to={`/history/${vehicle_id}`}> <FontAwesomeIcon icon={faMapMarkedAlt} size='lg' /></Link>,
                        <Link to={`/details/${vehicle_id}`}><FontAwesomeIcon icon={faBars} size='lg' /></Link>,
                    ]}>

                    <Meta
                        title="RSH 222 XS"
                        description="Driver: Aminu Bolade Eze"
                    />
                </Card>
            </Col>
        </>
    )
}

export default VehicleCard