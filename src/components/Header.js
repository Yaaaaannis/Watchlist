import React, { useEffect, useState, useRef } from 'react';
import "./Header.css"
import { Link } from 'react-router-dom';
const API_KEY = process.env.REACT_APP_API_KEY



const Header = () => {
    const [showSearch, setShowSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [movieData, setMovieData] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const modalRef = useRef();



    const addToWatchlist3 = (movie) => {
        let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];

        if (!watchlist.some(watchlistMovie => watchlistMovie.id === movie.id)) {
            watchlist.push(movie);
            localStorage.setItem('watchlist', JSON.stringify(watchlist));
            console.log(watchlist);
        } else {
            watchlist = watchlist.filter(watchlistMovie => watchlistMovie.id !== movie.id);
            localStorage.setItem('watchlist', JSON.stringify(watchlist));
        }
    }
    const removeFromWatchlist3 = (movieId) => {
        let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
        watchlist = watchlist.filter(watchlistMovie => watchlistMovie && watchlistMovie.id !== movieId);
        localStorage.setItem('watchlist', JSON.stringify(watchlist));
        console.log(watchlist);
    };


    const toggleSearch = () => {
        setShowSearch(!showSearch);
    }

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    }


    const handleSearchSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/search/movie?language=fr-FR&api_key=${API_KEY}&query=${encodeURIComponent(searchQuery)}`
            );
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            const firstResult = data.results[0];
            setMovieData(firstResult); // Storing the first result in state
            setShowSearch(true); // Hiding the search bar
            setShowModal(true); // Showing the modal
            setSearchQuery(''); // Clearing the search query
        } catch (error) {
            console.error(error);
        }
    };

    // const fetchMovie = async (query) => {
    //     // Replace with your actual API call or database query
    //     // This is just a placeholder
    //     const response = await fetch(`https://api.themoviedb.org/3/search/movie?language=fr-FR&api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
    //     if (!response.ok) {
    //         throw new Error('Network response was not ok');
    //     }
    //     const data = await response.json();
    //     console.log(data);
    //     const firstResult = data.results[0];
    //     console.log(firstResult);
    //     console.log(firstResult.backdrop_path);
    //     return firstResult; // Or however your data is formatted

    // };


    const closeModal = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            setShowModal(false);
        }
    };
    useEffect(() => {
        document.addEventListener("mousedown", closeModal);
        return () => document.removeEventListener("mousedown", closeModal);
    }, [modalRef]);

    return (
        <header>
            <div className="header-logo">
                <Link to="/home">
                    <img src="https://images.ctfassets.net/4cd45et68cgf/7LrExJ6PAj6MSIPkDyCO86/542b1dfabbf3959908f69be546879952/Netflix-Brand-Logo.png?w=684&h=456" alt="logo" />
                </Link>
            </div>
            <div className="header-buttons">
                <div className='search-button'>
                    <button onClick={toggleSearch}>
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 50 50"
                            style={{ fill: "#FFFFFF" }}>
                            <path d="M 21 3 C 11.621094 3 4 10.621094 4 20 C 4 29.378906 11.621094 37 21 37 C 24.710938 37 28.140625 35.804688 30.9375 33.78125 L 44.09375 46.90625 L 46.90625 44.09375 L 33.90625 31.0625 C 36.460938 28.085938 38 24.222656 38 20 C 38 10.621094 30.378906 3 21 3 Z M 21 5 C 29.296875 5 36 11.703125 36 20 C 36 28.296875 29.296875 35 21 35 C 12.703125 35 6 28.296875 6 20 C 6 11.703125 12.703125 5 21 5 Z"></path>
                        </svg>
                    </button>
                    {showSearch && (
                        <form onSubmit={handleSearchSubmit}>
                            <input
                                type="text"
                                className="search-input"
                                placeholder="Rechercher..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                                name="search" // ajoutez un attribut 'name' pour pouvoir récupérer la valeur facilement
                            />
                            <button type="submit" className="search-submit">
                                Chercher

                            </button>
                        </form>
                    )}


                </div>
                <div className="header-user">
                    <Link to='/home'>
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRel4c26sEwdj81loUzjfgikPTZXdlfHh3MnJAcKP2vkA&s" alt="profil" />
                    </Link>
                </div>
                <div className='header-watchlist'>
                    <Link to='/watchlist' style={
                        {
                            textDecoration: 'none',
                            color: 'black',
                            fontWeight: 'bold',
                            fontSize: '20px',
                        }
                    }>Watchlist</Link>
                </div>
                {showModal && (
                    <div className="modal-background">
                        <div className="modal-content" ref={modalRef}>
                            <img src={`https://image.tmdb.org/t/p/w500/${movieData.poster_path}`} alt="poster" />
                            <div className='details-name'>
                                <h3>{movieData.title}</h3>
                            </div>

                            <div className='modal-description'>
                                <p>{movieData.overview}</p>
                            </div>

                            <div className='details-info'>
                                <div className='detail-year'>{movieData.release_date}</div>
                                <div className='details-points'>{movieData.vote_average.toFixed(2)}</div>
                            </div>
                            <div className='details-button'>
                                <button className='featured--mylistbutton' onClick={() => addToWatchlist3(movieData)}>
                                    + Ma Liste
                                </button>
                                <button className='featured--removebutton' onClick={() => removeFromWatchlist3(movieData.id)}>
                                    - Ma Liste
                                </button>
                            </div>

                            {/* ... additional movie details */}

                        </div>
                    </div>
                )}
            </div>
        </header >
    );
}

export default Header;
