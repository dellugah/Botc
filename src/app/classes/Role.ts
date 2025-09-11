export class Role {

  roleName: Roles;
  roleImage: string;

  constructor(public role: Roles) {
    this.roleName = role;
    this.roleImage = "/" + this.roleName.replace(/\s+/g, "") + ".webp";
  }
}

export enum Roles {
  // ---- NIGHT START ----
  POISONER = "Poisoner",     // Chooses a player
  MONK = "Monk",             // Chooses a player
  SPY = "Spy",               // Sees the Grimoire
  SCARLET_WOMAN = "Scarlet Woman", // If Demon changed
  IMP = "Imp",               // Demon acts
  RAVEN_KEEPER = "Raven Keeper",   // If died tonight, learns a role
  UNDERTAKER = "Undertaker", // Sees executed player's role
  EMPATH = "Empath",         // Learns neighbors' alignments
  FORTUNE_TELLER = "Fortune Teller", // Chooses 2 players
  BUTLER = "Butler",         // Chooses a player
  // ---- NIGHT END ----

  // TOWNSFOLK not in night order (daytime or passive abilities)
  WASHERWOMAN = "Washerwoman",
  LIBRARIAN = "Librarian",
  INVESTIGATOR = "Investigator",
  CHEF = "Chef",
  VIRGIN = "Virgin",
  SLAYER = "Slayer",
  SOLDIER = "Soldier",
  MAYOR = "Mayor",

  // OUTSIDERS
  RECLUSE = "Recluse",
  SAINT = "Saint",

  // MINIONS not in night order
  BARON = "Baron",
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
  MONK = "Monk",
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
