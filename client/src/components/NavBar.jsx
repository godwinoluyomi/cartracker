import React from 'react'
import { Layout } from 'antd';
import { Link } from 'react-router-dom';
const { Header, Footer } = Layout;

const NavBar = () => {
    return (
        <Header className='place-content-center '
            style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'black'
            }}
        >
            <img src='../images/logowhite.png' className=' h-2/3 w-auto' />
        </Header>
    )
}

export default NavBar