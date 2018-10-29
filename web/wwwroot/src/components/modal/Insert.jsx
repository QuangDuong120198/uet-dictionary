import React from "react";
import { Modal } from "react-bootstrap";

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
                show={this.props.insertModal.show}
                onHide={this.props.handleInsertModalHide}
                onShow={this.props.handleInsertModalShow}
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
