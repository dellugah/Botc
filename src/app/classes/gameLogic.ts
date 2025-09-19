import {Player} from './Player';
import {Role, Roles, WakeFirstNight, WakeOtherNights} from './Role';
import {Players} from './Players';

export class gameLogic {
  roundPlayers: Map<number, Players> = new Map();

  roundCounter: number = 0;
  isDay: boolean = false;
  roundCycle = "night";
  opposite: string = "/day_flag.png";

  protectedPlayer: Player | null = null;
  poisonedPlayer: Player | null = null;
  markedForDeathPlayer: Player | null = null;

  firstNightPlayers: Player[] = [];
  otherNightPlayers: Player[] = [];

  wakePlayer: {
    playerRole: string,
    playerName: string,
  } = {
    playerRole: "",
    playerName: ""
  };

  blockPlayer: {
    playerRole: string,
    playerName: string,
  } = {
    playerRole: "",
    playerName: ""
  }
  wakeIndex: number = 0;
  isDawn: boolean = false;

  executeMode: boolean = false;

  constructor(protected players: Players) {
    this.players = players;
    this.buildRoundPlayers(this.players)
  }

  //GAME FUNCTIONS

  cycleDay(): void {
    if(this.isDay){//move to the night phase
      this.executeMode = false; //resets the execute mode
      this.isDay = !this.isDay ; //changes the day to night
      this.roundCycle = "night"; //changes the round cycle to night
      this.opposite = "/day_flag.png"; //changes the opposite flag to day
      this.executeBlockPlayer(); //execute block player
      this.roundCounter ++; //increases the round counter

      if(!this.roundPlayers.has(this.roundCounter)){
        this.saveInfo();
      } else{
        this.copyInfo();
      }
    }

    else{//move to day phase
      this.isDawn = false; //resets the dawn flag
      this.wakeIndex = 0; //resets the wake index
      this.isDay = !this.isDay; //changes the day to night
      this.roundCycle = "day"; //changes the round cycle to day
      this.opposite = "/night_flag.png"; //changes the opposite flag to night
      this.resetMonkMark(); //reset monk mark for night phase
    }
  }

  changeMode(): void {
    this.executeMode = !this.executeMode;
  }

  //improve to see players in real time
  buildWakePlayerSequence(){

    //first night build
    if(this.roundCounter == 0){
      this.firstNightPlayers = [];
      Object.values(WakeFirstNight).forEach(r => {
        Object.values(this.players.players).forEach(p => {
          if(p.playerRole.roleName.valueOf() == r.valueOf() && !p.isDead){
            console.log(p.playerRole.roleName);
            this.firstNightPlayers.push(p);
          }
        })
      })
    }
    else{
      //other nights build
      this.otherNightPlayers = [];
      Object.values(WakeOtherNights).forEach(r => {
        Object.values(this.players.players).forEach(p => {
          if(p.playerRole.roleName.valueOf() == r.valueOf() && !p.isDead){
            console.log(p.playerRole.roleName);
            this.otherNightPlayers.push(p);
          }
        })
      })
    }
    this.wakePlayerSequence();
  }

  //build round players with a copy of each player on the players array
  buildRoundPlayers(players: Players): void {
    const snapshot = this.clonePlayers(players);
    this.roundPlayers.set(this.roundCounter - 1, snapshot);
  }

  saveInfo() : void{
    this.buildRoundPlayers(this.players) //save Round on key map
    this.renovateVotes(); //renovate votes & nominations
    this.resetDemonMark(); //reset demon mark for night phase
    this.resetPoisonMark(); //reset poison mark for night phase
    this.buildWakePlayerSequence(); //builds the wake player sequence
    this.resetBlock(); //reset block player
  }

  copyInfo() : void{
    for (let i = this.roundCounter; i < this.roundPlayers.size; i++) {
      if(this.roundPlayers.get(this.roundCounter)?.players[i] != this.players.players[i]){
        this.saveInfo();
        return;
      }
    }
    this.players = this.clonePlayers(this.roundPlayers.get(this.roundCounter)!);
  }

  rollbackRound(): void {
    if (this.roundCounter > 0) {
      this.roundCounter--;
      const snapshot = this.roundPlayers.get(this.roundCounter);
      if (snapshot) {
        // restore a fresh clone to avoid future mutations changing the stored snapshot
        this.players = this.clonePlayers(snapshot);
      }
    }
  }

  private clonePlayers(source: Players): Players {
    const clone = new Players();
    Object.values(source.players).forEach(p => {
      const np = new Player(p.playerName);
      // copy relevant state
      np.playerAlignment = p.playerAlignment;
      np.comments = p.comments;
      np.registeredAs = new Role(p.registeredAs.roleName);
      np.playerRole = new Role(p.playerRole.roleName);

      np.canNominate = p.canNominate;
      np.wasIndicated = p.wasIndicated;

      np.hasDeadVote = p.hasDeadVote;
      np.hasAbility = p.hasAbility;
      np.isDead = p.isDead;
      np.scarletIsActive = p.scarletIsActive;
      np.wasExecuted = p.wasExecuted;

      np.isDrunk = p.isDrunk;
      np.isPoisoned = p.isPoisoned;
      np.isProtected = p.isProtected;
      np.isRedHearing = p.isRedHearing;
      np.isMarkedForDeath = p.isMarkedForDeath;

      clone.players.push(np);
    });
    return clone;
  }

  wakePlayerSequence(): void {
    if (this.isDawn) return;

    const list = this.roundCounter > 0 ? this.otherNightPlayers : this.firstNightPlayers;

    if (this.wakeIndex >= list.length) {
      this.wakePlayer.playerRole = "";
      this.wakePlayer.playerName = "";
      this.isDawn = true;
      return;
    }
    else {
      this.wakePlayer.playerRole = list[this.wakeIndex].playerRole.roleImage;
      this.wakePlayer.playerName = list[this.wakeIndex].playerName;
      this.wakeIndex++;
    }

    // optional debug
    console.log(this.wakeIndex, list.length);
  }

  nominatePlayer( player: Player): void {
    this.blockPlayer.playerRole = player.playerRole.roleImage;
    this.blockPlayer.playerName = player.playerName;
  }

  poisonerTarget(player: Player): void {
    Object.values(this.players.players).forEach(p => {
      if (p.isPoisoned) {
        p.isPoisoned = false;
      }
    })
    player.isPoisoned = true;
  }

  registerAs(self: Player, role: Roles): void {

    let selfRole: Role = new Role(self.playerRole.roleName);
    let selectedRole: Role = new Role(role);

    if(self.isPoisoned) self.registeredAs = selfRole;
    else self.registeredAs = selectedRole;

    console.log(self.playerRole.roleName);
  }

  markForDeath(self: Player, player: Player | null): void {
    if(!self.isPoisoned && !self.isDrunk){
      Object.values(this.players.players).forEach(p => {
        if(p.isMarkedForDeath){
          p.isMarkedForDeath = false;
        }
      })
      if (player) { //test for null
        player.isMarkedForDeath = true;
      }
    }
  }

  nominatedPlayer(self : Player): void{
    self.canNominate = !self.canNominate;
  }

  wasNominated(self : Player): void{
    self.wasIndicated = !self.wasIndicated;
    if(self.wasIndicated){
      this.nominatePlayer(self);
    }
  }

  spendDeadVote(self : Player): void {
    self.hasDeadVote = !self.hasDeadVote;
  }

  renovateVotes(): void {
    Object.values(this.players.players).forEach(p => {
      if(!p.isDead){
        p.canNominate = true;
        p.wasIndicated = false;
      }
    })
  }

  resetDemonMark(): void {
    Object.values(this.players.players).forEach(p => {
      if(p.isMarkedForDeath){
        p.isMarkedForDeath = false;
      }
    })
    this.markedForDeathPlayer = null;
  }

  resetPoisonMark(): void {
    Object.values(this.players.players).forEach(p => {
      if(p.isPoisoned){
        p.isPoisoned = false;
      }
    })
    this.poisonedPlayer = null;
  }

  spendAbility(self : Player): void {
    self.hasAbility = !self.hasAbility;
  }

  resetBlock() : void{
    this.blockPlayer = {playerRole: "", playerName: ""}; //resets the block player
  }

  //TROUBLE BREWING SPECIFIC
  resetMonkMark(): void{
    Object.values(this.players.players).forEach(p => {
      if(p.isProtected){
        p.isProtected = false;
      }
    })
    this.protectedPlayer = null;
  }

  executeBlockPlayer(): void {
    Object.values(this.players.players).forEach(p => {
      console.log(p.playerRole.roleImage.valueOf().toLowerCase());
      console.log(this.blockPlayer.playerRole);
      if(p.playerRole.roleImage.valueOf().toLowerCase() == this.blockPlayer.playerRole.toLowerCase()
        && p.playerName == this.blockPlayer.playerName){

        p.isDead = true;
        p.wasExecuted = true;
      }
    })
}

  monkTarget(self: Player, player: Player): void {
    if(!self.isPoisoned && !self.isDrunk){
      Object.values(this.players.players).forEach(p => {
        if(p.isProtected){
          p.isProtected = false;
        }
      })
      player.isProtected = true;
    }
  }
}
