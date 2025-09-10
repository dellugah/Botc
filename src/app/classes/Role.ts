export class Role {

  roleName: Roles;
  roleImage: string;

  constructor(public role: Roles) {
    this.roleName = role;
    this.roleImage = "/" + this.roleName.replace(/\s+/g, "") + ".webp";
  }
}

export enum Roles{

  //TOWNSFOLK

  WASHERWOMAN = "Washerwoman",
  LIBRARIAN = "Librarian",
  INVESTIGATOR = "Investigator",
  CHEF = "Chef",
  EMPATH = "Empath",
  FORTUNE_TELLER = "Fortune Teller",
  UNDERTAKER = "Undertaker",
  MONK = "Monk",
  RAVEN_KEEPER = "Raven Keeper",
  VIRGIN = "Virgin",
  SLAYER = "Slayer",
  SOLDIER = "Soldier",
  MAYOR = "Mayor",

  //OUTSIDERS

  BUTLER = "Butler",
  RECLUSE = "Recluse",
  SAINT = "Saint",

  //MINIONS

  POISONER = "Poisoner",
  SPY = "Spy",
  SCARLET_WOMAN = "Scarlet Woman",
  BARON = "Baron",

  //DEMONS

  IMP = "Imp"

}
