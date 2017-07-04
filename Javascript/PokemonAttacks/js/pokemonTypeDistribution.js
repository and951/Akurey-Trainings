var pokemonType = class {
  constructor() {
    this.POKEMON_TYPES = ["Fire", "Grass", "Water", "Electric"];
    this.NO_EFECTIVE_VALUE = 0.5;
    this.SUPER_EFECTIVE_VALUE = 2;
    this.NEUTRAL_VALUE = 1;
    this.pokemonTypeEfecctivnes = {};
    this.generatePokemonTypeEfectivness();
  }

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
  getEfectivness(attackType, defenseType) {
    var attackMade = [attackType, defenseType];
    console.log(this.pokemonTypeEfecctivnes[attackMade]);
    console.log("AttackType " + attackType + "DefenseType " + defenseType);
    return this.pokemonTypeEfecctivnes[attackMade]
  }

}
