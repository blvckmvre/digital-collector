export interface IUser {
  id: number;
  username: string;
  displayname: string | null;
  location: string | null;
}

export interface IDBUser extends IUser {
  password: string;
}