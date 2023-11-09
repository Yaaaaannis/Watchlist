import React from 'react';
import "./FeaturedMovie.css"







function FeaturedMovie({ films }) {


    const addToWatchlist2 = (movie) => {
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
    const removeFromWatchlist2 = (movieId) => {
        let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
        watchlist = watchlist.filter(watchlistMovie => watchlistMovie && watchlistMovie.id !== movieId);
        localStorage.setItem('watchlist', JSON.stringify(watchlist));
        console.log(watchlist);
    };
    console.log("film", films);
    let genres = []
    for (let genre of films.genres) {
        genres.push(genre.name)
    }
    return (
        <section className="featured"
            style={{
                backgroundSize: "cover",
                backgroundImage: `url(https://image.tmdb.org/t/p/original${films.backdrop_path})`,
                backgroundPosition: "center",
            }}>
            <div className='featured--vertical'>
                <div className='featured--horizontal'>
                    <div className='featured--name'>
                        {films.title}</div>
                    <div className='featured--info'>
                        <div className='featured--points'>{films.vote_average.toFixed(2)}</div>
                        <div className='featured--year'>{films.release_date}</div>
                    </div>
                    <div>
                        <div className='featured--description' >{films.overview}</div>
                        <div className='featured--button'>
                            <button className='featured--removebutton' onClick={() => removeFromWatchlist2(films)}>
                                - Ma Liste
                            </button>
                            <button className='featured--mylistbutton' onClick={() => addToWatchlist2(films)}>
                                + Ma Liste
                            </button>

                        </div>
                        <div className='featured--genres'>
                            <strong>Genres :</strong> {genres.join(', ')}

                        </div>
                    </div>
                </div>
            </div>

        </section >
    )
}

export default FeaturedMovie;