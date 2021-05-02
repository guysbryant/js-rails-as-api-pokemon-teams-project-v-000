const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const main = document.getElementsByTagName("main")[0];
const pokemonTeamSizeLimit = 6;
function newCard(trainer){
    const trainerName = trainer["name"];
    const trainerID = trainer["id"];
    const pokemons = trainer["pokemons"];
    function createCardDiv(){
        const card = document.createElement("div");
        card.className = "card";
        card.dataset.trainerId = trainerID;
        main.appendChild(card);
        return card;
    }
    function addTrainerInfo(trainerName){
        const pTrainerName = document.createElement("p");
        pTrainerName.innerText = trainerName;
        card.appendChild(pTrainerName);
    }
    function createAddPokemonButton(){
        const buttonAddPokemon = document.createElement("button");
        buttonAddPokemon.innerText = "Add Pokemon";
        buttonAddPokemon.classList.add("addPokemon");
        card.appendChild(buttonAddPokemon);
        buttonAddPokemon.addEventListener("click", function(){
            const pokemonTeamSize = this.parentElement.children[2].children.length;
            pokemonTeamSize < pokemonTeamSizeLimit ? addNewPokemon(this.parentElement) : alreadyFull();
        });
        function addNewPokemon(card){
            const trainerID = card.dataset.trainerId;
            const list = card.children[2];

            function createPokemon(){
                const formData = {
                    trainer_id: trainerID
                };
                const configObj = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify(formData)
                };
                return fetch(POKEMONS_URL, configObj)
                    .then(response => response.json())
                    .then(newPokemon => addPokemonToList(list, newPokemon));
            };
            createPokemon();
        }
        function alreadyFull(){
            console.log("Already Full");
        }
    }
    function addPokemonListUl(){
        const ul = document.createElement("ul");
        card.appendChild(ul);
        return ul;
    }
    function addPokemonToList(list, pokemon){
        console.log(list);
        const pokemonNickName = pokemon["nickname"], pokemonSpecies = pokemon["species"], pokemonID = pokemon["id"];
        const li = document.createElement("li");
        li.innerText = `${pokemonNickName} (${pokemonSpecies}) `;
        li.dataset.pokemonId = pokemonID;
        list.appendChild(li);
        createReleaseButton(li);
    }
    function createReleaseButton(li){
        const buttonRelease = document.createElement("button");
        buttonRelease.innerText = "Release";
        li.appendChild(buttonRelease);
    }
    function buildCard(){
        card = createCardDiv();
        addTrainerInfo(trainerName);
        createAddPokemonButton();
        ul = addPokemonListUl();
        pokemons.forEach(poke => addPokemonToList(ul, poke));
    }
    buildCard();
}

// fetch(POKEMONS_URL).then(response => response.json()).then(data => console.log(data))
fetch(TRAINERS_URL).then(response => response.json())
    .then(trainers => trainers.forEach(trainer => newCard(trainer)));

