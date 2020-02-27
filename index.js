function cocktailCard (name, imageURL, id){
   var result = document.createElement('div');
   result.classList.add("card");
   
   var inhalt = document.createElement('h3');
   inhalt.textContent = name;
   result.appendChild(inhalt);
   
   var image = document.createElement('img');
   image.src = imageURL;
   result.appendChild(image);

   result.addEventListener('click', function(){
      var spotlight = createCocktailSpotlight(name, imageURL, id);
      document.body.appendChild(spotlight);
   });

   return result;
}

function createCocktailSpotlight(name, imageURL, id){
   var spotlight = document.createElement('div');
   spotlight.id="spotlight";

   var spotlightCard = document.createElement('div');
   spotlightCard.id = "spotlight-card";

   var h1 = document.createElement('h1');
   h1.textContent = name;
   spotlightCard.appendChild(h1);
   
   var img = document.createElement('img');
   img.src = imageURL;
   spotlightCard.appendChild(img);

   var p = document.createElement('p');
   spotlightCard.appendChild(p);

   spotlight.appendChild(spotlightCard);


   var promise =  fetchJSON("https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + id);

   promise.then(function(apiResponse){
     var drink = apiResponse.drinks[0];
     var instructions = drink.strInstructions;
     p.textContent = instructions;
   });


   spotlight.addEventListener('click', function() {
      spotlight.remove();
   })

   return spotlight;
}


function fetchJSON(url){
  return new Promise(function(resolve, reject){
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.addEventListener('load', function(){
      var response = JSON.parse(request.response);
      resolve(response);
    })
    request.send();
  });
}

var promise = fetchJSON('https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin');


const request = new XMLHttpRequest();

request.open('GET', 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin');

request.addEventListener('load', function(){
  console.log("Request is finised");
  console.log(request.status);
  console.log(request.response);

  var apiResponse = JSON.parse(request.response);

  var cocktailList = document.querySelector("#cocktail-list");
  var drinks = apiResponse.drinks;

  for (var i = 0; i < drinks.length; i++){
    let drink = drinks[i]; 

    let name = drink.strDrink;
    let imageURL = drink.strDrinkThumb;
    let id = drink.idDrink;

    let cocktailCardFinal= cocktailCard(name, imageURL, id);

    cocktailCardFinal.addEventListener('click', function(){
      console.log(name);
    })

    cocktailList.appendChild(cocktailCardFinal);
  }
});

request.send();
console.log("Request is send");



var myPromise = new Promise(function(resolve, reject){
  resolve("Here´s your promise");
})

myPromise.then(function(resolvedPromise){
  console.log(resolvedPromise);
})