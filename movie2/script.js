const APILINK = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=8406b08a7853aaf142c9165d1eaca29e&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=8406b08a7853aaf142c9165d1eaca29e&query=";

const main = document.getElementById("section");
const form = document.getElementById("form");
const search = document.getElementById("query");

// Initial call to display popular movies
returnMovies(APILINK);

function returnMovies(url) {
    fetch(url)
        .then(res => res.json())
        .then(function(data) {
            main.innerHTML = '';

            const titlesSet = new Set(); // Create a set to track titles

            data.results.forEach(element => {
                // Check if the title is already in the set
                if (!titlesSet.has(element.title)) {
                    titlesSet.add(element.title); // Add title to set

                    // Create necessary elements
                    const div_card = document.createElement('div');
                    div_card.setAttribute('class', 'card');

                    const image = document.createElement('img');
                    image.setAttribute('class', 'thumbnail');
                    image.setAttribute('id', 'image');
                    image.src = element.poster_path ? IMG_PATH + element.poster_path : 'path_to_placeholder_image.png';
                    image.setAttribute('alt', element.title);

                    const title = document.createElement('h3');
                    title.setAttribute('class', 'movie-title');
                    title.setAttribute('id', 'title');
                    title.innerHTML = `${element.title}`;

                    const center = document.createElement('center');
                    center.setAttribute('class', 'center-content');

                    // Append the elements in the correct order
                    center.appendChild(image);
                    div_card.appendChild(center);
                    div_card.appendChild(title);

                    // Add the card to the main section
                    main.appendChild(div_card);
                }
            });
        })
        .catch(err => console.error("Error fetching movies:", err));
}

// Search functionality
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchItem = search.value;

    if (searchItem) {
        returnMovies(SEARCHAPI + searchItem);
        search.value = "";  // Clear the search input after submission
    }
});
