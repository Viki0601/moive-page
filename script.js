const APILINK = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=8406b08a7853aaf142c9165d1eaca29e&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=8406b08a7853aaf142c9165d1eaca29e&query=";

const main =document.getElementById("section");
const form =document.getElementById("form");
const search =document.getElementById("query");

returnMovies(APILINK)
function returnMovies(url) {
    fetch(url)
        .then(res => res.json())
        .then(function(data) {
            console.log(data.results);
            data.results.forEach(element => {
                // Create necessary elements
                const div_card = document.createElement('div');
                div_card.setAttribute('class', 'card');  // Set class for div_card

                const div_row = document.createElement('div');
                div_row.setAttribute('class', 'row');  // Set class for div_row

                const div_column = document.createElement('div');
                div_column.setAttribute('class', 'column');  // Set class for div_column

                const image = document.createElement('img');
                image.setAttribute('class', 'thumbnail');  // Set class for image
                image.setAttribute('id', 'image');

                const title = document.createElement('h3');
                // title.setAttribute('class', 'movie-title');  // Set class for title
                title.setAttribute('id', 'title');

                const center = document.createElement('center');
                center.setAttribute('class', 'center-content');  // Set class for center

                // Set the content and attributes
                title.innerHTML = `${element.title}`;
                image.src = IMG_PATH + element.poster_path;

                // Append the elements in the correct order
                center.appendChild(image);
                div_card.appendChild(center);
                div_card.appendChild(title);
                div_column.appendChild(div_card);
                div_row.appendChild(div_column);

                // Add the row to the main section
                main.appendChild(div_row);
            });
        })
        .catch(err => console.error("Error fetching movies:", err));
}

form.addEventListener("submit",(e) => {
    e.preventDefault();
    main.innerHTML ='';


    const searchItem =search.value;


if (searchItem){
    returnMovies(SEARCHAPI + searchItem);
    search.value = "";
}
})