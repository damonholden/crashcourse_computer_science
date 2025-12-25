import { Output_connector, Input_connector } from "./connectors"

export class Transistor {
    power = new Input_connector(this)
    switch = new Input_connector(this)

    assess_output() {
        if (this.power.state === "on" && this.switch.state === "on") {
            this.output_connector.output("on")
        } else if (this.power.state === "off" || this.switch.state === "off") {
            this.output_connector.output("off")
        } else
            throw Error("`power_state` and `switch_state` should either be `'on'` or `'off'`")
    }

    output_connector = new Output_connector()
}

