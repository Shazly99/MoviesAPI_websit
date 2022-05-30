// let param = new URLSearchParams(location.search);
// let recipeId = param.get("rid");

// let allTv = [];
// async function getDateTv() {
//   let tv = await fetch(
//     `https://api.themoviedb.org/3/trending/person/week?api_key=cb9d54251bfb16d22a9165b924cf3c91`
//   );
//   let tvBody = await tv.json();
//   allTv = tvBody.results;

//   for (let i = 0; i < allTv.length; i++) {
//     if (allTv[i].id == recipeId) {
//         console.log("ok", allTv[i].known_for);
//       }
//     }

// }

// getDateTv();

$(".iconMenu").click(function (e) {
  $(".iconMenu").toggleClass("fa-times");
  if ($("#sidebar").css("left") === "0px") {
    $("#sidebar").animate({ left: "250px" }, 500);
    $(".sidebarData").animate({ left: "0" }, 500);
    $('.layout').fadeIn(1000); 
    $('body').css('overflow','hidden');
  } else {
    $("#sidebar").animate({ left: "0" }, 500);
    $(".sidebarData").animate({ left: "-250px" }, 500);
    $('.layout').slideUp(0);
    $('body').css('overflow','auto');
  }
});




let movieTrendingInWeek=`https://api.themoviedb.org/3/trending/movies/week?api_key=cb9d54251bfb16d22a9165b924cf3c91`
var trendingURL =
  "https://api.themoviedb.org/3/trending/all/day?api_key=eba8b9a7199efdcb0ca1f96879b83c44";
var popularURL =
  "https://api.themoviedb.org/3/movie/popular?api_key=eba8b9a7199efdcb0ca1f96879b83c44";
var topratedURL =
  "https://api.themoviedb.org/3/movie/top_rated?api_key=eba8b9a7199efdcb0ca1f96879b83c44";
var upcomingURL =
  "https://api.themoviedb.org/3/movie/upcoming?api_key=eba8b9a7199efdcb0ca1f96879b83c44";
var URL =
  "https://api.themoviedb.org/3/movie/now_playing?api_key=eba8b9a7199efdcb0ca1f96879b83c44";


  let category = document.querySelectorAll(".nav-category");
for (let i = 0; i < category.length; i++) {
  console.log(category[i].textContent);
  $(category[i]).click(function (e) {
    if (e.currentTarget.textContent === "Popular") {
        URL=popularURL
        trending()
    }
    else if (e.currentTarget.textContent === "Top Rated") {
        URL=topratedURL
        trending()
    } 
    else if (e.currentTarget.textContent === "Trending") {
        URL=trendingURL
        trending()
    }
    else if (e.currentTarget.textContent === "Upcoming") {
        URL=upcomingURL
        trending()
    }
    else if (e.currentTarget.textContent === "Now playing") {
        URL=movieTrendingInWeek
        trending()
    }
  });
}
let allPostsTrending = [];

async function trending() { 
  let movies = await fetch(URL);
  let getBody = await movies.json();
  allPostsTrending = getBody.results;
  
  trendingDisplay();
}

trending();

function trendingDisplay() {
  let cartonna = ``;

  let original_title = allPostsTrending.map((x) => {
    return (x.original_title + x.name).split("undefined").join("");
  });
  let first_air_date = allPostsTrending.map((x) => {
    return (x.first_air_date + x.release_date).split("undefined").join("");
  });

  for (let i = 0; i < allPostsTrending.length; i++) {
    cartonna += `
        <div class="col-md-6 col-lg-4 my-3 myM overflow-hidden  shadow">
        <div class="post  shadow position-relative">
            <img  class="     img-fluid rounded" src="https://image.tmdb.org/t/p/w500/${allPostsTrending[i].poster_path}">
            
            <span class="position-absolute vote_average  ">${allPostsTrending[i].vote_average}</span>
            <div class="layer d-flex align-items-center position-absolute  ">
                <div class="info p-0">
                <h2 class="text-dark font-weight-bolder">${original_title[i]}</h2>
                    <p class="label px-2">${allPostsTrending[i].overview}</p>
                    <p class="bg-light text-black fs-5">${first_air_date[i]}</p>
                </div>


            </div>
            
        </div>

    </div>
        
        `;
  }
  console.log(first_air_date);

  document.getElementById("display").innerHTML = cartonna;
}

trendingDisplay();
