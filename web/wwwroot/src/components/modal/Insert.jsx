import React from "react";
import { Modal, Grid, Row, Col } from "react-bootstrap";

export default class InsertModal extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        return (
            <div>
                <Modal
                bsSize="lg"
                >
                    <Modal.Header closeButton={true}>
                        <Modal.Title>Thêm từ mới</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}
