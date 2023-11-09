import React, { useRef, useState } from "react"
import "./MovieSection.css"









function MovieSection({ title, items }) {


    const addToWatchlist = (movie) => {
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
    const removeFromWatchlist = (movieId) => {
        let watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
        watchlist = watchlist.filter(watchlistMovie => watchlistMovie.id !== movieId);
        localStorage.setItem('watchlist', JSON.stringify(watchlist));
        console.log(watchlist);
    }




    const listRef = useRef(null);
    const [selectedMovie, setSelectedMovie] = useState(null);

    const scrollLeft = () => {
        if (listRef.current)
            listRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    };
    const scrollRight = () => {
        if (listRef.current)
            listRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }

    const selectMovie = (movie) => {
        if (selectedMovie && selectedMovie.id === movie.id) {
            setSelectedMovie(null);
        } else {
            setSelectedMovie(movie);
        }
    }



    return (
        <div className="movieRow">
            <h2>{title}</h2>
            <button className="movieRow--left" onClick={scrollLeft} >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
            </button>
            <button className="movieRow--right" onClick={scrollRight}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>

            </button>
            <div className="movieRow--listarea" ref={listRef}>
                <div className="movieRow--list" >
                    {items.results.length > 0 &&
                        items.results.map((item, key) => (
                            <div className="movieRow--item"
                                key={key}
                                onClick={() => selectMovie(item)}
                            >
                                <img
                                    alt={item.original_title}
                                    src={`https://image.tmdb.org/t/p/w300/${item.poster_path}`}
                                />
                            </div>
                        ))}
                </div>
            </div>
            {selectedMovie && (
                <section className="details"
                    style={{
                        backgroundSize: "cover",
                        backgroundImage: `url(https://image.tmdb.org/t/p/original${selectedMovie.backdrop_path})`,
                        backgroundPosition: "center",
                    }}
                >
                    <div className="details-vertical">
                        <div className="details-horizontal">
                            <div className="details-name">{selectedMovie.original_name || selectedMovie.original_title}</div>
                            <div className="details-info">
                                <div className="details-points">{selectedMovie.vote_average.toFixed(2)}</div>
                                <div className="details-year">{selectedMovie.release_date}</div>
                            </div>
                            <div className="details-description">{selectedMovie.overview}</div>
                            <div className="details-button">
                                {/* <a href="/" className="details-watchbutton">Retirer de la liste</a> */}
                                <button className="details-watchbutton" onClick={(e) => {
                                    e.preventDefault();
                                    removeFromWatchlist(selectedMovie.id);
                                }}>
                                    - Ma liste
                                </button>
                                <button className="details-mylistbutton" onClick={(e) => {
                                    e.preventDefault();
                                    addToWatchlist(selectedMovie);
                                }}>
                                    + Ma liste
                                </button>
                            </div>

                        </div>
                    </div>
                </section>
            )
            }
        </div >
    );
}

export default MovieSection;