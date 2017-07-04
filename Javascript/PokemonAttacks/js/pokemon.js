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
