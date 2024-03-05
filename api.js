/* VARIABLES*/

const formSelect = document.querySelector('.form-select'); // STEP 1 (EVENT1) - Crear la variable para igualar al select
const containerCards = document.getElementById('container-cards');


let state = true;

/* EVENTOS */
formSelect.addEventListener('click', selectCategory); // STEP 2 (EVENT1) - Crearle el addEventListener al select
formSelect.addEventListener('input', selectFood);

/*FUNCIONES */
function selectCategory() { // STEP 3 (EVENT1) - Crear la funcion para extraer la informacion de la APi

    fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    .then( responsePromise =>{
        //console.log(responsePromise);
        return responsePromise.json(); 
    })
    .then( dataCategory => { 
        //console.log(dataCategory);
        //console.log(dataCategory.categories[0]);
        //console.log(dataCategory.categories[0].strCategory);
        if (state) {
            injectingCategory(dataCategory); // STEP 4 (EVENT1) - Llamar la funcion para agregar los datos
            
        };
    });
};

function injectingCategory(categoriesApi) { // STEP 5 (EVENT1) - Crear la funcion 
    //console.log(categories.categories);<zpo
    //let html = '';

   categoriesApi.categories.forEach( category => { // 'categoriesApi' ahora toma el valor del dato al que ingresamos antes, en este caso la categoria
       const {strCategory} = category; // La constante debe ser igual al iterador 
       const option = document.createElement('option'); // STEP 6 (EVENT1) - Creamos la etiqueta en la que vamos a ingresar los datos, en este caso es una <option>, que siempre va dentro de un <select>
        
        option.value = strCategory; // STEP 7 (EVENT1) - 
        option.textContent = `${strCategory}`;

        formSelect.appendChild(option);

    });
    state = false;

};

    /* MOSTRAR LAS COMIDAS*/

function selectFood() {
    const categorySelected = formSelect.value;
    console.log(`La categoría seleccionada fue: ${categorySelected}`);

    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categorySelected}`)
    .then( response => {
        //console.log(response);
        return response.json();
    })
    .then( answer =>{
        //console.log(answer.meals[0]);

        showFood(answer.meals);
    });

};

function showFood(meals) {
    //console.log(meals);
    let html = '';

    meals.forEach( meal =>{
        console.log(meal);

        const {strMeal, strMealThumb} = meal; // Lo llamamos igual al parametro

        html += `
        <div class="hola">
            <div class="card" style="width: 18rem;">
                <img src="${strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${strMeal}</h5>
                </div>
            </div>
        </div>
        `;

    });

    containerCards.innerHTML = html;
};