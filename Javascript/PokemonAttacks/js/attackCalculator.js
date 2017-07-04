var  calculateAttack = function(){
  var typesDistribution = new pokemonType();
  var attackType = document.getElementById('attackType').value;
  var defenseType = document.getElementById('defenseType').value;
  console.log(attackType + " "+defenseType);
  console.log(100*typesDistribution.getEfectivness(attackType,defenseType));
}
var createPokemon= function(pSection){
  var name =  document.getElementById('name'+pSection).value;
  var type = document.getElementById('type'+pSection).value;
  var attack = document.getElementById('attack'+pSection).value;
  var defense = document.getElementById('defense'+pSection).value;
  var pokemonInstance = new pokemon(name,type,attack,defense);
  console.log(JSON.stringify(pokemonInstance));
}
