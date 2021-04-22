// https://movies-app-siit.herokuapp.com/movies
function movies() {
  const moviesContainer = document.querySelector('main');
  const url = 'https://movies-app-siit.herokuapp.com/movies';

  const promise = fetch(url)
    .then((res) => res.json())
    .then((data) => {
      for (const movie of data.results) {
        renderCard(movie);
      }
    });

  function renderCard(movie) {
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('card-container');

    const movieImg = document.createElement('img');
    movieImg.src = movie.Poster;

    const movieTitle = document.createElement('h2');
    movieTitle.textContent = movie.Title;

    const wrapper = document.createElement('a');

    wrapper.appendChild(movieImg);
    wrapper.appendChild(movieTitle);
    // wrapper.setAttribute('href', '#');
    wrapper.href = `movieDetails.html?movieId=${movie._id}`;
    cardContainer.appendChild(wrapper);

    moviesContainer.appendChild(cardContainer);
  }
}

movies();
