import {Player} from './Player';
import {Injectable} from '@angular/core';
import {Role, WakeFirstNight, WakeOtherNights} from './Role';

@Injectable({ providedIn: 'root' })
export class Players {

  //VARIABLES

  private _hasChanged : boolean = false; //KEEP TRACK IF INFORMATION ON PLAYERS HAVE CHANGED FROM ROUNDS TO ROUND

  private _playerList: Player[] = []; //STORE ALL PLAYERS ON THE GAME

  private _history: Map<number, Player[]> = new Map(); //STORE ALL STATES OF THE GAME

  public wakeSequence: Player[] = []; //STORE ALL PLAYERS WHO WILL WAKE IN THE NIGHT

  public firstNightPlayers: Player[] = []; //STORE ALL PLAYERS WHO WILL WAKE IN THE FIRST NIGHT

  public otherNightPlayers: Player[] = []; //STORE ALL PLAYERS WHO WILL WAKE IN THE OTHER NIGHTS

  public selectedPlayer : Player | null = null;


  //GETTERS & SETTERS

  get playerList(): Player[] {
    return this._playerList;
  }

  set playerList(value: Player[]) {
    this._playerList = value;
  }


  //FUNCTIONS

  //CREATE A LIST OF PLAYERS FOR THE GIVE ROUND
  public buildRoundPlayers(roundCounter : number): void {
    const snapshot = this.clonePlayers(roundCounter);
    this._history.set(roundCounter - 1, snapshot);
  }

  //PRESERVE COMMENTS FROM THE PAST ROUND ON EVERY INSTANCE OF PLAYERS ON EVERY ROUND
  public preserveComments(roundCounter : number): void {
    if (roundCounter <= 0) return;

    for (let roundIndex = 0; roundIndex < this._history.size; roundIndex++) {
      const round = this._history.get(roundIndex);
      if (!round) continue;

      const targetList = round;
      const sourceList = this.playerList;

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

  //MAKE A COPY OF THE PLAYERS ON THE ROUND COUNTER
  public clonePlayers(roundCounter : number): Player[] {
    const clone : Player[] = [];

    const playerList = this._history.has(roundCounter) ? this._history.get(roundCounter)! : this._playerList;

    playerList.forEach(p => {
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

      clone.push(np)
    });

    return clone;
  }

  //COPY GAME DATA FROM THE CURRENT ROUND WITH NEXT
  //BUT IF INFO CHANGED FROM THE CURRENT ROUND, SAVE THE CHANGES
  //AND DELETE ALL FUTURE ROUND DATA FROM THE KEYMAP
  public hasRoundCount(roundCounter : number) : boolean {
    return this._history.has(roundCounter);
  } //TEST TO SEE IF THE ROUND EXISTS ON THE HISTORY

  //DEFINES WHICH PLAYERS WAKE UP ON EACH NIGHT
  public buildWakePlayerSequence(roundCounter : number){
    //first night build
    if(roundCounter == 0){
      this.firstNightPlayers = [];
      Object.values(WakeFirstNight).forEach(r => {
        Object.values(this.playerList).forEach(p => {
          if(p.playerRole.roleName.valueOf() == r.valueOf() && !p.isDead){
            this.firstNightPlayers.push(p);
          }
        })
      })
    }
    else{
      //other nights build
      this.otherNightPlayers = [];
      Object.values(WakeOtherNights).forEach(r => {
        Object.values(this.playerList).forEach(p => {
          if(p.playerRole.roleName.valueOf() == r.valueOf() && !p.isDead){
            this.otherNightPlayers.push(p);
          }
        })
      })
    }
  }

  public copyPlayers(roundCounter : number): void {
    if (this._history.has(roundCounter)) {
      this._playerList = this.clonePlayers(roundCounter);
    }
  }

  public testForChanges(changed : boolean, roundCounter : number): boolean {
    let changedFlag : boolean = false;
    if(!changed){
      let counter = 0;
      Object.values(this._history.get(roundCounter - 1)!).forEach(p => {
        if (!p.equals(this.playerList[counter])){
          changedFlag = true;
        }
        counter++;
      })
    }
    return changedFlag;
  }

  public deleteAllRoundsAfter(roundCounter : number): void {
    for (let i = this._history.size; i >= roundCounter; i--) {
      // this.players.history.delete(i);//test
      this._history.delete(i);
    }
  }

  public resetMap(): void {
    this._history.clear();
  }

}
