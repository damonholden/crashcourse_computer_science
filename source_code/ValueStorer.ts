import { Input_connector } from "./connectors";

export class Value_storer {
    private assess_output = () => { }
    input = new Input_connector(this.assess_output)
}