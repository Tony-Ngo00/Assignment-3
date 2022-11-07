function selectOption() {
  for (let x = 0; x < 10; x++) {
    if (document.getElementById("Movies").selectedIndex == x) {
      return document.getElementById("Movies").value
    }
  }
};

button.addEventListener('click', async () => {

  let response = axios.get("https://api.themoviedb.org/3/search/movie", {
    params: {
      api_key: "779ebe30f392f779f18a739e5df2f414",
      include_adult: "false",
      query: selectOption(),
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

        const info = document.getElementById('info');
        const overviewLabel = document.getElementById('overviewLabel');
        const overviewText = document.getElementById('overviewText');
        const cover = document.getElementById('cover');
        const video = document.getElementById('video');

        const display = document.getElementById('display');
        display.removeAttribute('hidden')

        const trailers = movieData.data.videos.results.filter((trailer) => trailer.type === "Trailer");
        video.src = `https://www.youtube.com/embed/${trailers.at(0).key}`
        cover.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        info.innerHTML = `${movie.title} <br> Genre: ${movie.genre} <br> Release Date: ${movie.release_date} <br> Popularity: ${movie.popularity} <br> Revenue: $${movie.revenue} <br> Vote Average: ${movie.vote_average} <br> Vote Count: ${movie.vote_count}`;
        overviewLabel.innerHTML = "Overview";
        overviewText.innerHTML = `${movie.overview}`;
      });
    }
  });
});

