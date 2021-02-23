import React, { useEffect, useState } from 'react';
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow';

export default () => {
  // Salva a lista que vai ser exibida
  const [movieList, setMovieList] = useState([]);

  // Passa ao carregar a página
  useEffect(() => {
    const loadAll = async () => {
      // Pegando a lista Total
      let list = await Tmdb.getHomeList();
      setMovieList(list);
    };

    loadAll();
  }, []);

  return (
    <div className="page">
      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow ket={key}></MovieRow>
        ))}
      </section>
      Header Destaque As listas Rodapé basicão
    </div>
  );
};
