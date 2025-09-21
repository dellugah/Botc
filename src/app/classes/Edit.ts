import {Player} from './Player';
import {Injectable} from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Edit {
  get player(): Player | null {
    return this._player;
  }

  set player(value: Player | null) {
    this._player = value;
  }
  private _player : Player | null = null ;
}
