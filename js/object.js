/// <reference path="../typings/globals/jquery/index.d.ts" />

let curruntDispalyMovies = [];
let password;



getMovie();

async function getMovie(q = "now_playing") {
    clrearSearch();
    curruntDispalyMovies = [];
    if (q == 'contact') {
        console.log("contacts section!!!");
        scrollTo();
    }
    else if (q == "trending") {
        let nowPlayingMovies = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=829075d6b59e95b66c99c05e3231dbd8`);
        if (nowPlayingMovies.ok) {
            nowPlayingMovies = await nowPlayingMovies.json();

            dispalyMovies(nowPlayingMovies.results);
            curruntDispalyMovies = nowPlayingMovies.results;
        }
    }
    else {
        let nowPlayingMovies = await fetch(`https://api.themoviedb.org/3/movie/${q}?api_key=829075d6b59e95b66c99c05e3231dbd8&language=en-US&page=1`);
        if (nowPlayingMovies.ok) {
            nowPlayingMovies = await nowPlayingMovies.json();

            dispalyMovies(nowPlayingMovies.results);
            curruntDispalyMovies = nowPlayingMovies.results;
        }


    }

};


function dispalyMovies(array) {

    let divs = ``;

    array.forEach((element) => {

        divs += (`<div class="col-12 col-md-6 col-lg-4 mb-5 ">
       <div class="poster-container position-relative">
       <div class=" movie-details position-absolute top-0 start-0 end-0 bottom-0  rounded-3 " id="movie-details">
       <h4>${element.title}</h4>
       <p class=" "> ${element.overview}</p>
       <p class=" "><strong>Rate : </strong>${element.vote_average}</p>
       <p class=" ">${element.release_date}</p>
       
       </div>
           <img src="https://image.tmdb.org/t/p/original${element.poster_path}" alt="${element.title}" class=" w-100 d-block m-auto rounded-3">
       </div>
       </div>
       
       `);
    });
    $("#movieArray").html(divs);

};




async function searchAllMovie(word) {

    if (word != " ") {
        let nowPlayingMovies = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=829075d6b59e95b66c99c05e3231dbd8&language=en-US&query=${word}&page=1&include_adult=false`);
        if (nowPlayingMovies.ok == true) {
            nowPlayingMovies = await nowPlayingMovies.json();
            console.log(nowPlayingMovies)
            dispalyMovies(nowPlayingMovies.results);
        }
    }


};


function searchCurruntMovies(word) {
    let searchArray = [];
    console.log("ana hena")
    curruntDispalyMovies.forEach((element) => {

        if (element.title.toLocaleLowerCase().includes(word)) {
            searchArray.push(element);
            dispalyMovies(searchArray);
            console.log(element.title)

        }
    });
};








$('.link').click(function () {
    let idOfLink = $(this).attr('id');
    console.log(idOfLink);
    getMovie(idOfLink);
});

$('#serarchAllMovies').keyup(function () {
    $('#serarchCurrunt').val('');
    let serarchAllMoviesValue = $('#serarchAllMovies').val();
    console.log(serarchAllMoviesValue);
    searchAllMovie(serarchAllMoviesValue);

});
$('#serarchCurrunt').keyup(function () {
    $('#serarchAllMovies').val('');
    let serarchCurruntValue = $('#serarchCurrunt').val();
    console.log(serarchCurruntValue);
    searchCurruntMovies(serarchCurruntValue);
});







/* side bar function*/
$('.nav-btn').click(function () {
    $('.nav-hide').toggleClass('show');
    $('.nav-tab').toggleClass('active');
    $('.link').toggleClass('dispaly');
    if ($('.nav-btn').html().includes("fa-bars")) {
        $('.nav-btn').html(`<i class="fas fa-times fa-2x"></i>`);
    }
    else {
        $('.nav-btn').html(`<i class="fas fa-bars fa-2x"></i>`);
    }
});


function clrearSearch() {
    $('#serarchCurrunt').val("");
    $('#serarchAllMovies').val("");
}


function regexForm(element) {
    let regex;

    if (element == "userName") {
        regex = /^[a-zA-z]{1,}$/;
    }
    else if (element == "userEmail") {
        regex = /^[a-zA-z0-9]{1,}[@][a-zA-Z]{1,}[.][a-zA-Z]{2,3}$/;
    }
    else if (element == "userPhone") {
        regex = /^[0-9]{10,12}$/;
    }
    else if (element == "userAge") {
        regex = /^[1-9]{1}[0-9]{0,1}$/;
    }
    else if (element == "userPassword") {
        regex = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+){8,}$/;
        password = $(`#${element}`).val();
        console.log(password)
    }


    console.log(element)
    console.log($(`#${element}`).val())
    if (regex.test($(`#${element}`).val())) {
        return true;
    }

    else {
        return false;
    }
}




$('.formInput').keyup(function () {
    let id = $(this).attr('id');
    console.log(id);
    if (id == "userRePassword") {
        if ($(`#${id}`).val() == password) {
            $(`.${id}`).hide();
        }
        else {
            $(`.${id}`).show();
        }
    }
    else {
        if (regexForm(id) == true) {

            $(`.${id}`).hide();
        }
        else {
            $(`.${id}`).show();
        }
    }
});

function scrollTo() {

    // let secOffset = $(`#contacts`).offset().top;
    let secOffset = parseInt($(`#contacts`).offset().top);
    console.log(secOffset);

    $("html").animate({ scrollTop: secOffset }, 2000);

}
