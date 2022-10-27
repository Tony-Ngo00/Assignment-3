let response = axios.get("https://api.themoviedb.org/3/search/movie", {
  params: {
    api_key: "779ebe30f392f779f18a739e5df2f414",
    include_adult: "false",
  }
});

response = response.then((moviesData) => {
  for (let movie of moviesData.data.results) {   
    axios.get(`https://api.themoviedb.org/3/movie/${movie.id}`, {
      params: {
        api_key: "779ebe30f392f779f18a739e5df2f414",
        append_to_response: "videos",
      }
    }).then((movieData) => {
      const img = document.createElement('img');
      const p = document.createElement('p');
      const iframe = document.createElement('iframe');

      const trailers = movieData.data.videos.results.filter((trailer) => trailer.type === "Trailer");
      iframe.src = `https://www.youtube.com/embed/${trailers.at(0).key}`
      img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
      p.innerHTML = `${movie.title} -- ${movie.release_date} -- ${movie.popularity}`;
      
      document.body.append(p);
      document.body.append(img);
      document.body.append(iframe);
    });
  }
});