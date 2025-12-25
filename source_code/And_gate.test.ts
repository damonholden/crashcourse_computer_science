import { And_gate } from "./And_gate";

import { describe, test } from "node:test";
import assert from "assert/strict";
import { Switch } from "./Power_switch";
import { Value_storer } from "./ValueStorer";


describe("And gates.", () => {
    test("And gate should have a positive output when the `power` connector and both inputs are positive.", () => {
        initialise_and_gate_with_all_inputs_positive_and_assert_negative_output()
    })

    test("And gate should have a negative output when the `power` connector is negative and both inputs are positive.", () => {
        const { value_storer, power_switch, input_a_switch, input_b_switch } = initialise_and_gate_with_all_inputs_positive_and_assert_negative_output()

        power_switch.switch()

        assert(power_switch.switch_state === "off")
        assert(input_a_switch.switch_state === "on")
        assert(input_b_switch.switch_state === "on")

        assert(value_storer.input.state === "off")
    })


    test("And gate should have a negative output when the `power` connector is positive, input a is positive, and input b is negative.", () => {
        const { value_storer, power_switch, input_a_switch, input_b_switch } = initialise_and_gate_with_all_inputs_positive_and_assert_negative_output()

        input_b_switch.switch()

        assert(power_switch.switch_state === "on")
        assert(input_a_switch.switch_state === "on")
        assert(input_b_switch.switch_state === "off")

        assert(value_storer.input.state === "off")
    })

    test("And gate should have a negative output when the `power` connector is positive, input a is negative, and input b is positive.", () => {
        const { value_storer, power_switch, input_a_switch, input_b_switch } = initialise_and_gate_with_all_inputs_positive_and_assert_negative_output()

        input_a_switch.switch()

        assert(power_switch.switch_state === "on")
        assert(input_a_switch.switch_state === "off")
        assert(input_b_switch.switch_state === "on")

        assert(value_storer.input.state === "off")
    })

    test("And gate should have a negative output when the `power` connector and both inputs are negative.", () => {
        const { value_storer, power_switch, input_a_switch, input_b_switch } = initialise_and_gate_with_all_inputs_positive_and_assert_negative_output()

        input_a_switch.switch()
        input_b_switch.switch()
        power_switch.switch()

        assert(power_switch.switch_state === "off")
        assert(input_a_switch.switch_state === "off")
        assert(input_b_switch.switch_state === "off")

        assert(value_storer.input.state === "off")
    })
})

function initialise_and_gate_with_all_inputs_positive_and_assert_negative_output() {
    const and_gate = new And_gate()
    const value_storer = new Value_storer()
    const input_a_switch = new Switch()
    const input_b_switch = new Switch()
    const power_switch = new Switch()


    power_switch.output.connect(and_gate.power)
    input_a_switch.output.connect(and_gate.input_a)
    input_b_switch.output.connect(and_gate.input_b)

    and_gate.output.connect(value_storer.input)


    power_switch.switch()
    input_a_switch.switch()
    input_b_switch.switch()


    assert(power_switch.switch_state === "on")
    assert(input_a_switch.switch_state === "on")
    assert(input_b_switch.switch_state === "on")

    assert(value_storer.input.state === "on")

    return { and_gate, value_storer, input_a_switch, input_b_switch, power_switch }
}