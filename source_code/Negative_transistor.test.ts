import { Negative_transistor } from "./Negative_transistor";
import { describe, test } from "node:test";
import assert from "assert/strict";

describe("Negative transistors", function () {
    test("A transistor should initialise depowered but with a postivie output", function () {
        testNegativeTransistorInitialisedState()
    })

    test("A transistor should change to the powered-on state when the `power` method is invoked.", function () {
        testNegativeTransistorCanBePoweredOn()
    })

    test("A transistor in a powered-on state should switch to powered-off state if the `depower` method is called.", function () {
        const transistor = testNegativeTransistorCanBePoweredOn()

        transistor.depower()

        assert(transistor.input === "off")
        assert(transistor.output === "on")
    })
})

function testNegativeTransistorInitialisedState(): Negative_transistor {
    const transistor = new Negative_transistor()

    assert(transistor.input === "off")
    assert(transistor.output === "on")

    return transistor
}

function testNegativeTransistorCanBePoweredOn(): Negative_transistor {
    const transistor = testNegativeTransistorInitialisedState()

    transistor.power()

    assert(transistor.input === "on")
    assert(transistor.output === "off")

    return transistor
}