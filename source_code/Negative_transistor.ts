import { Output_connector, Input_connector } from "./connectors"

export class Negative_transistor {
    private assess_output = () => {
        if (this.power.state === "on") {
            if (this.input.state === "off") {
                this.output.change_output("on")
                return
            }

            if (this.input.state === "on") {
                this.output.change_output("off")
                return
            }

            throw Error("`switch_state` should either be `'on'` or `'off'`")
        }

        if (this.power.state === "off") {
            this.output.change_output("off")
            return
        }

        throw Error("`power_state` should either be `'on'` or `'off'`")
    }
    power = new Input_connector(this.assess_output)
    input = new Input_connector(this.assess_output)
    output = new Output_connector()
}
