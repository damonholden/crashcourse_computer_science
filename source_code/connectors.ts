import { on_off_state } from "./types"

export class Input_connector {
    constructor(assess_output: () => void) {
        this.input = (value: on_off_state) => {
            this.state = value

            assess_output()
        }
    }
    input: (value: on_off_state) => void
    state: on_off_state = "off"
}

export class Output_connector {
    state: on_off_state = "off"
    change_output(value: on_off_state): void {
        this.state = value
    }
    connect(input_connector: Input_connector) {
        this.change_output = (value: on_off_state) => {
            this.state = value
            input_connector.input(value)
        }

        input_connector.input(this.state)
    }
}