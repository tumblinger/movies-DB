const api_url = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3b8fd241768fc301f39b376c4fe192e2&page=1&language=en'
const img_path = 'https://image.tmdb.org/t/p/w1280'
const search_api = 'https://api.themoviedb.org/3/search/movie?api_key=3b8fd241768fc301f39b376c4fe192e2&language=ru&query="'
const form = document.getElementById('form')
const search = document.getElementById('search')
const main = document.getElementById('main')

//GEt initial movies:
getMovies(api_url)

async function getMovies(url) {
    const res = await fetch(url)
    const data = await res.json()
    showMovies(data.results)
}

function showMovies(movies) {
    main.innerHTML = ''
    movies.forEach((movie) => {
        const { title, poster_path, overview, vote_average } = movie
        const movieElement = document.createElement('div')
        movieElement.classList.add('movie')
        movieElement.innerHTML = `
        <img src="${img_path + poster_path}"
                alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${rateClass(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
        `
        main.appendChild(movieElement)
    })
}

function rateClass(vote) {
    if (vote >= 8) {
        return 'green'
    } else if (vote >= 6) {
        return 'orange'
    } else {
        return 'red'
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const searchTerm = search.value
    if (searchTerm && searchTerm !== '') {
        getMovies(search_api + searchTerm)
        search.value = ''
    } else {
        window.location.reload()
    }
})
