import {Player} from './Player';
import {Injectable} from '@angular/core';
import {Role} from './Role';

@Injectable({ providedIn: 'root' })
export class Players {
  get hasChanged(): boolean {
    return this._hasChanged;
  }

  set hasChanged(value: boolean) {
    this._hasChanged = value;
  }
  get playerList(): Player[] {
    return this._playerList;
  }
  set playerList(value: Player[]) {
    this._playerList = value;
  }

  private _hasChanged : boolean = false;

  private _playerList: Player[] = [];

  private history: Map<number, Players> = new Map();

  public buildRoundPlayers(roundCounter : number): void {
    const snapshot = this.clonePlayers(roundCounter);
    this.history.set(roundCounter - 1, snapshot);
  }

  public preserveComments(roundCounter : number): void {
    if (roundCounter <= 0) return;

    for (let roundIndex = 0; roundIndex < this.history.size; roundIndex++) {
      const round = this.history.get(roundIndex);
      if (!round) continue;

      const targetList = round.playerList;
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

  private clonePlayers(roundCounter : number): Players {
    const clone = new Players();
    Object.values(this.history.get(roundCounter)!).forEach(p => {
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

  public copyInfo(roundCounter : number) : boolean{
    if (roundCounter > 0) {
      this.testForChanges(roundCounter) //test if any info changed from this round to the one saved on the keymap
      if (this._hasChanged) {
        for (let i = this.history.size; i >= roundCounter; i--) {
          this.history.delete(i);
        }
        this._hasChanged = false;
        return true;
        // this.saveInfo(roundCounter);
      } else {
        this._playerList = this.clonePlayers(roundCounter).playerList;
      }
    }
    return false;
  }

  private testForChanges(roundCounter : number): void {
    if(!this._hasChanged){
      let counter = 0;
      Object.values(this.history.get(roundCounter - 1)?.playerList!).forEach(p => {
        if (!p.equals(this.playerList[counter])){
          this._hasChanged = true;
          return;
        }
        counter++;
      })
    }
  }

  hasRoundCount(roundCounter : number) : boolean {
    return this.history.has(roundCounter);
  }
}
