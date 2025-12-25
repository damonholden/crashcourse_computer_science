import { Input_connector } from "./connectors";

export class Value_storer {
    private assess_output = () => { }
    input_connector = new Input_connector(this.assess_output)
}