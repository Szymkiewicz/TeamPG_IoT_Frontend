import React from "react";
import {
    Card,
    CardHeader,
    CardBody,
    Form,
    FormGroup,
    Label,
    Input,
    Button,
} from "reactstrap";
import { useForm, Controller } from "react-hook-form";
import { Device } from "./redux/devices-state";

    //this is the class for what data is using to store name
    interface FormInput {
        name: string;
        macAdd: string;
        conName: string;
    }

    //this is where the onCreateDevice is created and varaibles should be added here
    interface DevicesFormProps {
        loading: boolean;
        onCreateDevice: (name: string, macAdd: string, conName: string) => void;
    }

    //this is where onSubmit is created and gets the data
    export default function DevicesForm({ loading, onCreateDevice }: DevicesFormProps): JSX.Element {
        const { register, errors, control, handleSubmit } = useForm<FormInput>();
        const onSubmit = (data: FormInput) => {
            onCreateDevice(data.name, data.macAdd, data.conName);
            let value = data.macAdd;
            let regEx = new RegExp("^([0-9A-F]{2}[:-]){5}([0-9A-F]{2})$");
            if(!regEx.test(value)){
                console.log("no bueno");
            }
    };

    /*name is the devices name, id is mac address, required means it must be entered
    before it lets you move on, the handleSubmit forces all buttons to be submit buttons*/
    return <Card className="col-lg-6">
        <CardHeader>
            <h3 className="mb-0">DEVICE ENROLLEMENT</h3>
        </CardHeader>
        <CardBody>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <FormGroup>
                    <Label for="device-name">Device Name:</Label>
                    <Controller
                       as={Input}
                        name="name"
                       control={control}
                       defaultValue=""
                       placeholder="Device Name"
                       rules={{ required: true }}
                    />
                    {errors.name &&
                        <div className="alert alert-danger" role="alert">
                            <strong>Device Name Required</strong> is required
                                </div>}
                    <Label for="device-macAdd">Mac Address:</Label>
                    <Controller
                        as={Input}
                        name="macAdd"
                        control={control}
                        defaultValue=""
                        placeholder="Mac Address"
                        rules={{ required: true }}
                    />
                    {errors.name &&
                        <div className="alert alert-danger" role="alert">
                            <strong>Mac Address</strong> is required
                                </div>}
                    <Label for="device-conName">Gateway Connected to:</Label>
                    <Controller
                        as={Input}
                        name="conName"
                        control={control}
                        defaultValue=""
                        placeholder="Gateway Name"
                        id="device-name"
                        rules={{ required: true }}
                    />
                    {errors.name &&
                        <div className="alert alert-danger" role="alert">
                            <strong>Gateway Name</strong> is required
                                </div>}
                </FormGroup>
                <Button
                    type="submit"
                    color="success"
                    disabled={loading}
                >
                    Submit
                </Button>
            </Form>
        </CardBody>
    </Card>;
}
