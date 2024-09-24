interface UserSerializer {
  uid: string;
  firstName: string;
  lastName: string;
  ci: number;
  email: string;
  role: UserRole;
}

export class User {
  static fromFirebase({
    uid,
    firstName,
    lastName,
    ci,
    email,
    role,
  }: UserSerializer) {
    return new User(uid, firstName, lastName, ci, email, role);
  }

  constructor(
    public uid: string,
    public firstName: string,
    public lastName: string,
    public ci: number,
    public email: string,
    public role: UserRole
  ) {}
}

export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}
