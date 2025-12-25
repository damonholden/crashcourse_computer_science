import { Negative_transistor } from "./Negative_transistor";
import { Switch } from "./Power_switch";
import { describe, test } from "node:test";
import assert from "assert/strict";


describe("Negative transistors.", function () {
    test("A negative transistor should have a negative output if both the power input and the switch input are off.", function () {
        test_negative_transistor_with_all_inputs_off()
    })

    test("A negative transistor should have a negative output when the `power` and `switch` inputs are both positive.", function () {
        test_transistor_can_have_a_negative_output_when_all_positive_input()
    })

    test("A negative transistor should switch to a positive output when the `power` input is positive and `switch` input is negative.", function () {
        const { transistor, input_switch, power_switch, } = test_transistor_can_have_a_negative_output_when_all_positive_input()

        input_switch.switch()

        assert(power_switch.switch_state === "on")
        assert(input_switch.switch_state === "off")

        assert(transistor.output.state === "on")
    })

    test("A negative transistor should have a negative output whe the `power` input is negative and the `switch` input is positive.", function () {
        const { transistor, input_switch, power_switch } = test_transistor_can_have_a_negative_output_when_all_positive_input()

        power_switch.switch()

        assert(power_switch.switch_state === "off")
        assert(input_switch.switch_state === "on")

        assert(transistor.output.state === "off")
    })
})

function test_negative_transistor_with_all_inputs_off() {
    const transistor = new Negative_transistor()
    const power_power_switch = new Switch()
    const switch_power_switch = new Switch()

    power_power_switch.output.connect(transistor.power)
    switch_power_switch.output.connect(transistor.input)

    power_power_switch.switch()
    power_power_switch.switch()
    switch_power_switch.switch()
    switch_power_switch.switch()

    assert(switch_power_switch.switch_state === "off")
    assert(power_power_switch.switch_state === "off")

    assert(transistor.output.state === "off")

    return { transistor, power_power_switch, switch_power_switch, }
}

function test_transistor_can_have_a_negative_output_when_all_positive_input() {
    const { transistor, power_power_switch: power_switch, switch_power_switch: input_switch, } = test_negative_transistor_with_all_inputs_off()

    power_switch.switch()
    input_switch.switch()

    assert(power_switch.switch_state === "on")
    assert(input_switch.switch_state === "on")

    assert(transistor.output.state === "off")

    return { transistor, power_switch, input_switch, }
}