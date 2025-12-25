import { on_off_state } from "./types"

export class Input_connector {
    constructor(parent: { assess_output: () => void }) {
        this.input = (value: on_off_state) => {
            this.state = value

            parent.assess_output()
        }
    }

    state: on_off_state = "off"
    input
}

export class Output_connector {
    state: on_off_state = "off"
    output(value: on_off_state): void {
        this.state = value
    }
    connect(input_connector: Input_connector) {
        this.output = (value: on_off_state) => {
            this.state = value
            input_connector.input(value)
        }

        input_connector.input(this.state)
    }
}