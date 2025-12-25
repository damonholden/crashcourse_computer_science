import { Transistor } from "./transistor";
import { Power_switch } from "./Power_switch";
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
        const { switch_power_switch, power_power_switch, value_storer } = test_transistor_can_have_a_positive_output()

        switch_power_switch.switch()

        assert(power_power_switch.switch_state === "on")
        assert(switch_power_switch.switch_state === "off")
        assert(value_storer.input_connector.state === "off")
    })

    test("A transistor with a positive output should switch to a negative output when the switch-switch is turned off", function () {
        const { switch_power_switch, power_power_switch, value_storer } = test_transistor_can_have_a_positive_output()

        power_power_switch.switch()

        assert(power_power_switch.switch_state === "off")
        assert(switch_power_switch.switch_state === "on")
        assert(value_storer.input_connector.state === "off")
    })

    test("A transistor's power and switch input should respond to being conntected to positive outputs", function () {
        const transistor = new Transistor()
        const power_power_switch = new Power_switch()
        const switch_power_switch = new Power_switch()

        power_power_switch.switch()
        switch_power_switch.switch()

        assert(power_power_switch.switch_state === "on")
        assert(switch_power_switch.switch_state === "on")
        assert(transistor.power.state === "off")
        assert(transistor.switch.state === "off")
        assert(transistor.output_connector.state === "off")

        power_power_switch.output_connector.connect(transistor.power)

        // @ts-ignore - Typescript cannot tell that transistor state is interfaced from connections:
        assert(transistor.power.state === "on")
        assert(transistor.switch.state === "off")
        assert(transistor.output_connector.state === "off")

        switch_power_switch.output_connector.connect(transistor.switch)

        assert(transistor.power.state === "on")
        // @ts-ignore - Typescript cannot tell that transistor state is interfaced from connections:
        assert(transistor.switch.state === "on")
        // @ts-ignore - Typescript cannot tell that transistor state is interfaced from connections:
        assert(transistor.output_connector.state === "on")
    })
})

function test_transistor_with_all_inputs_off() {
    const transistor = new Transistor()
    const power_power_switch = new Power_switch()
    const switch_power_switch = new Power_switch()
    const value_storer = new Value_storer()

    power_power_switch.output_connector.connect(transistor.power)
    switch_power_switch.output_connector.connect(transistor.switch)
    transistor.output_connector.connect(value_storer.input_connector)

    power_power_switch.switch()
    power_power_switch.switch()
    switch_power_switch.switch()
    switch_power_switch.switch()

    assert(switch_power_switch.switch_state === "off")
    assert(power_power_switch.switch_state === "off")
    assert(value_storer.input_connector.state === "off")

    return { transistor, power_power_switch, switch_power_switch, value_storer }
}

function test_transistor_can_have_a_positive_output() {
    const { transistor, power_power_switch, switch_power_switch, value_storer } = test_transistor_with_all_inputs_off()

    power_power_switch.switch()
    switch_power_switch.switch()

    assert(power_power_switch.switch_state === "on")
    assert(switch_power_switch.switch_state === "on")
    assert(value_storer.input_connector.state === "on")

    return { transistor, power_power_switch, switch_power_switch, value_storer }
}