import React, { useEffect, useState } from 'react'
import { Col, Row } from 'antd';
import axios from 'axios';

const Location = () => {

    // console.log(import.meta.env.VITE_GOOGLE_MAPS_API_KEY);
    // console.log(getPathData());

    return (
        <>
            <Row>
                <Col xs={{ span: 22, offset: 1 }} sm={{ span: 20, offset: 2 }} md={{ span: 16, offset: 4 }} lg={{ span: 16, offset: 4 }} xl={{ span: 16, offset: 4 }}>
                    <p> Helllo </p>
                </Col>
            </Row>
        </>
    )
}

export default Location