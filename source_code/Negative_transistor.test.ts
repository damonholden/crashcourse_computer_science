import { Negative_transistor } from "./Negative_transistor";
import { Switch } from "./Power_switch";
import { describe, test } from "node:test";
import assert from "assert/strict";
import { Value_storer } from "./ValueStorer";


describe("Negative transistors.", function () {
    test("A negative transistor should have a negative output if both the power input and the switch input are off.", function () {
        test_negative_transistor_with_all_inputs_off()
    })

    test("A negative transistor should have a negative output when the `power` and `switch` inputs are both positive.", function () {
        test_transistor_can_have_a_negative_output_when_all_positive_input()
    })

    test("A negative transistor should switch to a positive output when the `power` input is positive and `switch` input is negative.", function () {
        const { switch_power_switch, power_power_switch, value_storer } = test_transistor_can_have_a_negative_output_when_all_positive_input()

        switch_power_switch.switch()

        assert(power_power_switch.switch_state === "on")
        assert(switch_power_switch.switch_state === "off")

        assert(value_storer.input.state === "on")
    })

    test("A negative transistor should have a negative output whe the `power` input is negative and the `switch` input is positive.", function () {
        const { switch_power_switch, power_power_switch, value_storer } = test_transistor_can_have_a_negative_output_when_all_positive_input()

        power_power_switch.switch()

        assert(power_power_switch.switch_state === "off")
        assert(switch_power_switch.switch_state === "on")

        assert(value_storer.input.state === "off")
    })
})

function test_negative_transistor_with_all_inputs_off() {
    const transistor = new Negative_transistor()
    const power_power_switch = new Switch()
    const switch_power_switch = new Switch()
    const value_storer = new Value_storer()

    power_power_switch.output.connect(transistor.power)
    switch_power_switch.output.connect(transistor.switch)
    transistor.output_connector.connect(value_storer.input)

    power_power_switch.switch()
    power_power_switch.switch()
    switch_power_switch.switch()
    switch_power_switch.switch()

    assert(switch_power_switch.switch_state === "off")
    assert(power_power_switch.switch_state === "off")

    assert(value_storer.input.state === "off")

    return { transistor, power_power_switch, switch_power_switch, value_storer }
}

function test_transistor_can_have_a_negative_output_when_all_positive_input() {
    const { transistor, power_power_switch, switch_power_switch, value_storer } = test_negative_transistor_with_all_inputs_off()

    power_power_switch.switch()
    switch_power_switch.switch()

    assert(power_power_switch.switch_state === "on")
    assert(switch_power_switch.switch_state === "on")

    assert(value_storer.input.state === "off")

    return { transistor, power_power_switch, switch_power_switch, value_storer }
}