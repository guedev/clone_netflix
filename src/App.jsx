import React, { useEffect, useState } from "react";
import Tmdb from "./Tmdb";
import "./App.css";
import MovieRow from "./components/MovieRow";
import FeaturedMovie from "./components/FeaturedMovie";
import Header from "./components/Header";
import LogoReact from "./assets/images/react.png";

export default () => {
  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(() => {
    const loadAll = async () => {
      //lista com todos os conteudos
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      //Conteúdo em destaque
      let originals = list.filter((i) => i.slug === "originals");
      let randomChosen = Math.floor(
        Math.random() * (originals[0].items.results.length - 1)
      );
      let chosen = originals[0].items.results[randomChosen];
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, "tv");

      setFeaturedData(chosenInfo);
    };

    loadAll();
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    };
    window.addEventListener("scroll", scrollListener);
    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  }, []);

  return (
    <div className="page">
      <Header black={blackHeader} />

      {featuredData && <FeaturedMovie item={featuredData} />}

      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow ky={key} title={item.title} items={item.items} />
        ))}
      </section>

      <footer>
        Interface desenvolvida utilizando ReactJs <img src={LogoReact}></img><br/>
        Todos os direitos de imagem reservados para <a href="https://www.netflix.com/br/" target="_blank">Netflix</a><br/>
        Dados retirados do site <a href="https://www.themoviedb.org" target="_blank">themoviedb.org</a>
      </footer>
    </div>
  );
};
