/* eslint-disable import/no-anonymous-default-export */
const API_KEY = process.env.REACT_APP_API_KEY
const API_URL = "https://api.themoviedb.org/3/"
const fetchMovies = async (endpoint) => {
    return await fetch(
        `${API_URL}${endpoint}?language=fr-FR&api_key=${API_KEY}`
    ).then((response) => response.json())
}

export default {
    getHomeMovies: async () => {
        return [
            {
                slug: "top-rated",
                title: "Films mieux notés",
                items: await fetchMovies("movie/top_rated"),
            },
            {
                slug: "trend-allweek",
                title: "Films tendance de la semaine",
                items: await fetchMovies("trending/movie/week"),
            },
            {
                slug: "upcoming",
                title: "Prochaines sorties",
                items: await fetchMovies("movie/upcoming"),
            },
            // {
            //     slug: "nowplaying",
            //     title: "Au cinéma",
            //     items: await fetchMovies("tv/airing_today"),
            // },
            {
                slug: "popular-tv",
                title: "Séries populaires",
                items: await fetchMovies("tv/popular"),
            },
            {
                slug: "tv-toprated",
                title: "Série bien notées",
                items: await fetchMovies("tv/top_rated"),
            },
        ]
    },

    getyMovieInfo: async (movieId, type) => {
        let info = []
        if (movieId) {
            switch (type) {
                case "movie":
                    info = await fetchMovies(`movie/${movieId}`)
                    break
                case "tv":
                    info = await fetchMovies(`tv/${movieId}`)
                    break

                default:
                    break
            }
        }
        return info
    },
}