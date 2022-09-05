import { compare, hash } from "bcryptjs";
import dbUsers from "../dal/db-users";
import { AppError } from "../middlewares/error-handler";

class AuthService {
  async signup(username: string, password: string) {
    const foundUser = await dbUsers.getUserByName(username);
    if(foundUser) throw AppError.BadRequest("User already exists");
    const hashed = await hash(password, 12);
    const userId = await dbUsers.addUser(username, hashed);
    return userId;
  }
  async login(username: string, password: string) {
    const foundUser = await dbUsers.getUserWithCredentials(username);
    if(!foundUser) throw AppError.BadRequest("User does not exist");
    const isValid = await compare(password, foundUser.password);
    if(!isValid) throw AppError.BadRequest("Invalid password");
    return foundUser;
  }
} 

export default new AuthService();