import { Container } from "inversify";
import { UsersController } from "../../users/infrastructure/UsersController";
import { DBContext } from "../local/DBContext";

const diContainer = new Container({
    defaultScope: "Singleton",
});

diContainer.bind<DBContext>(DBContext).toSelf();
diContainer.bind<UsersController>(UsersController).toSelf();

export default diContainer;
