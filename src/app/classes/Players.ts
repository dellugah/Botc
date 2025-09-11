import {Player} from './Player';
import {Injectable} from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Players {
  get players(): Player[] {
    return this._players;
  }
  set players(value: Player[]) {
    this._players = value;
  }
  private _players: Player[] = [];
}
