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

        let selectedMovie = movieData.data

        const info = document.getElementById('info');
        const overviewLabel = document.getElementById('overviewLabel');
        const overviewText = document.getElementById('overviewText');
        const cover = document.getElementById('cover');
        const video = document.getElementById('video');

        const display = document.getElementById('display');
        display.removeAttribute('hidden')

        const trailers = selectedMovie.videos.results.filter((trailer) => trailer.type === "Trailer");
        video.src = `https://www.youtube.com/embed/${trailers.at(0).key}`
        cover.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

        let genres = '';
        selectedMovie.genres.forEach(element => {
          genres += element.name + ' ' 
        });

        info.innerHTML = `Title: ${selectedMovie.title} <br> Original Title: ${selectedMovie.original_title} <br> Genre: ${genres} <br> Release Date: ${selectedMovie.release_date} <br> Popularity: ${selectedMovie.popularity} <br> Revenue: $${selectedMovie.revenue} <br> Vote Average: ${selectedMovie.vote_average} <br> Vote Count: ${selectedMovie.vote_count} <br> Runtime: ${selectedMovie.runtime} mins`;
        overviewLabel.innerHTML = "Overview";
        overviewText.innerHTML = `${selectedMovie.overview}`;
      });
    }
  });
});

