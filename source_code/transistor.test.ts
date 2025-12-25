import { Transistor } from "./transistor";
import { Switch } from "./Power_switch";
import { describe, test } from "node:test";
import assert from "assert/strict";
import { Value_storer } from "./ValueStorer";


describe("transistors", function () {
    test("A transistor should output off if both the power input and the switch input are off.", function () {
        test_transistor_with_all_inputs_off()
    })

    test("A transistor should have a positive output when the `power` and `switch` inputs are both positive.", function () {
        test_transistor_can_have_a_positive_output()
    })

    test("A transistor with a positive output should switch to a negative output when the power-switch is turned off", function () {
        const { input_switch, power_switch, value_storer } = test_transistor_can_have_a_positive_output()

        input_switch.switch()

        assert(power_switch.switch_state === "on")
        assert(input_switch.switch_state === "off")
        assert(value_storer.input.state === "off")
    })

    test("A transistor with a positive output should switch to a negative output when the switch-switch is turned off", function () {
        const { input_switch, power_switch, value_storer } = test_transistor_can_have_a_positive_output()

        power_switch.switch()

        assert(power_switch.switch_state === "off")
        assert(input_switch.switch_state === "on")
        assert(value_storer.input.state === "off")
    })

    test("A transistor's power and switch input should respond to being conntected to positive outputs", function () {
        const transistor = new Transistor()
        const power_power_switch = new Switch()
        const switch_power_switch = new Switch()

        power_power_switch.switch()
        switch_power_switch.switch()

        assert(power_power_switch.switch_state === "on")
        assert(switch_power_switch.switch_state === "on")
        assert(transistor.power.state === "off")
        assert(transistor.input.state === "off")
        assert(transistor.output.state === "off")

        power_power_switch.output.connect(transistor.power)

        // @ts-ignore - Typescript cannot tell that transistor state is interfaced from connections:
        assert(transistor.power.state === "on")
        assert(transistor.input.state === "off")
        assert(transistor.output.state === "off")

        switch_power_switch.output.connect(transistor.input)

        assert(transistor.power.state === "on")
        // @ts-ignore - Typescript cannot tell that transistor state is interfaced from connections:
        assert(transistor.input.state === "on")
        // @ts-ignore - Typescript cannot tell that transistor state is interfaced from connections:
        assert(transistor.output.state === "on")
    })
})

function test_transistor_with_all_inputs_off() {
    const transistor = new Transistor()
    const power_switch = new Switch()
    const input_switch = new Switch()
    const value_storer = new Value_storer()

    power_switch.output.connect(transistor.power)
    input_switch.output.connect(transistor.input)
    transistor.output.connect(value_storer.input)

    power_switch.switch()
    power_switch.switch()
    input_switch.switch()
    input_switch.switch()

    assert(input_switch.switch_state === "off")
    assert(power_switch.switch_state === "off")
    assert(value_storer.input.state === "off")

    return { transistor, power_switch, input_switch, value_storer }
}

function test_transistor_can_have_a_positive_output() {
    const { transistor, power_switch, input_switch, value_storer } = test_transistor_with_all_inputs_off()

    power_switch.switch()
    input_switch.switch()

    assert(power_switch.switch_state === "on")
    assert(input_switch.switch_state === "on")
    assert(value_storer.input.state === "on")

    return { transistor, power_switch, input_switch, value_storer }
}