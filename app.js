const inputButton = document.getElementById('inputButton');
let recipeName = '';
const search = document.getElementById('search');

const container=document.getElementById('container')

search.addEventListener('click', async (event) => {
    event.preventDefault();
    console.log(inputButton.value);
    recipeName = inputButton.value;

    const apiurl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${recipeName}`;
    
    try {
        const response = await fetch(apiurl);
        if (!response.ok) {
            console.log('Unable to fetch recipe');
        } else {
            const data = await response.json();
            console.log(data); // Display the fetched recipe data
            getData(data)
        }
    } catch (error) {
        console.error('Error fetching the recipe:', error);
    }
});



function getData(data){
    const ingredients=[]
    const {meals}=data;
    meals.forEach((meal, index)=>{
        const {strMeal, strCategory, strArea, strInstructions, strMealThumb}=meal;
        console.log(strMeal, strCategory, strArea, strInstructions, strMealThumb);
    
    for (let i=1;i<=20;i++){
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
 
        if(ingredient && ingredient.trim()!==''){
            ingredients.push(`${measure? measure.trim():''} ${ingredient.trim()}`.trim());
        }
    }
 showDataInContainer(strMeal, strCategory, strArea, strInstructions, strMealThumb,ingredients)

})
}


function showDataInContainer(strMeal, strCategory, strArea, strInstructions, strMealThumb,Ingredients){
  container.style.display='block'
    console.log(strMeal, strCategory, strArea, strInstructions, strMealThumb);
   const foodPic=document.getElementById('foodPic');
   foodPic.src=`${strMealThumb}`
   const foodName=document.getElementById('foodName')
   foodName.textContent=strMeal;
   
   const mealCategory=document.getElementById('mealCategory')
   const mealArea=document.getElementById('mealArea')
   const instructions=document.getElementById('instructions')
   const ingredients=document.getElementById('ingredients')

   mealCategory.textContent = `Meal Category: ${strCategory}`;
   mealArea.textContent= `Meal Area: ${strArea}`
   instructions.textContent=`Instructions: ${strInstructions}`
   ingredients.textContent=`Ingredients:${Ingredients}`
}


