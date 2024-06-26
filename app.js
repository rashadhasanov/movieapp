const key = "bb3e4ce4";
const input = document.getElementById("input");
const suggestions = document.getElementById("suggestions");
const movieInfo = document.querySelector(".movie-info");

input.addEventListener("input", onInput);

function onInput(e) {
  movieInfo.innerHTML = "";
  fetch(`https://www.omdbapi.com/?apikey=${key}&s=${e.target.value}`)
    .then((res) => {
      if (res.status !== 200) {
        throw new Error("Xeta bash verdi");
      }

      return res.json();
    })
    .then((data) => {
      const query = e.target.value;
      if (query === "") {
        suggestions.innerHTML = "";
        return;
      }

      if (data.Response === "True") {
        console.log(data);
        let html = "";
        const movies = data.Search;
        movies.forEach((element) => {
          const poster =
            element.Poster !== `N/A` ? element.Poster : "placeholder.jpg";

          html += `<div class="movie" data-id = "${element.imdbID}">
                     <img src="${poster}" alt="${element.Title} Poster" />
                     <p>${element.Title}</p>
                   </div>`;
        });
        suggestions.innerHTML = html;
      }
      getMovie();
    })
    .catch((err) => console.log(err.message));
}

function getMovie() {
  const movies = document.querySelectorAll(".movie");
  movies.forEach((element) => {
    element.addEventListener("click", (event) => {
      event.stopPropagation();

      fetch(`https://www.omdbapi.com/?apikey=${key}&i=${element.dataset.id}`)
        .then((res) => res.json())
        .then((data) => displayFilmInfo(data));
    });
  });
}

function displayFilmInfo(data) {
  console.log(data);
  suggestions.innerHTML = "";
  let html = `
            <img src="${data.Poster}"
                alt="">
            <div class="movie-desc">
                <p>Title: ${data.Title}</p>
                <p>Year: ${data.Year}</p>
                <p>Writer: ${data.Writer}</p>
                <p>Plot: ${data.Plot}</p>
                <p>Imdb: ${data.imdbRating}</p>
            </div>
        `;

  document;
  movieInfo.insertAdjacentHTML("beforeend", html);
}
