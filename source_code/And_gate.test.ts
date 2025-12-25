import { And_gate } from "./And_gate";

import { describe, test } from "node:test";
import assert from "assert/strict";
import { Power_switch } from "./Power_switch";
import { Input_connector } from "./connectors";

class Value_storer {
    input_connector = new Input_connector(this)
    assess_output() { }
}

describe("And gates.", () => {
    test("And gate should have a positive output when the `power` connector and both inputs are poitive", () => {
        const and_gate = new And_gate()
        const value_storer = new Value_storer()
        const input_a_switch = new Power_switch()
        const input_b_switch = new Power_switch()
        const power_switch = new Power_switch()


        power_switch.output_connector.connect(and_gate.power)
        input_a_switch.output_connector.connect(and_gate.input_a)
        input_b_switch.output_connector.connect(and_gate.input_b)

        and_gate.output_connector.connect(value_storer.input_connector)


        power_switch.switch()
        input_a_switch.switch()
        input_b_switch.switch()


        assert(power_switch.switch_state === "on")
        assert(input_a_switch.switch_state === "on")
        assert(input_b_switch.switch_state === "on")

        assert(value_storer.input_connector.state === "on")
    })
})