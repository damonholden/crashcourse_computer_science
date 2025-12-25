import { Output_connector } from "./connectors";
import { on_off_state } from "./types";

export class Power_switch {
    switch_state: on_off_state = "off"
    switch() {
        if (this.switch_state === "off") {
            this.switch_state = "on"
        } else if (this.switch_state === "on") {
            this.switch_state = "off"
        } else {
            throw Error("`switch_state` should either be `'on'` or `'off'`")
        }

        this.output_connector.output(this.switch_state)
    }

    output_connector = new Output_connector()
}