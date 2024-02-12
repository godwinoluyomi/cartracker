import React from 'react'
import { Layout } from 'antd';
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
            <img src='./images/logowhite.png' className='logoAdjust ' />
        </Header>
    )
}

export default NavBar