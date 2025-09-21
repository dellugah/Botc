import {Player} from './Player';
import {Injectable} from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Edit {
  player : Player | null = null ;
}
