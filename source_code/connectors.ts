import { on_off_state } from "./types"

export class Input_connector {
    state = "off"
    input
    constructor(parent: { assess_output: () => void }) {
        this.input = (value: on_off_state) => {
            this.state = value

            parent.assess_output()
        }
    }
}

export class Output_connector {
    output(value: on_off_state): void {
        console.log(value)
    }

    connect(input_connector: Input_connector) {
        this.output = function (value: on_off_state) {
            input_connector.input(value)
        }
    }
}