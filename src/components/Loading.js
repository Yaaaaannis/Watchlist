import React from 'react';
import './Loading.css';
import { Helmet } from 'react-helmet'

const Loading = () => {
    return (
        <div className='loading-container'>
            <Helmet>
                <style>
                    {`
                        body {
                            
                            background-color:#111 !important;
                            text-align:center;
                        }
                    `}
                </style>
            </Helmet>
            <span className="loader"></span>
            <p className='text-loader'>Loading...</p>
        </div>
    );
}

export default Loading;
