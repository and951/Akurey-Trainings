var pokemon = class {
  constructor(pName, pType, pAttack, pDefense) {
    this.name = pName;
    this.type = pType;
    this.attack = pAttack;
    this.defense = pDefense;
    this.sprite = "";
    this.getExtraData();

  }
  loadEnviornment(pPokemonId) {

  }
  getExtraData() {
    var pokeUrl = "http://pokeapi.co/api/v2/pokemon-form/" + this.name;
    console.log(pokeUrl);
    $.ajax({
      url: pokeUrl,
      contentType: 'application/json',
      dataType: 'json',
      success: function(actualPokemon) {
        console.log(JSON.stringify(actualPokemon));
        this.sprite = actualPokemon.sprites.front_default;
        $("#pokemon1").attr("src",actualPokemon.sprites.front_default);
        $('#pokemon1').hover(function(){$('#pokemon1').attr("src",actualPokemon.sprites.back_default)},function(){$('#pokemon1').attr("src",actualPokemon.sprites.front_default)});
      },
      error: function() {
        console.log("Error");
      }
    });

  }

}
