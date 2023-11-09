
import { useEffect, useState } from "react"
import ApiMovie from "../components/ApiMovie"
import MovieSection from "../components/MovieSection"
import FeaturedMovie from "../components/FeaturedMovie"
import Header from "../components/Header"





function Home() {




    const [moviesList, setMoviesList] = useState([])
    const [featuredData, setfeaturedData] = useState(null)


    useEffect(() => {
        const loadAllMovies = async () => {
            // Liste de tous les films
            let list = await ApiMovie.getHomeMovies()
            setMoviesList(list)

            // Un seul film à l'affiche
            let originals = list.filter((oneMovie) => oneMovie.slug === "top-rated")

            let chooseRandomMovie = Math.floor(
                Math.random() * (originals[0].items.results.length - 1)
            )
            let chosen = originals[0].items.results[chooseRandomMovie]
            let chosenInfo = await ApiMovie.getyMovieInfo(chosen.id, "movie")
            setfeaturedData(chosenInfo)
        }

        loadAllMovies()
    }, [])



    return (
        <div className="page">
            <Header />
            {featuredData && <FeaturedMovie films={featuredData} />}
            <section className="lists">
                {
                    moviesList.map((item, key) => (
                        <MovieSection key={key} title={item.title} items={item.items} />
                    ))}
            </section>
        </div>
    )

}


export default Home;