import React from "react";
import { Modal, Grid, Row, Col, Panel, Button } from "react-bootstrap";

export default class EditModal extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let modalData = this.props.editModal.data;

        return (
            <Modal
                bsSize="lg"
                show={this.props.editModal.show}
                onShow={this.props.handleEditModalShow}
                onHide={this.props.handleEditModalHide}
            >
                <Modal.Header closeButton={true}>
                    <Modal.Title><i className="fa fa-pencil-square-o"></i>&nbsp;Chỉnh sửa</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Grid fluid={true}>
                        <Row className="show-grid">
                            <Col xs={12}>
                                <label>Từ tiếng Anh</label>
                                <input
                                    className="form-control"
                                    value={modalData.Word.value}
                                    onChange={(event) => { this.props.handleWordChange(event, true); }}
                                />
                                <div className="text-danger">
                                    {modalData.Word.message}
                                </div>
                            </Col>
                        </Row>
                        {
                            modalData.Content.map((typeValue, typeIndex, typeArray) => {
                                return (
                                    <Row key={typeIndex} className="show-grid">
                                        <Col xs={12}>
                                            <Panel bsStyle="primary" style={{ marginTop: 15 }}>
                                                <Panel.Heading>
                                                    <label>Loại từ</label>
                                                    <button
                                                        type="button"
                                                        className="close"
                                                        onClick={() => { this.props.handleRemoveType(typeIndex, true); }}
                                                    >
                                                        &times;
                            </button>
                                                </Panel.Heading>
                                                <Panel.Body>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={typeValue.type.value}
                                                        onChange={(event) => { this.props.handleTypeChange(typeIndex, event, true); }}
                                                    />
                                                    <div className="text-danger">{typeValue.type.message}</div>
                                                    {
                                                        typeValue.meaningsAndExamples.map((meaningAndExampleValue, meaningAndExampleIndex, meaningsAndExamplesArray) => {
                                                            return (
                                                                <Panel key={meaningAndExampleIndex} bsStyle="info" style={{ marginTop: 15 }}>
                                                                    <Panel.Heading>
                                                                        <label>Dịch nghĩa</label>
                                                                        <button
                                                                            type="button"
                                                                            className="close"
                                                                            onClick={() => { this.props.handleRemoveMeaning(typeIndex, meaningAndExampleIndex, true); }}
                                                                        >
                                                                            &times;
                                      </button>
                                                                    </Panel.Heading>
                                                                    <Panel.Body>
                                                                        <input type="text" className="form-control" value={meaningAndExampleValue.meaning.value} onChange={(event) => { this.props.handleMeaningChange(typeIndex, meaningAndExampleIndex, event, true); }} />
                                                                        <div className="text-danger">{meaningAndExampleValue.meaning.message}</div>
                                                                        <Panel bsStyle="success" style={{ marginTop: 15 }}>
                                                                            <Panel.Heading>
                                                                                <label>Các ví dụ</label>
                                                                            </Panel.Heading>
                                                                            <Panel.Body>
                                                                                {
                                                                                    meaningAndExampleValue.examples.map((exampleValue, exampleIndex, exampleArray) => {
                                                                                        return (
                                                                                            <Panel key={exampleIndex} style={{ marginTop: 15 }}>
                                                                                                <Panel.Heading>
                                                                                                    <label>{exampleIndex + 1}</label>
                                                                                                    <button
                                                                                                        type="button" className="close"
                                                                                                        onClick={() => {
                                                                                                            this.props.handleRemoveExample(typeIndex, meaningAndExampleIndex, exampleIndex, true);
                                                                                                        }}
                                                                                                    >
                                                                                                        &times;
                                                    </button>
                                                                                                </Panel.Heading>
                                                                                                <Panel.Body>
                                                                                                    <div>
                                                                                                        <Grid fluid={true}>
                                                                                                            <Row className="show-grid">
                                                                                                                <Col md={6} sm={12}>
                                                                                                                    <label>Tiếng Anh</label>
                                                                                                                    <input type="text" className="form-control" value={exampleValue.inEnglish.value} onChange={(event) => { this.props.handleExampleInEnglishChange(typeIndex, meaningAndExampleIndex, exampleIndex, event, true); }} />
                                                                                                                    <div className="text-danger">{exampleValue.inEnglish.message}</div>
                                                                                                                </Col>
                                                                                                                <Col md={6} sm={12}>
                                                                                                                    <label>Tiếng Việt</label>
                                                                                                                    <input type="text" className="form-control" value={exampleValue.inVietnamese.value} onChange={(event) => { this.props.handleExampleInVietnameseChange(typeIndex, meaningAndExampleIndex, exampleIndex, event, true); }} />
                                                                                                                    <div className="text-danger">{exampleValue.inVietnamese.message}</div>
                                                                                                                </Col>
                                                                                                            </Row>
                                                                                                        </Grid>
                                                                                                    </div>
                                                                                                </Panel.Body>
                                                                                            </Panel>
                                                                                        );
                                                                                    })
                                                                                }
                                                                            </Panel.Body>
                                                                            <Panel.Footer className="text-center">
                                                                                <Button
                                                                                    bsStyle="info"
                                                                                    onClick={() => { this.props.handleAddExample(typeIndex, meaningAndExampleIndex, true); }}
                                                                                >
                                                                                    Thêm ví dụ
                                          </Button>
                                                                            </Panel.Footer>
                                                                        </Panel>
                                                                    </Panel.Body>
                                                                </Panel>
                                                            );
                                                        })
                                                    }
                                                </Panel.Body>
                                                <Panel.Footer className="text-center">
                                                    <Button
                                                        bsStyle="info"
                                                        onClick={() => { this.props.handleAddMeaning(typeIndex, true); }}
                                                    >
                                                        Thêm nghĩa
                                                    </Button>
                                                </Panel.Footer>
                                            </Panel>
                                        </Col>
                                    </Row>
                                );
                            })
                        }
                        <Row className="show-grid">
                            <Col xs={12}>
                                <div className="text-center">
                                    <Button bsStyle="info" onClick={() => { this.props.handleAddType(true); }}>
                                        Thêm loại từ
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    </Grid>
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="success" onClick={() => { this.props.handleEdit(); }}>Lưu thay đổi</Button>
                    <Button bsStyle="default" onClick={() => { this.props.handleEditModalHide(); }}>Hủy</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
