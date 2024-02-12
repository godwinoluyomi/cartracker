import React, { useEffect, useState } from 'react'
import { Col, Row } from 'antd';
import axios from 'axios';

const Location = () => {

    const getPathData = () => {
        axios
            .get("https://vestgas.com/airforce/output.php", {
                params: {
                    api_key: "632151225g!$",
                },
            })
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
    }

    useEffect(() => {
        getPathData();


    }, []);

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