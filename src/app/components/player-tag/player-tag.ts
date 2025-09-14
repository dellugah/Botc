import {Component, OnInit} from '@angular/core';
import {Players} from '../../classes/Players';
import {Minions, Outsiders, Role, Roles, Townsfolk, wakeFirstNight, wakeOtherNights} from '../../classes/Role';
import {Player} from '../../classes/Player';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-player-tag',
  imports: [
    FormsModule
  ],
  templateUrl: './player-tag.html',
  styleUrl: './player-tag.css'
})

export class PlayerTag implements OnInit{
  roundCounter: number = 0;
  isDay: boolean = false;
  roundCycle = "night";
  opposite: string = "/day_flag.png";

  protected readonly Roles = Roles;
  protected readonly Object = Object;
  protected readonly Townsfolk = Townsfolk;
  protected readonly Outsider = Outsiders;
  protected readonly Minion = Minions;

  protectedPlayer: Player | null = null;
  poisonedPlayer: Player | null = null;
  markedForDeathPlayer: Player | null = null;

  firstNightPlayers: Player[] = [];
  otherNightPlayers: Player[] = [];
  wakePlayer: string = "";
  wakeIndex: number = 0;
  isDawn: boolean = false;

  executeMode: boolean = false;


  constructor(protected players: Players) {
    this.players = players;
  }

  ngOnInit() {

    //CHANGE ONCE GATHER PLAYERS IS DONE
    let player: Player;
    Object.values(Roles).forEach(role => {
      player = new Player(role);
      player.playerName = role + " Player";
      this.players.players.push(player);
    })

    this.buildWakePlayerSequence();
    console.log(this.wakePlayer);
  }

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
      this.wakePlayer = "";
      this.isDawn = true;
      return;
    }
    else {
      this.wakePlayer = list[this.wakeIndex].playerRole.roleImage;
      this.wakeIndex++;
    }

    // optional debug
    console.log(this.wakeIndex, list.length);
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


  protected readonly Outsiders = Outsiders;
}
