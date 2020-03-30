var appID = '0f3701d1';
var apiKey = "e194a7d70ffde19bef2e9396cfdf22ca";

var allIngredients = [];



function loadRecipes() {
	$.ajax({
		url: 'https://api.edamam.com/search?q=' + allIngredients + '&app_id=' + appID + '&app_key=' + apiKey
	}).then(function (response) {

		var recipes = response.hits;

		document.getElementById("recipeDisplay").innerHTML = '';
		document.getElementById("ingredients").innerHTML = '';

		for (i = 0; i < recipes.length; i++) {
			var container = document.createElement('div');
			container.setAttribute('class', 'recipe-container');
			var image = document.createElement('img');
			var recipeLink = document.createElement('a');

			recipeLink.setAttribute('href', recipes[i].recipe.url);
			recipeLink.innerHTML = recipes[i].recipe.label;
			recipeLink.setAttribute('class', 'caption');
			recipeLink.setAttribute('class', 'text-center');

			image.setAttribute('src', recipes[i].recipe.image);
			container.appendChild(image);
			container.appendChild(recipeLink);
			document.getElementById("recipeDisplay").appendChild(container);

		};
		for (var j = 0; j < allIngredients.length; j++) {
			var ingredContainer = document.createElement('div');
			ingredContainer.setAttribute('class', 'currentIngredient');
			ingredContainer.innerText = allIngredients[j];

			var ingredientDelete = document.createElement('button');
			ingredientDelete.innerText = 'X';
			ingredientDelete.setAttribute('name', allIngredients[j]);
			ingredientDelete.setAttribute('class', 'delete_button');

			ingredientDelete.addEventListener('click', deleteIngredient);

			ingredContainer.appendChild(ingredientDelete);
			document.getElementById("ingredients").appendChild(ingredContainer);
		};
	});
}

document.getElementById("searchBtn").addEventListener('click', function (event) {
	event.preventDefault();
	var ingredient = document.getElementById("search").value;

	allIngredients.push(ingredient);
	document.getElementById("search").value = "";

	loadRecipes();
});

function deleteIngredient(event) {
	document.getElementById("ingredients").removeChild(event.target.parentNode);

	var index = allIngredients.indexOf(event.target.name);
	if (index > -1) {
		allIngredients.splice(index, 1);
	}

	loadRecipes();
}