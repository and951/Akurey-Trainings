/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>
<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>; Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */
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

/*!
 * All Rights Reserved
 * This software is proprietary information of
 * Intelligent Sense
 * Use is subject to license terms.
 * Filename: pokemon.js
 */

 /*
  * Author:      ajimenez@intelligentsense.com
  * Date:        03/07/2017
  * Description: This file defines the pokemon class and its behavior.
  */


/**
 * Training
 */

var pokemon = class {

  constructor(pName, pType, pAttack, pDefense, pSection) {
    this.name = pName;
    this.type = pType;
    this.attack = pAttack;
    this.defense = pDefense;
    this.section = pSection;
    this.frontSprite = "img/pokeballActive.png";
    this.backSprite = "img/pokeballActive.png";
    this.retrieveSpritesFromPokeAPI();

  }

  /**
   * 'Private' method that is not meant to be used outside of the class.
   * This method purpose is to retrieve the sprites from the api and assigned to their respectives attributes.
   * @return {void} it doesn't return anything.
   * @private
   */

  retrieveSpritesFromPokeAPI() {
    var pokeUrl = "http://pokeapi.co/api/v2/pokemon-form/" + this.name;
    //This is used to reference the atributes inside of the ajax call scope.
    var thisClass = this;

    console.log(pokeUrl);
    $.ajax({
      url: pokeUrl,
      contentType: 'application/json',
      dataType: 'json',
      success: function(actualPokemon) {
        thisClass.frontSprite = actualPokemon.sprites.front_default;
        thisClass.backSprite =  actualPokemon.sprites.back_default;

      },
      error: function() {
        console.log("Error");
      }
    });

  }

}


/*!
 * All Rights Reserved
 * This software is proprietary information of
 * Intelligent Sense
 * Use is subject to license terms.
 * Filename: pokemonTypes.js
 */

 /*
  * Author:      ajimenez@intelligentsense.com
  * Date:        03/07/2017
  * Description: This file defines the pokemon types class and its relationships.
  */


/**
 * Training
 */

var pokemonTypes = class {
  constructor() {
    this.POKEMON_TYPES = ["Fire", "Grass", "Water", "Electric"];
    this.NO_EFECTIVE_VALUE = 0.5;
    this.SUPER_EFECTIVE_VALUE = 2;
    this.NEUTRAL_VALUE = 1;
    this.pokemonTypeEfecctivnes = {};
    this.generatePokemonTypeEfectivness();
  }
  /**
   * 'Private' method that is not meant to be used outside of the class.
   * This method purpose is to genereate a relationship between all of the types and assign them an efectivness value.
   * @return {void} it doesn't return anything.
   * @private
   */
  generatePokemonTypeEfectivness() {
    //FIRE

    //Fire -> Water
    var fireWater = [this.POKEMON_TYPES[0], this.POKEMON_TYPES[2]];
    this.pokemonTypeEfecctivnes[fireWater] = this.NO_EFECTIVE_VALUE;
    //Water -> Fire
    var waterFire = [this.POKEMON_TYPES[2], this.POKEMON_TYPES[0]];
    this.pokemonTypeEfecctivnes[waterFire] = this.SUPER_EFECTIVE_VALUE;
    //Fire -> Grass
    var fireGrass = [this.POKEMON_TYPES[0], this.POKEMON_TYPES[1]];
    this.pokemonTypeEfecctivnes[fireGrass] = this.SUPER_EFECTIVE_VALUE;
    //Grass -> Fire
    var grassFire = [this.POKEMON_TYPES[1], this.POKEMON_TYPES[0]];
    this.pokemonTypeEfecctivnes[grassFire] = this.NO_EFECTIVE_VALUE;
    //Fire -> Electric
    var fireElectric = [this.POKEMON_TYPES[0], this.POKEMON_TYPES[3]];
    this.pokemonTypeEfecctivnes[fireElectric] = this.NEUTRAL_VALUE;
    //Electric -> Fire
    var electricFire = [this.POKEMON_TYPES[3], this.POKEMON_TYPES[0]];
    this.pokemonTypeEfecctivnes[electricFire] = this.NEUTRAL_VALUE;

    //GRASS

    //Grass -> Water
    var grassWater = [this.POKEMON_TYPES[1], this.POKEMON_TYPES[2]];
    this.pokemonTypeEfecctivnes[grassWater] = this.SUPER_EFECTIVE_VALUE;
    //Water -> Grass
    var waterGrass = [this.POKEMON_TYPES[2], this.POKEMON_TYPES[1]];
    this.pokemonTypeEfecctivnes[waterGrass] = this.NO_EFECTIVE_VALUE;
    //Grass -> Electric
    var grassElectric = [this.POKEMON_TYPES[1], this.POKEMON_TYPES[3]];
    this.pokemonTypeEfecctivnes[grassElectric] = this.NEUTRAL_VALUE;
    //Electric -> Grass
    var electricGrass = [this.POKEMON_TYPES[3], this.POKEMON_TYPES[1]];
    this.pokemonTypeEfecctivnes[grassElectric] = this.NEUTRAL_VALUE;

    //WATER

    //Water -> Electric
    var waterElectric = [this.POKEMON_TYPES[1], this.POKEMON_TYPES[3]];
    this.pokemonTypeEfecctivnes[waterElectric] = this.NO_EFECTIVE_VALUE;
    //Electric -> Water
    var electricWater = [this.POKEMON_TYPES[3], this.POKEMON_TYPES[1]];
    this.pokemonTypeEfecctivnes[waterElectric] = this.SUPER_EFECTIVE_VALUE;

  }
  /**
   * Public method that is  meant to be used outside of the class.
   * This method purpose is to return the a relationship between two types.
   * @return {floar}  it return the efectivness value assign to the relationship between two types.
   * @private
   */
  getEfectivness(attackType, defenseType) {
    var attackMade = [attackType, defenseType];
    return this.pokemonTypeEfecctivnes[attackMade]
  }

}
