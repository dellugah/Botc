import {Player} from './Player';
import {Role, Roles, wakeFirstNight, wakeOtherNights} from './Role';
import {Players} from './Players';

export class gameLogic {
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
  }

  //GAME FUNCTIONS

  cycleDay(): void {
    if(this.isDay){//move to the night phase
      this.renovateVotes(); //renovate votes & nominations
      this.executeMode = false; //resets the execute mode
      this.roundCounter ++; //increases the round counter
      this.isDay = !this.isDay ; //changes the day to night
      this.roundCycle = "night"; //changes the round cycle to night
      this.opposite = "/day_flag.png"; //changes the opposite flag to day
      this.buildWakePlayerSequence(); //builds the wake player sequence
      this.resetDemonMark() //reset demon mark for night phase
      this.resetPoisonMark() //reset poison mark for night phase
      this.resetBlock()
    }
    else{//move to day phase
      this.isDawn = false; //resets the dawn flag
      this.wakeIndex = 0; //resets the wake index
      this.isDay = !this.isDay; //changes the day to night
      this.roundCycle = "day"; //changes the round cycle to day
      this.opposite = "/night_flag.png"; //changes the opposite flag to night
      this.resetMonkMark() //reset monk mark for night phase
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
      Object.values(wakeFirstNight).forEach(r => {
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
      Object.values(wakeOtherNights).forEach(r => {
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

  resetMonkMark(): void{
    Object.values(this.players.players).forEach(p => {
      if(p.isProtected){
        p.isProtected = false;
      }
    })
    this.protectedPlayer = null;
  }

  spendAbility(self : Player): void {
    self.hasAbility = !self.hasAbility;
  }

  resetBlock() : void{
    this.blockPlayer = {playerRole: "", playerName: ""}; //resets the block player
  }
}
