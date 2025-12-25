import { Output_connector, Input_connector } from "./connectors"

export class Negative_transistor {
    power = new Input_connector(this)
    switch = new Input_connector(this)

    assess_output() {
        if (this.power.state === "on") {
            if (this.switch.state === "off") {
                this.output_connector.output("on")
                return
            }

            if (this.switch.state === "on") {
                this.output_connector.output("off")
                return
            }

            throw Error("`switch_state` should either be `'on'` or `'off'`")
        }

        if (this.power.state === "off") {
            this.output_connector.output("off")
            return
        }

        throw Error("`power_state` should either be `'on'` or `'off'`")
    }

    output_connector = new Output_connector()
}
