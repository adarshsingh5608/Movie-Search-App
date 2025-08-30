const API_KEY = "6144741f"; // Replace with your OMDB API key

async function searchMovies() {
  const query = document.getElementById("movie-input").value;
  const resultsDiv = document.getElementById("movie-results");

  if (!query) {
    resultsDiv.innerHTML = "<p>Please enter a movie name.</p>";
    return;
  }

  const url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.Response === "True") {
      resultsDiv.innerHTML = data.Search.map(movie => `
        <div class="movie-card">
          <img src="${movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/200"}" alt="${movie.Title}">
          <h3>${movie.Title}</h3>
          <p>${movie.Year}</p>
        </div>
      `).join("");
    } else {
      resultsDiv.innerHTML = `<p>No movies found for "${query}".</p>`;
    }

  } catch (error) {
    console.error("Error fetching data:", error);
    resultsDiv.innerHTML = "<p>Something went wrong. Please try again.</p>";
  }
}
