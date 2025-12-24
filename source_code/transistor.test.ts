import { Transistor } from "./transistor";
import { describe, test } from "node:test";
import assert from "assert/strict";

describe("transistors", function () {
    test("A transistor should initialise in powered-off state.", function () {
        testTransistorInitialisedState()
    })

    test("A transistor should change to the powered-on state when the `power_on` method is invoked.", function () {
        testTransistorCanBePoweredOn()
    })

    test("A transistor in a powered-on state should switch to powered-off state if the `depower` method is called.", function () {
        const transistor = testTransistorCanBePoweredOn()

        transistor.depower()

        assert(transistor.input === "off")
        assert(transistor.output === "off")
    })
})

function testTransistorInitialisedState(): Transistor {
    const transistor = new Transistor()

    assert(transistor.input === "off")
    assert(transistor.output === "off")

    return transistor
}

function testTransistorCanBePoweredOn(): Transistor {
    const transistor = testTransistorInitialisedState()

    transistor.power()

    assert(transistor.input === "on")
    assert(transistor.output === "on")

    return transistor
}