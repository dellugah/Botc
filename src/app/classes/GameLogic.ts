import {Player} from './Player';
import {Role, Roles, WakeFirstNight, WakeOtherNights} from './Role';
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
    this.players = players;

    this.players.buildRoundPlayers(this.roundCounter);
    this.buildRoundPlayers(this.players)
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

  public buildWakePlayerSequence(){
    //first night build
    if(this.roundCounter == 0){
      this.firstNightPlayers = [];
      Object.values(WakeFirstNight).forEach(r => {
        Object.values(this.players.playerList).forEach(p => {
          if(p.playerRole.roleName.valueOf() == r.valueOf() && !p.isDead){
            this.firstNightPlayers.push(p);
          }
        })
      })
      for (let i = this.firstNightPlayers.length - 1; i >= 0; i--) {
        this.moveToFirst(this.firstNightPlayers[i]);
      }
    }
    else{
      //other nights build
      this.otherNightPlayers = [];
      Object.values(WakeOtherNights).forEach(r => {
        Object.values(this.players.playerList).forEach(p => {
          if(p.playerRole.roleName.valueOf() == r.valueOf() && !p.isDead){
            console.log(p.playerRole.roleName);
            this.otherNightPlayers.push(p);
          }
        })
      })
      for (let i = this.otherNightPlayers.length - 1; i >= 0; i--) {
        this.moveToFirst(this.otherNightPlayers[i]);
      }
    }
    this.wakePlayerSequence();
  }
  //SAVING GAME MODES FUNCTIONS

  // SAVE GAME DATA INTO THE KEYMAP
  // RESET GAME INFOS
  private saveInfo() : void{
    // this.players.buildRoundPlayers(this.roundCounter)                                UNCOMMENT WHEN IMPLEMENTED
    this.buildRoundPlayers(this.players) //save Round on key map
    this.resetMonkMark(); //reset monk mark for night phase
    this.renovateVotes(); //renovate votes & nominations
    this.resetDemonMark(); //reset demon mark for night phase
    this.resetPoisonMark(); //reset poison mark for night phase
    this.resetBlock(); //reset block player
  }

  nextRound(): void {
    //CHANGE TO NIGHT IF DAY
    if(this.isDay) this.changeToNightCycle();

    //EXECUTE THE ROUND CLEN
    this.executeBlockPlayer(); //execute block player
    this.roundCounter++; //increases the round counter
    this.isDawn = false; //resets the dawn flag
    this.wakeIndex = 0; //resets the wake index
    this.buildWakePlayerSequence(); //builds the wake player sequence

    // this.players.preserveComments(this.roundCounter);                                 UNCOMMENT WHEN IMPLEMENTED
    this.preserveComments(this.players);//                                               COMMENT WHEN DEPRECATED
    // if(this.players.hasRoundCount(this.roundCounter)){                                UNCOMMENT WHEN IMPLEMENTED
    if (!this.roundPlayers.has(this.roundCounter)) {//if the round is not in the map
      this.saveInfo();
    } else { //if the round is in the map
      // if(this.players.copyInfo(this.roundCounter)) this.saveInfo();                   UNCOMMENT WHEN IMPLEMENTED
      this.copyInfo();//                                                                 COMMENT WHEN DEPRECATED
    }
  }

  //BUILD ROUND PLAYERS
  //SAVE THE ROUND PLAYERS ON THE KEY MAP
  private buildRoundPlayers(players: Players): void {
    const snapshot = this.clonePlayers(players);
    this.roundPlayers.set(this.roundCounter - 1, snapshot);
  }

  //PRESERVE COMMENTS FROM THE PAST ROUND

  private preserveComments(players: Players): void {
    if (this.roundCounter <= 0) return;

    for (let roundIndex = 0; roundIndex < this.roundPlayers.size; roundIndex++) {
      const round = this.roundPlayers.get(roundIndex);
      if (!round) continue;

      const targetList = round.playerList;
      const sourceList = players.playerList;

      // Build a lookup map for faster matching by stable key (name + role)
      const sourceByKey = new Map<string, Player>();
      for (const s of sourceList) {
        const key = `${s.playerName}|${s.playerRole?.roleName}`;
        sourceByKey.set(key, s);
      }

      for (const targetPlayer of targetList) {
        if (!targetPlayer) continue;
        const key = `${targetPlayer.playerName}|${targetPlayer.playerRole?.roleName}`;
        const sourcePlayer = sourceByKey.get(key);
        if (!sourcePlayer) continue;
        targetPlayer.comments = sourcePlayer.comments;
      }
    }
  }

  // private preserveComments(players: Players): void {
  //   if (this.roundCounter <= 0) return;
  //
  //   for (let roundIndex = 0; roundIndex < this.roundPlayers.size; roundIndex++) {
  //     const round = this.roundPlayers.get(roundIndex);
  //     if (!round) continue;
  //
  //     const targetList = round.players;
  //     const sourceList = players.players;
  //     const len = Math.min(targetList.length, sourceList.length);
  //
  //     for (let playerIndex = 0; playerIndex < len; playerIndex++) {
  //         const targetPlayer = targetList[playerIndex];
  //         const sourcePlayer = sourceList[playerIndex];
  //         if (!targetPlayer || !sourcePlayer) continue;
  //         targetPlayer.comments = sourcePlayer.comments;
  //     }
  //   }
  // }

  //COPY GAME DATA FROM THE CURRENT ROUND WITH NEXT
  //BUT IF INFO CHANGED FROM THE CURRENT ROUND, SAVE THE CHANGES
  //AND DELETE ALL FUTURE ROUND DATA FROM THE KEYMAP
  private copyInfo() : void{
    if (this.roundCounter > 0) {
      this.testForChanges() //test if any info changed from this round to the one saved on the keymap
      if (this.hasChanged) {
        for (let i = this.roundPlayers.size; i >= this.roundCounter; i--) {
          this.roundPlayers.delete(i);
        }
        this.hasChanged = false;
        this.saveInfo();
      } else {
        this.players = this.clonePlayers(this.roundPlayers.get(this.roundCounter)!);
      }
    }
  }

  //TEST IF ANY INFO CHANGE FROM THE CURRENT ROUND IN RELATION TO FUTURE STORED DATA
  //IF SO, RESET THE HASCHANGED FLAG TO TRUE
  private testForChanges(): void {
    if(!this.hasChanged){
      let counter = 0;
      Object.values(this.roundPlayers.get(this.roundCounter - 1)?.playerList!).forEach(p => {
        if (!p.equals(this.players.playerList[counter])){
          this.hasChanged = true;
          return;
        }
        counter++;
      })
    }
  }

  //ROLLBACK GAME DATA
  protected rollbackRound(): void {
    this.isDawn = false; //resets the dawn flag
    this.wakeIndex = 0; //resets the wake index
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
    Object.values(source.playerList).forEach(p => {
      const np = new Player(p.playerName);
      // copy relevant state

      //UPDATE EVERY TIME A NEW VALUE IS ADDED TO THE PLAYER CLASS
      np.playerAlignment = p.playerAlignment;
      np.registeredAs = new Role(p.registeredAs.roleName);
      np.playerRole = new Role(p.playerRole.roleName);

      np.canNominate = p.canNominate;
      np.wasIndicated = p.wasIndicated;
      np.comments = p.comments;

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

      clone.playerList.push(np);
    });
    return clone;
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

  registerAs(self: Player, role: Roles): void {

    let selfRole: Role = new Role(self.playerRole.roleName);
    let selectedRole: Role = new Role(role);

    if(self.isPoisoned) self.registeredAs = selfRole;
    else self.registeredAs = selectedRole;

    console.log(self.playerRole.roleName);
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
