import { Transistor } from "./transistor"

export class And_gate {
    constructor() {
        this.transistor_a.output.connect(this.transistor_b.power)
    }

    private transistor_a = new Transistor()
    private transistor_b = new Transistor()

    power = this.transistor_a.power

    input_a = this.transistor_a.input
    input_b = this.transistor_b.input

    output = this.transistor_b.output
}