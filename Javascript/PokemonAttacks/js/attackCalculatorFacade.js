/*!
 * All Rights Reserved
 * This software is proprietary information of
 * Intelligent Sense
 * Use is subject to license terms.
 * Filename: attackCalculatorFacade.js
 */

/*
 * Author:      ajimenez@intelligentsense.com
 * Date:        03/07/2017
 * Description: The facade where the resources are consumedby the html.
 */


/**
 * Training
 */

//This hash variable is meant to save all the pokemon instances made by the user.

var pokemonsHash = {};
const CONSTANT_DAMAGE = 50;
const ACTIVE_SPRITE_CLASS = 'activeSprite';

/**
 * Public method to be used outside of the module. This method purpose is to create a new pokemon instance according to the information in
 * the section indicated as a parameter.
 * @return {void} it doesn't return anything.
 * @public
 */

var createPokemon = function(pSection) {
  //For the api that we are using the pokemon name needs to be im lower case
  var name = document.getElementById('name' + pSection).value.toLowerCase();;
  var type = document.getElementById('type' + pSection).value;
  var attack = document.getElementById('attack' + pSection).value;
  var defense = document.getElementById('defense' + pSection).value;
  var pokemonInstance = new pokemon(name, type, attack, defense, pSection);
  //The section is used as the key to save the new pokemon instance.
  pokemonsHash[pSection] = pokemonInstance;
  loadEnviornment(pSection);
}

/**
 * Public method to be used outside of the module. This method purpose is to calculate an attack from pokemons created in the differents sections.
 * @return {void} it doesn't return anything. But it makes an alert to show the damage calculated.
 * @public
 */

var attack = function(pAttackPokemonSection, pDefensePokemonSection) {
  var typesDistribution = new pokemonTypes();
  var attackPokemon = pokemonsHash[pAttackPokemonSection];
  var defensePokemon = pokemonsHash[pDefensePokemonSection];
  var damage = CONSTANT_DAMAGE * (attackPokemon.attack / defensePokemon.defense) * typesDistribution.getEfectivness(attackPokemon.type, defensePokemon.type);
  alert(attackPokemon.name + " attacks " + defensePokemon.name + " with a damage of " + damage);
}

/**
 * 'Private' method that is not meant to be used outside of the module.
 * This method purpose is to assign the sprites called from the api to their respectives images in the html.
 * @return {void} it doesn't return anything.
 * @private
 */

var loadEnviornment = function(pSection) {
  var actualPokemon = pokemonsHash[pSection];
  var pokemonId = '#pokemon' + pSection;

  $(pokemonId).attr("class", ACTIVE_SPRITE_CLASS);
  $(pokemonId).attr("src", actualPokemon.frontSprite);
  $(pokemonId).hover(function() {
        $(pokemonId).attr("src", actualPokemon.backSprite)
    },
    function() {
      $(pokemonId).attr("src", actualPokemon.frontSprite)
    });
}
