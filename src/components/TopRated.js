import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


const TopRated = () => {
    const [topRated, setTopRated] = useState([]);
    const { type } = useParams();

    useEffect(() => {
        getData();
    }, [type]); // Ce hook s'exécutera au montage et chaque fois que `type` change

    const getData = async () => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NTc1Y2I4NGQ5Yjg1OTY4OTkwZWZhY2U3MmU2NmM3MiIsInN1YiI6IjYzMWYyNWEyMGQyZjUzMDA3ZjVkYTFmYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7b2UV645Qs8sinDgQEjh6VgnSnMh8ETFyGtnip3lxRU'
            }
        };

        try {
            const response = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options);
            const data = await response.json();
            setTopRated(data.results); // Mettre à jour l'état avec les films récupérés
            console.log(data.results)
        } catch (err) {
            console.error(err); // Log des erreurs s'il y en a
        }


    }
    const [currentPage, setCurrentPage] = useState(0);
    const moviesPerPage = 3;

    const pageCount = Math.ceil(topRated.length / moviesPerPage);

    const nextPage = () => {
        setCurrentPage((prev) => (prev < pageCount - 1 ? prev + 1 : prev));
    };
    const prevPage = () => {
        setCurrentPage((prev) => (prev > 0 ? prev - 1 : prev));
    };

    const currentMovies = topRated.slice(
        currentPage * moviesPerPage,
        (currentPage + 1) * moviesPerPage
    )








    return (
        <div className='movie-container'>
            <h2 className='list-title'>{type ? type.toUpperCase() : 'Top Rated'}</h2>
            <ul className='movie-list'>
                {currentMovies.map(movie => (
                    <li className='movie-item' key={movie.id}>
                        <h3 className='movie-title'>{movie.title}</h3>
                        <img className='movie-poster'
                            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                            alt={movie.title}
                        />
                        <p className='movie-release-date'>{movie.release_date}</p>
                        <p className='movie-vote-average'>Rating: {movie.vote_average}</p>
                        <p className='movie-overview'>{movie.overview}</p>

                    </li>
                ))}
            </ul>
            <div className='pagination-buttons'>
                <button onClick={prevPage} disabled={currentPage === 0}><img src='./img/previous.png' alt="previous"></img></button>
                <button onClick={nextPage} disabled={currentPage === pageCount - 1}>
                    <img src='./img/next.png' alt="next"></img>
                </button>
            </div>
        </div>
    );
}

export default TopRated;
