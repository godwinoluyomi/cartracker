import React from 'react'
import { Col, Row } from 'antd';
import { Outlet } from 'react-router-dom'
import NavBar from '../components/NavBar'

const DefaultLayout = () => {
    return (
        <>
            <NavBar />

            <Row>
                <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 22, offset: 1 }} lg={{ span: 20, offset: 2 }} xl={{ span: 20, offset: 2 }}>
                    <Outlet />
                </Col>
            </Row>
        </>
    )
}

export default DefaultLayout