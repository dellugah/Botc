import { Routes } from '@angular/router';
import {PlayerTag} from './components/player-tag/player-tag';
import {GatherPlayers} from './components/gather-players/gather-players';
import {RoleSelection} from './components/role-selection/role-selection';

export const routes: Routes = [

  {
    path: '',
    component: GatherPlayers
  },
  {
    path: 'player-tag',
    component: PlayerTag
  },
  {
    path: 'role-selection',
    component: RoleSelection
  }


];
