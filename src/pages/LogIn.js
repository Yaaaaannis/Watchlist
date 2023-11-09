import React, { useState } from 'react';
import './LogIn.css';
import { Helmet } from 'react-helmet'
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';








const LogIn = () => {

    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();






    const navigateToNextPage = () => {
        setIsLoading(true);
        setTimeout(() => {
            navigate('/home');
            setIsLoading(false);
        }, 2000);
    }
    if (isLoading) {
        return <Loading />;
    }



    return (
        <div className='logInPage'>
            <Helmet>
                <style>
                    {`
                        body {
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            text-align:center;
                            background-image: url(./img/netflix-collection.jpg); /* Remplacez URL_DE_VOTRE_IMAGE_ICI par l'URL de votre image */
                            background-size: cover; /* Couvre tout l'écran avec l'image, sans répétition */                       
                            background-repeat: no-repeat; /* Empêche l'image de se répéter */
                        }
                    `}
                </style>
            </Helmet>
            <div className='logInContainer'>
                <div className='logInLogo'>
                    <img src='./img/netflix-avatar.png' alt='logo' />
                </div>
                <button className='logInBtn' onClick={navigateToNextPage}>Log To Join</button>




            </div>

        </div>
    );
}

export default LogIn;
