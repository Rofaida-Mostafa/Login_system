

let allRecipes = [];

async function getRecipe(recipe) {
  let response = await fetch(
    `https://forkify-api.herokuapp.com/api/search?q=${recipe}`
  );
  let finalData = await response.json();
  allRecipes = finalData.recipes;
  displaying();
  console.log(allRecipes);
}
getRecipe("beetroot");

function displaying() {
  let x = ``;
  for (let i = 0; i < allRecipes.length; i++) {
    x += `  
    <div class="food col-md-2 my-4 ">
      
                <div class="recipe border-2 ">
                    <h2 class="h5 my-2 d-flex justify-content-center">${allRecipes[i].title.split(' ').slice(0,2)}</h2>
                    <img class="img-fluid pt-2 text-white" src="${allRecipes[i].image_url}" alt="${allRecipes[i].title.split(' ').slice(0,2)}">
                </div>
          
    </div>`;
  }
  document.getElementById("rowData").innerHTML = x;
}