import { Output_connector, Input_connector } from "./connectors"

export class Transistor {
    private assess_output = () => {
        if (this.power.state === "on" && this.input.state === "on") {
            this.output.change_output("on")
        } else if (this.power.state === "off" || this.input.state === "off") {
            this.output.change_output("off")
        } else
            throw Error("`power_state` and `switch_state` should either be `'on'` or `'off'`")
    }

    power = new Input_connector(this.assess_output)
    input = new Input_connector(this.assess_output)
    output = new Output_connector()
}
