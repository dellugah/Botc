export class Role {

  roleName: Roles;
  roleImage: string;

  constructor(public role: Roles) {
    this.roleName = role;
    this.roleImage = "/" + this.roleName.replace(/\s+/g, "") + ".webp";
  }
}

export enum Roles {
  //GENERAL
  NONE = "Mystery",

  //TOWNSFOLK
  MONK = "Monk",
  RAVEN_KEEPER = "Raven Keeper",
  UNDERTAKER = "Undertaker",
  EMPATH = "Empath",
  FORTUNE_TELLER = "Fortune Teller",
  WASHERWOMAN = "Washerwoman",
  LIBRARIAN = "Librarian",
  INVESTIGATOR = "Investigator",
  CHEF = "Chef",
  VIRGIN = "Virgin",
  SLAYER = "Slayer",
  SOLDIER = "Soldier",
  MAYOR = "Mayor",

  //OUTSIDERS
  BUTLER = "Butler",
  RECLUSE = "Recluse",
  SAINT = "Saint",
  DRUNK = "Drunk",

  //MINIONS
  POISONER = "Poisoner",
  SPY = "Spy",
  SCARLET_WOMAN = "Scarlet Woman",
  BARON = "Baron",

  //DEMONS
  IMP = "Imp"
}

export enum Townsfolk{
  WASHERWOMAN = "Washerwoman",
  LIBRARIAN = "Librarian",
  INVESTIGATOR = "Investigator",
  CHEF = "Chef",
  VIRGIN = "Virgin",
  SLAYER = "Slayer",
  SOLDIER = "Soldier",
  MAYOR = "Mayor",
  RAVEN_KEEPER = "Raven Keeper",
  UNDERTAKER = "Undertaker",
  EMPATH = "Empath",
  FORTUNE_TELLER = "Fortune Teller",
  MONK = "Monk"
}

export enum Outsiders{
  RECLUSE = "Recluse",
  SAINT = "Saint",
  BUTLER = "Butler",
  DRUNK = "Drunk"
}

export enum Minions{
  BARON = "Baron",
  SPY = "Spy",
  SCARLET_WOMAN = "Scarlet Woman",
  POISONER = "Poisoner"
}

export enum wakeFirstNight{
  POISONER = "Poisoner",
  SPY = "Spy",
  WASHERWOMAN = "Washerwoman",
  LIBRARIAN = "Librarian",
  INVESTIGATOR = "Investigator",
  CHEF = "Chef",
  EMPATH = "Empath",
  FORTUNE_TELLER = "Fortune Teller",
  BUTLER = "Butler"
}

export enum wakeOtherNights{
  POISONER = "Poisoner",
  MONK = "Monk",
  SPY = "Spy",
  SCARLET_WOMAN = "Scarlet Woman",
  IMP = "Imp",
  RAVEN_KEEPER = "Raven Keeper",
  UNDERTAKER = "Undertaker",
  EMPATH = "Empath",
  FORTUNE_TELLER = "Fortune Teller",
  BUTLER = "Butler",
}


