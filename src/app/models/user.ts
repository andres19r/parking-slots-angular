export class User {
  constructor(
    public firstName: string,
    public lastName: string,
    public ci: number,
    public email: string,
    public role: UserRole,
  ) {}
}

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}
