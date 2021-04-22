function getUrlParam(name) {
  //"?altceva=ceva&movieId=6018075fa1c19b0022112a01&test=8"
  const search = location.search.substr(1); // substr scoate semnul intrebarii din query string

  //"altceva=ceva&movieId=6018075fa1c19b0022112a01&test=8""
  const keyValuePairs = search.split("&");

  // array de stringuri cheie=valoare
  for (const pair of keyValuePairs) {
    // Array destructuring
    const [key, value] = pair.split("=");

    if (key === name) {
      return value;
    }
  }

  console.warn(
    'The query parameter you tried to get: "%s" is not available in the URL.',
    name
  );
  return undefined;
}
function movieDetail() {
  const getId = getUrlParam("movieId");
  fetch(`https://movies-app-siit.herokuapp.com/movies/${getId}`)
    .then((res) => res.json())
    .then((data) => {
      createHtml(data);
      starRating(data);
    });

  function createHtml(data) {
    const title = document.querySelector("h1");
    const image = document.querySelector("img");
    const plot = document.querySelector(".plot");
    const rating = document.querySelector(".rating");

    title.innerHTML = data.Title;
    image.src = data.Poster;
    plot.innerHTML = data.Plot;
    rating.innerHTML = `IMDB Rating: ${data.Ratings[0]["Value"]}`;
    //Putem folosi si data.imdbRating direct, fara sa accesam obiectul;
  }

  function starRating(data) {
    const star = document.querySelector(".rating-picture");
    if (data.imdbRating / 2 < 2) {
      return (star.src =
        "https://img.icons8.com/flat-round/64/000000/one-of-five-stars.png");
    } else if (data.imdbRating / 2 < 3) {
      return (star.src =
        "https://img.icons8.com/flat-round/64/000000/two-of-five-stars.png");
    } else if (data.imdbRating / 2 < 4) {
      return (star.src =
        "https://img.icons8.com/flat-round/64/000000/three-of-five-stars.png");
    } else if (data.imdbRating / 2 < 4.5) {
      return (star.src =
        "https://img.icons8.com/flat-round/64/000000/four-of-five-stars.png");
    } else {
      return (star.src =
        "https://img.icons8.com/flat-round/64/000000/five-of-five-stars.png");
    }
  }
}

movieDetail();
