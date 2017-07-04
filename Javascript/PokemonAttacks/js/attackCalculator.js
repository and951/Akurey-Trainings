var pokemons = {};

var createPokemon= function(pSection){
  //For the api that we are using the pokemon name needs to be im lower case
  var name =  document.getElementById('name'+pSection).value.toLowerCase();;
  var type = document.getElementById('type'+pSection).value;
  var attack = document.getElementById('attack'+pSection).value;
  var defense = document.getElementById('defense'+pSection).value;
  var pokemonInstance = new pokemon(name,type,attack,defense,pSection);
  pokemons[pSection] = pokemonInstance;
}

var attack = function(pAttackPokemonSection,pDefensePokemonSection){
  var typesDistribution = new pokemonType();
  var attackPokemon = pokemons[pAttackPokemonSection];
  var defensePokemon = pokemons[pDefensePokemonSection];
  var damage = 50 * (attackPokemon.attack / defensePokemon.defense) * typesDistribution.getEfectivness(attackPokemon.type,defensePokemon.type);
  alert(attackPokemon.name + " attacks "+defensePokemon.name+ " with a damage of "+damage);
}
