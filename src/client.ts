import { Players } from "@rbxts/services"
import { Thread } from "./Util/Thread";

interface ControllerDefinition {
    
}

interface Controller {

}

interface KnitClient {
    createController: (ControllerDefinition: ControllerDefinition) => Controller;
    controllers: Array<Controller>;
    player: Player;
    [key: string]: any;
}

const client: KnitClient = {
    controllers: [],
    player: Players.LocalPlayer,

    createController(controllerDefinition: ControllerDefinition) {
        const a: Controller = {}
        return a
    }
}

export default client