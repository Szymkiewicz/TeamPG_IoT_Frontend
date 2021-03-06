import React, { useEffect } from "react";
import { connect, ConnectedProps } from "react-redux";

import { RootState } from "redux/root-reducer";

import {
    Container,
    Row,
    Col,
    Table,
} from "reactstrap";
import { actions as GatewaysActions } from "./redux/Gateways-actions";
import { actions as systemActions } from "../redux/system-actions";
import GatewaysForm from "./GatewaysForm";
import { GatewaysTable } from "./GatewaysTable";

const mapState = (state: RootState) => ({
    loading: state.Gateways.loading,
    Gateways: state.Gateways.Gateways,
});

const mapDispatch = {
    loadGateways: GatewaysActions.loadGateways,
    createGateway: GatewaysActions.createGateways,
    notify: systemActions.notify
};

const connector = connect(mapState, mapDispatch);
type PropsFromRedux = ConnectedProps<typeof connector>;

type Props = PropsFromRedux;

function Gateways({
    loading,
    Gateways,
    createGateway,
    loadGateways,
    notify,
}: Props) {

    useEffect(() => {
        loadGateways();
    }, []);

    return (
        <>
            <Container className="mt--6 d-flex justify-content-center" >
                <Col >
                    <Row className="justify-content-md-center">
                        <GatewaysForm onCreateGateway={createGateway} loading={loading} />
                    </Row>

                    <Row className="mt-5 justify-content-md-center">
                        <GatewaysTable Gateways={Gateways} />
                    </Row>
                </Col>

            </Container>
        </>
    );
}


export default connector(Gateways);
