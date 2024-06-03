import { controller, httpGet } from "inversify-express-utils";

@controller("/users")
export class UsersController {
    @httpGet("/")
    public async getUsers() {
        return "users";
    }
}
