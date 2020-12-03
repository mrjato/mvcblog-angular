export class Credentials {
  public constructor(
    public username: string,
    public passwd: string
  ) {}

  public asToken() {
    return btoa(this.username + ':' + this.passwd);
  }
}
