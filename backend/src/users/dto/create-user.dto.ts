export class CreateUserDto {
  private readonly username: string;
  private readonly email: string;

  constructor(username: string, email: string) {
    this.username = username;
    this.email = email;
  }
}
