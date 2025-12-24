type on_off_state = "on" | "off"

export class Negative_transistor {
    input: on_off_state = "off"
    output: on_off_state = "on"

    power() {
        this.input = "on"

        this.assess_output()
    }
    depower() {
        this.input = "off"

        this.assess_output()
    }

    assess_output() {
        if (this.input === "on") {
            this.output = "off"
            return
        }

        if (this.input === "off") {
            this.output = "on"
            return
        }

        throw Error("`input` should either be `'on'` or `'off'`")
    }
}

