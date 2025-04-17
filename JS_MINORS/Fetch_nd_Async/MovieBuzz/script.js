const url = 'https://imdb236.p.rapidapi.com/imdb/lowest-rated-movies';

const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': API_KEY,
        'x-rapidapi-host': API_HOST
    }
};

let allMovies = [];

// Initial function to fetch data
async function init() {
  try {
      console.log("Fetching data from:", url);
      const response = await fetch(url, options);
      const result = await response.json();
    //   console.log("Result JSON:", JSON.stringify(result, null, 2)); // Debugging
      loadMovieData(result); // Pass the array directly to loadMovieData
  } catch (error) {
      console.error("Fetch error:", error);
  }
}

function searchMovies() {
    const searchTerm = document.getElementById('movieSearch').value.toLowerCase();
    // If the search term is empty, display all movies
    if (!searchTerm) {
        renderMovieList(allMovies);
        return;
    }
    // Otherwise, filter movies by primaryTitle
    const filteredMovies = allMovies.filter(movie =>
        movie.primaryTitle.toLowerCase().includes(searchTerm)
    );
    renderMovieList(filteredMovies);
}



// This function renders the movie list using the passed movies data
function renderMovieList(movies) {
    const listContainer = document.querySelector('.LIST');
    listContainer.innerHTML = movies.map(generateMovieCard).join('');
}


// Called after data is fetched
function loadMovieData(movieData) {
    // console.log("Full Response:", movieData);

    // Adjust if wrapped under 'results'
    allMovies = movieData; 

    // if (!Array.isArray(allMovies)) {
    //     console.error("Unexpected format, expected array:", allMovies);
    //     return;
    // }

    // Format the movies before passing them to renderMovieList
    // hero all movie data is already converted rto specific foramat;
    const formattedMovies = allMovies.map(movie => ({
        averageRating: movie.averageRating || "N/A",
        primaryTitle: movie.primaryTitle || "No Title",
        primaryImage : movie.primaryImage,
        releaseDate: movie.releaseDate || '2008-08-29',
        budget: movie.budget || "",
        grossWorldwide: movie.grossWorldwide,
        contentRating: movie.contentRating || 'PG-13',
        runtimeMinutes: movie.runtimeMinutes || 87,
        description: movie.description || 'No description available.',
        metascore: movie.metascore || 0,
        countriesOfOrigin: movie.countriesOfOrigin || ['Unknown'],
        spokenLanguages: movie.spokenLanguages || ['Unknown'],
        imdbID: movie.id || 'N/A',
        filmingLocations: movie.filmingLocations || ['Unknown'],
        genres: movie.genres || ['Unknown'],
        interests: movie.interests,
        trailer: movie.trailer || '#',
        imdbUrl: `https://www.imdb.com/title/${movie.id}`,
        numVotes: movie.numVotes || 0,  // Added this field
    }));

    renderMovieList(formattedMovies);
}

// Function to generate HTML for each movie card
function generateMovieCard(movie) {
    return `
      <div class="movie-card">
          <div class="card-header">
              <img src="${movie.primaryImage}" alt="${movie.primaryTitle}" class="poster-image">
              <div class="overlay">
                  <div class="title-block">
                      <div class="rating-circle low-rating">${movie.averageRating}</div>
                      <div class="title-year">
                          <h1>${movie.primaryTitle}</h1>
                          <div class="year">${new Date(movie.releaseDate).getFullYear()}</div>
                      </div>
                  </div>
                  <div class="meta-info">
                      <div class="meta-item">
                          <i class="fas fa-film"></i>
                          <span>${movie.contentRating}</span>
                      </div>
                      <div class="meta-item">
                          <i class="fas fa-clock"></i>
                          <span>${movie.runtimeMinutes} min</span>
                      </div>
                      <div class="meta-item">
                          <i class="fas fa-calendar"></i>
                          <span>${new Date(movie.releaseDate).toLocaleDateString()}</span>
                      </div>
                      <div class="meta-item">
                          <i class="fas fa-poll"></i>
                          <span>${movie.numVotes} votes</span>
                      </div>
                  </div>
                  <div class="genre-tags">
                      ${movie.genres.map(genre => `<div class="tag">${genre}</div>`).join('')}
                  </div>
                  <a href="${movie.trailer}" class="trailer-btn" target="_blank">
                      <i class="fas fa-play"></i>
                      <span>Watch Trailer</span>
                  </a>
              </div>
          </div>
          
          <div class="card-body">
              <p class="description">
                  ${movie.description}
              </p>
              
              <div class="budget-section">
                  <div class="budget-bars">
                      <span class="bar-label">Budget</span>
                      <div class="bar-container">
                          <div class="bar-fill bar-budget" style="width: ${(movie.budget / 1000000)}%"></div>
                      </div>
                      <span class="bar-value">$${(movie.budget / 1000000).toFixed(1)}M</span>
                  </div>
                  <div class="budget-bars" style="margin-top: 15px;">
                      <span class="bar-label">Gross</span>
                      <div class="bar-container">
                          <div class="bar-fill bar-gross" style="width: ${(movie.grossWorldwide / 1000000)}%"></div>
                      </div>
                      <span class="bar-value">$${(movie.grossWorldwide / 1000000).toFixed(1)}M</span>
                  </div>
              </div>
              
              <div class="divider"></div>
              
              <div class="details-grid">
                  <div class="detail-item">
                      <div class="detail-label">Metascore</div>
                      <div class="detail-value">${movie.metascore}/100</div>
                  </div>
                  <div class="detail-item">
                      <div class="detail-label">Country</div>
                      <div class="detail-value">${movie.countriesOfOrigin.join(', ')}</div>
                  </div>
                  <div class="detail-item">
                      <div class="detail-label">Language</div>
                      <div class="detail-value">${movie.spokenLanguages.join(', ')}</div>
                  </div>
                  <div class="detail-item">
                      <div class="detail-label">IMDb ID</div>
                      <div class="detail-value">${movie.imdbID}</div>
                  </div>
                  <div class="detail-item">
                      <div class="detail-label">Filming Location</div>
                      <div class="detail-value">${movie.filmingLocations.join(', ')}</div>
                  </div>
                  <div class="detail-item">
                      <div class="detail-label">Type</div>
                      <div class="detail-value">Movie</div>
                  </div>
              </div>
              
              <div class="interests-section">
                  <div class="interests-title">Interests</div>
                  <div class="interest-tags">
                      ${movie.interests.map(interest => `<div class="interest-tag">${interest}</div>`).join('')}
                  </div>
              </div>
              
              
              <a href="${movie.imdbUrl}" class="imdb-link" target="_blank">
                  <i class="fab fa-imdb" style="font-size: 1.2em; color: #f5c518;"></i>
                  <span>View on IMDb</span>
              </a>
          </div>
      </div>
    `;
}


document.getElementById('movieSearch').addEventListener('input', searchMovies);

document.addEventListener('DOMContentLoaded', init);
