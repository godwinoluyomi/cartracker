import React from 'react'
import { Empty, Button } from 'antd';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <>
            <div className='h-screen flex items-center justify-center'>
                <div className='text-center'>

                    <img src='/images/logo.png' className='my-5 w-52 mx-auto' />

                    <p className=' text-black text-9xl font-black mb-3'> 404 </p>
                    <p className=' text-red-800 text-3xl mb-7'> Page Not Found </p>
                    <Link to={'/'}>
                        <Button type="primary" className="tmButtonPrimary mb-7 login-form-button" size='large'>
                            Back Home
                        </Button>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default NotFound