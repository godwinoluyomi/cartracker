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
            <Link to={'/'}><img src='../images/logowhite.png' className='logoAdjust ' /></Link>
        </Header>
    )
}

export default NavBar