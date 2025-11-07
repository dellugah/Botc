import {Injectable} from '@angular/core';

@Injectable({ providedIn: 'root' })
export class MenuController {
  abilityMenu : boolean = false;
  commentMenu : boolean = false;
  roleMenu : boolean = false;

  public abilityMenuToggle() : void {
    this.abilityMenu = !this.abilityMenu;
  }

  public commentMenuToggle() : void {
    this.commentMenu = !this.commentMenu;
  }

  public roleMenuToggle() : void {
    this.roleMenu = !this.roleMenu;
  }
}
