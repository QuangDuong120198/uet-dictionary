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
                show={this.props.insertModal.show}
                onHide={this.props.handleInsertModalHide}
                onShow={this.props.handleInsertModalShow}
                >
                    <Modal.Header closeButton={true}>
                        <Modal.Title>Thêm từ mới</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Grid fluid={true}>
                            <Row className="show-grid">
                                <Col sm={6} xs={12}>
                                    <div className="form-group">
                                        <label>Nhập từ tiếng Anh</label>
                                        <input
                                        type="text"
                                        className="form-control"
                                        name="new-word-in-english"
                                        value={this.props.insertModal.input.wordInEnglish.value}
                                        onChange={this.props.handleInsertWordInEnglishChange}
                                        />
                                        <div className="text-danger">{this.props.insertModal.input.wordInEnglish.message}</div>
                                    </div>
                                </Col>
                                <Col sm={6} xs={12}>
                                    <div className="form-group">
                                        <label>Chuyển ngữ</label>
                                        <input
                                        type="text"
                                        className="form-control"
                                        name="new-word-pronunciation"
                                        value={this.props.insertModal.input.wordPronunciation.value}
                                        onChange={this.props.handleInsertWordPronunciationChange}
                                        />
                                        <div className="text-danger">{this.props.insertModal.input.wordPronunciation.message}</div>
                                    </div>
                                </Col>
                            </Row>
                            <div>
                                <button className="btn btn-xs btn-success" onClick={this.props.addWordDetail}>Thêm ví dụ</button>
                            </div>
                            {
                                this.props.insertModal.input.wordDetails.map((currentDetailValue, currentDetailIndex, detailArray) => {
                                    return (
                                        <Grid fluid={true} key={currentDetailIndex}>
                                            <Row className="show-grid">
                                                <Col sm={6} xs={12}>
                                                    <label>Loại từ</label>
                                                    <input
                                                    type="text"
                                                    className="form-control"
                                                    value={currentDetailValue.type.value}
                                                    onChange={(e)=>{ this.props.handleInsertWordDetailTypeChange(e, currentDetailIndex) }}
                                                    />
                                                    <div className="text-danger">{currentDetailValue.type.message}</div>
                                                </Col>
                                                <Col sm={6} xs={12}>
                                                    <label>Nghĩa</label>
                                                    <input
                                                    type="text"
                                                    className="form-control"
                                                    value={currentDetailValue.meaning.value}
                                                    onChange={(e)=>{ this.props.handleInsertWordDetailMeaningChange(e, currentDetailIndex) }}
                                                    />
                                                    <div className="text-danger">{currentDetailValue.meaning.message}</div>
                                                </Col>
                                            </Row>
                                            {
                                                currentDetailValue.examples.map((currentExampleValue, currentExampleIndex, exampleArray)=>{
                                                    return (
                                                        <Row className="show-grid" key={currentExampleIndex}>
                                                            <Col sm={6} xs={12}>
                                                                <label>Tiếng Anh</label>
                                                                <input
                                                                type="text"
                                                                className="form-control"
                                                                value={currentExampleValue.inEnglish.value}
                                                                onChange={(e)=>{ this.props.handleInsertWordDetailExampleInEnglishChange(e, currentDetailIndex, currentExampleIndex); }}
                                                                />
                                                                <div className="text-danger">
                                                                {currentExampleValue.inEnglish.message}
                                                                </div>
                                                            </Col>
                                                            <Col sm={6} xs={12}>
                                                                <label>Tiếng Việt</label>
                                                                <input
                                                                type="text"
                                                                className="form-control"
                                                                value={currentExampleValue.inVietnamese.value}
                                                                onChange={(e)=>{ this.props.handleInsertWordDetailExampleInVietnameseChange(e, currentDetailIndex, currentExampleIndex); }}
                                                                />
                                                                <div className="text-danger">
                                                                {currentExampleValue.inVietnamese.message}
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    );
                                                })
                                            }
                                        </Grid>
                                    );
                                })
                            }
                        </Grid>
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}
