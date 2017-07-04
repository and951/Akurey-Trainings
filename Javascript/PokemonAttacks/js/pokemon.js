var pokemon = class {
  constructor(pName, pType, pAttack, pDefense, pSection) {
    this.name = pName;
    this.type = pType;
    this.attack = pAttack;
    this.defense = pDefense;
    this.sprite = "";
    this.section = pSection;
    console.log(JSON.stringify("SECTION " + this.section));
    this.getExtraData();

  }
  loadEnviornment(actualPokemon) {
    this.sprite = actualPokemon.sprites.front_default;
    console.log(JSON.stringify("Attaching sprite to #pokemon" + this.section));
    var section = this.section;
    $("#pokemon" + section).attr("src", actualPokemon.sprites.front_default);
    $('#pokemon' + section).hover(function() {
      $('#pokemon'+ section).attr("src", actualPokemon.sprites.back_default)
    }, function() {
      $('#pokemon' + section).attr("src", actualPokemon.sprites.front_default)
    });
  }
  getExtraData() {
    var pokeUrl = "http://pokeapi.co/api/v2/pokemon-form/" + this.name;
    var thisClass = this;

    console.log(pokeUrl);
    $.ajax({
      url: pokeUrl,
      contentType: 'application/json',
      dataType: 'json',
      success: function(actualPokemon) {
        thisClass.loadEnviornment(actualPokemon);

      },
      error: function() {
        console.log("Error");
      }
    });

  }

}
