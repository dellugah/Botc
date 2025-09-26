import {Demons, Minions, Role, Roles} from './Role';

export class Player {
  get wasExecuted(): boolean {
    return this._wasExecuted;
  }

  set wasExecuted(value: boolean) {
    this._wasExecuted = value;
  }
  get scarletIsActive(): boolean {
    return this._scarletIsActive;
  }
  set scarletIsActive(value: boolean) {
    this._scarletIsActive = value;
  }
  get wasIndicated(): boolean {
    return this._wasIndicated;
  }
  set wasIndicated(value: boolean) {
    this._wasIndicated = value;
  }
  //GETTERS AND SETTERS
  get canNominate(): boolean {
    return this._canNominate;
  }
  set canNominate(value: boolean) {
    this._canNominate = value;
  }
  get hasDeadVote(): boolean {
    return this._hasDeadVote;
  }
  set hasDeadVote(value: boolean) {
    this._hasDeadVote = value;
  }
  get isMarkedForDeath(): boolean {
    return this._isMarkedForDeath;
  }
  set isMarkedForDeath(value: boolean) {
    this._isMarkedForDeath = value;
  }
  get hasAbility(): boolean {
    return this._hasAbility;
  }
  set hasAbility(value: boolean) {
    this._hasAbility = value;
  }
  get playerName(): string {
    return this._playerName;
  }
  set playerName(value: string) {
    this._playerName = value;
  }
  get playerAlignment(): string {
    return this._playerAlignment;
  }
  set playerAlignment(value: string) {
    this._playerAlignment = value;
  }
  get comments(): string {
    return this._comments;
  }
  set comments(value: string) {
    this._comments = value;
  }
  get isPoisoned(): boolean {
    return this._isPoisoned;
  }
  set isPoisoned(value: boolean) {
    this._isPoisoned = value;
  }
  get isDead(): boolean {
    return this._isDead;
  }
  set isDead(value: boolean) {
    this._isDead = value;
  }
  get isDrunk(): boolean {
    return this._isDrunk;
  }
  set isDrunk(value: boolean) {
    this._isDrunk = value;
  }
  get isProtected(): boolean {
    return this._isProtected;
  }
  set isProtected(value: boolean) {
    this._isProtected = value;
  }
  get isRedHearing(): boolean {
    return this._isRedHearing;
  }
  set isRedHearing(value: boolean) {
    this._isRedHearing = value;
  }
  get registeredAs(): Role {
    return <Role>this._registeredAs;
  }
  set registeredAs(value: Role) {
    this._registeredAs = value;
  }
  get playerRole(): Role {
    return <Role>this._playerRole;
  }
  set playerRole(value: Role) {
    this._playerRole = value;
  }

  //PLAYER & ROLE INFO
  private _playerName: string = "";
  private _playerAlignment: string = "neutral";
  private _comments: string = "";
  private _registeredAs: Role | undefined;
  private _playerRole: Role | undefined;
  private _canNominate: boolean = true;
  private _wasIndicated: boolean = false;

  //DEATH TRACKER
  private _hasDeadVote: boolean = true;
  private _hasAbility: boolean = true;
  private _isDead: boolean = false;
  private _scarletIsActive: boolean = false;
  private _wasExecuted: boolean = false;

  //STATUS ALIGNMENTS TRACKER
  private _isDrunk: boolean = false;
  private _isPoisoned: boolean = false;
  private _isProtected: boolean = false;
  private _isRedHearing: boolean = false;
  private _isMarkedForDeath: boolean = false; //trouble Brewing

  constructor(playerName: string) {
    this.playerName = playerName;
  }

  changeAlignment(): void {
    this.playerAlignment = this.playerAlignment?.valueOf() == "good" ? "evil" : "good";
  }

  buildRole(role: Roles): void;
  buildRole(role: Roles, register: Roles): void;

  buildRole(role : Roles , register? : Roles) : void {
    this.playerRole = new Role(role);
    this.registeredAs = new Role(register ?? role);

    if(role.valueOf() == "Mystery")  {
      //has no role
      this.playerAlignment = "neutral";
    } else if((Object.values(Minions) as string[]).includes(role as string)
      || (Object.values(Demons) as string[]).includes(role as string)){
      // is a Minion or demon
      this.playerAlignment = "evil";
    } else{
      // is townsfolk or outsider
      this.playerAlignment = "good";
    }

  }
  get normalizedRoleImageName(): string | null {
    const img = this._playerRole?.roleImage;
    if (!img) return null;
    // Remove slashes to use as a plain name if needed, lower-case, strip all spaces
    return img.replace(/\//g, '').toLowerCase().replace(/\s+/g, '');
  }

  toString(): string {
    return [
      this.playerName,
      this.playerAlignment,
      this.playerRole.roleName,
      this.registeredAs.roleName,
      this.canNominate,
      this.wasIndicated,
      this.hasDeadVote,
      this.hasAbility,
      this.isDead,
      this.wasExecuted,
      this.isDrunk,
      this.isPoisoned,
      this.isProtected,
      this.isRedHearing,
      this.isMarkedForDeath,
    ].join('|');
  }

  equals(other: Player): boolean {
    return this.toString() === other.toString();
  }
}
