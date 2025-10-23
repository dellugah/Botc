import {Player} from './Player';
import {Players} from './Players';

export class GameLogic {
  roundPlayers: Map<number, Players> = new Map();

  roundCounter: number = 0;
  isDay: boolean = false;
  roundCycle = "night";
  opposite: string = "/day_flag.png";
  hasChanged : boolean = false;

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
    players.buildRoundPlayers(this.roundCounter);
    }

  //GAME FUNCTIONS

  cycleDay(): void {
    if(this.isDay){//move to the night phase
      this.changeToNightCycle()
    }
    else{//move to day phase
      this.changeToDayCycle()
    }
  }

  changeMode(): void {
    this.executeMode = !this.executeMode;
  }

  changeToDayCycle(): void {
    this.isDawn = false; //resets the dawn flag
    this.wakeIndex = 0; //resets the wake index
    this.isDay = !this.isDay; //changes the day to night
    this.roundCycle = "day"; //changes the round cycle to day
    this.opposite = "/night_flag.png"; //changes the opposite flag to night
  }

  changeToNightCycle(): void {
    this.executeMode = false; //resets the execute mode
    this.isDay = !this.isDay ; //changes the day to night
    this.roundCycle = "night"; //changes the round cycle to night
    this.opposite = "/day_flag.png"; //changes the opposite flag to day
    this.wakePlayerSequence()
  }
  //SAVING GAME MODES FUNCTIONS
  // SAVE GAME DATA INTO THE KEYMAP
  // RESET GAME INFOS

  nextRound(): void {
    //CHANGE TO NIGHT IF DAY
    if(this.isDay) this.changeToNightCycle();

    //EXECUTE THE ROUND CLEN
    this.executeBlockPlayer(); //execute block player
    this.roundCounter++; //increases the round counter
    this.isDawn = false; //resets the dawn flag
    this.wakeIndex = 0; //resets the wake index
    this.players.buildWakePlayerSequence(this.roundCounter);
    this.players.preserveComments(this.roundCounter);
    if(!this.players.hasRoundCount(this.roundCounter)){
      this.saveInfo();
    } else { //if the round is in the map
      this.copyInfo();
    }
    this.wakePlayerSequence();
  }

  private saveInfo() : void{
    this.players.buildRoundPlayers(this.roundCounter)//                                UNCOMMENT WHEN IMPLEMENTED
    this.resetMonkMark(); //reset monk mark for night phase
    this.renovateVotes(); //renovate votes & nominations
    this.resetDemonMark(); //reset demon mark for night phase
    this.resetPoisonMark(); //reset poison mark for night phase
    this.resetBlock(); //reset block player
  }//                                    changes were made to implement new players

  private copyInfo() : void{
    if (this.roundCounter > 0) {
      this.testForChanges() //test if any info changed from this round to the one saved on the keymap
      if (this.hasChanged) {
        this.players.deleteAllRoundsAfter(this.roundCounter);
        this.hasChanged = false;
        this.saveInfo();
      } else {
        this.players.copyPlayers(this.roundCounter);
      }
    }
  }

  private testForChanges(): void {
    this.hasChanged = this.players.testForChanges(this.hasChanged, this.roundCounter);
  }

  //ROLLBACK GAME DATA
  protected rollbackRound(): void {
    this.isDawn = false; //resets the dawn flag
    this.wakeIndex = 0; //resets the wake index
    if (this.roundCounter > 0) {
      this.roundCounter--;
      this.players.copyPlayers(this.roundCounter);
    }
    this.wakePlayerSequence();
  }


  //GAME FUNCTIONS

  //COMMENTS NEED TO ALSO BE MOVED
  moveToLast(p : Player): void {
    const index = this.players.playerList.indexOf(p);
    if (index !== -1) {
      const moved = this.players.playerList.splice(index, 1)[0];
      this.players.playerList.push(moved);
    }
  }

  //COMMENTS NEED TO ALSO BE MOVED
  moveToFirst(p : Player): void {
    const index = this.players.playerList.indexOf(p);
    if (index > 0) {
      const moved = this.players.playerList.splice(index, 1)[0];
      this.players.playerList.unshift(moved);
    }

  }

  blockOrKillPlayer(player : Player): void {
    if(this.executeMode){
      this.nominatePlayer(player);
    } else{
      player.isDead = true;
      this.moveToLast(player);
    }
  }

  resurrectPlayer(player : Player): void {
    player.isDead = false;
    player.wasExecuted = false;
    this.moveToFirst(player);
  }

  wakePlayerSequence(): void {
    if (this.isDawn) return;

    const list = this.roundCounter > 0 ? this.players.otherNightPlayers : this.players.firstNightPlayers;

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
  }

  nominatePlayer( player: Player): void {
    this.blockPlayer.playerRole = player.playerRole.roleImage;
    this.blockPlayer.playerName = player.playerName;
  }

  poisonerTarget(player: Player): void {
    Object.values(this.players.playerList).forEach(p => {
      if (p.isPoisoned) {
        p.isPoisoned = false;
      }
    })
    player.isPoisoned = true;
  }

  markForDeath(self: Player, player: Player | null): void {
    if(!self.isPoisoned && !self.isDrunk){
      Object.values(this.players.playerList).forEach(p => {
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
  }

  spendDeadVote(self : Player): void {
    self.hasDeadVote = !self.hasDeadVote;
  }

  renovateVotes(): void {
    Object.values(this.players.playerList).forEach(p => {
      if(!p.isDead){
        p.canNominate = true;
        p.wasIndicated = false;
      }
    })
  }

  resetDemonMark(): void {
    Object.values(this.players.playerList).forEach(p => {
      if(p.isMarkedForDeath){
        p.isMarkedForDeath = false;
      }
    })
    this.markedForDeathPlayer = null;
  }

  resetPoisonMark(): void {
    Object.values(this.players.playerList).forEach(p => {
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

  executeBlockPlayer(): void {
    Object.values(this.players.playerList).forEach(p => {
      console.log(p.playerRole.roleImage.valueOf().toLowerCase());
      console.log(this.blockPlayer.playerRole);
      if(p.playerRole.roleImage.valueOf().toLowerCase() == this.blockPlayer.playerRole.toLowerCase()
        && p.playerName == this.blockPlayer.playerName){
        p.isDead = true;
        p.wasExecuted = true;
        const index = this.players.playerList.indexOf(p);
        if (index !== -1) {
          const moved = this.players.playerList.splice(index, 1)[0];
          this.players.playerList.push(moved);
        }
      }
    })
  }

  //TROUBLE BREWING SPECIFIC
  resetMonkMark(): void{
    Object.values(this.players.playerList).forEach(p => {
      if(p.isProtected){
        p.isProtected = false;
      }
    })
    this.protectedPlayer = null;
  }

  monkTarget(self: Player, player: Player): void {
    if(!self.isPoisoned && !self.isDrunk){
      Object.values(this.players.playerList).forEach(p => {
        if(p.isProtected){
          p.isProtected = false;
        }
      })
      player.isProtected = true;
    }
  }
}
