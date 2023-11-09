import React, { useEffect, useState } from 'react';
import Header from './Header';
import './Watchlist.css';


const Watchlist = () => {


    const [selectedMovie, setSelectedMovie] = useState(null);
    const [watchlist, setWatchlist] = useState([]);


    const removeFromWatchlist = (movieId) => {
        let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
        watchlist = watchlist.filter(watchlistMovie => watchlistMovie.id !== movieId);
        localStorage.setItem('watchlist', JSON.stringify(watchlist));
        console.log(watchlist);
        setWatchlist(watchlist);
    }


    useEffect(() => {
        const storedWatchlist = JSON.parse(localStorage.getItem('watchlist'));
        if (storedWatchlist) {
            setWatchlist(storedWatchlist);
        }
    }, []);




    return (
        <div className="watchlist">
            <Header />
            <div className='intro'><h2>Ma Watchlist</h2></div>
            <div className="watchlist-content">
                {watchlist.length > 0 ? (
                    watchlist.map((movie, index) => (
                        <div key={index} className="watchlist-item">
                            <img
                                src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
                                alt={movie.title || movie.original_title}
                            />
                            <div className="movie-info">
                                <div className='movie-title'><h3>{movie.title || movie.original_title}</h3></div>
                                <div className='overview'>{movie.overview}</div>
                                <div className='movie-date'>{movie.release_date}</div>
                                <div className='movie-point'>{movie.vote_average.toFixed(2)}</div>
                            </div>
                            <div className='watchlistbutton'>
                                <button className="details-watchbutton" onClick={(e) => {
                                    e.preventDefault();
                                    removeFromWatchlist(movie.id);
                                }}>
                                    - Ma liste
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Aucun film dans la watchlist.</p>
                )}
            </div>
        </div >
    );
}

export default Watchlist;
