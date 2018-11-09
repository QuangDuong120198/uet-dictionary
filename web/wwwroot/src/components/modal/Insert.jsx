import React from "react";
import { Modal, Grid, Row, Col, Panel, Button } from "react-bootstrap";

export default class InsertModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let modalData = this.props.insertModal.data;
    return (
      <div>
        <Modal
          bsSize="lg"
          show={this.props.insertModal.show}
          onHide={this.props.handleInsertModalHide}
          onShow={this.props.handleInsertModalShow}
        >
          <Modal.Header closeButton={true}>
            <Modal.Title><i className="fa fa-plus"></i>&nbsp;Thêm từ mới</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Grid fluid={true}>
              <Row className="show-grid">
                <Col sm={6} xs={12}>
                  <label>Từ tiếng Anh</label>
                  <input
                    className="form-control"
                    value={modalData.inEnglish.value}
                    onChange={this.props.handleWordInEnglishChange}
                  />
                  <div className="text-danger">
                    {modalData.inEnglish.message}
                  </div>
                </Col>
                <Col sm={6} xs={12}>
                  <label>Phát âm</label>
                  <input
                    className="form-control"
                    value={modalData.pronunciation.value}
                    onChange={this.props.handleWordPronunciationChange}
                  />
                  <div className="text-danger">
                    {modalData.pronunciation.message}
                  </div>
                </Col>
              </Row>
              {
                modalData.content.map((currentTypeValue, currentTypeIndex, typeArray) => {
                  return (
                    <Row key={currentTypeIndex} className="show-grid">
                      <Col xs={12}>
                        <Panel bsStyle="primary" style={{ marginTop: 15 }}>
                          <Panel.Heading>
                            <label>Loại từ</label>
                            <button
                              type="button"
                              className="close"
                              onClick={() => { this.props.handleRemoveType(currentTypeIndex); }}
                            >
                              &times;
                            </button>
                          </Panel.Heading>
                          <Panel.Body>
                            <input
                              type="text"
                              className="form-control"
                              value={currentTypeValue.type.value}
                              onChange={(event) => { this.props.handleWordTypeChange(currentTypeIndex, event); }}
                            />
                            <div className="text-danger">{currentTypeValue.type.message}</div>
                            {
                              currentTypeValue.meaningsAndExamples.map((currentMeaningAndExampleValue, currentMeaningAndExampleIndex, meaningsAndExamplesArray) => {
                                return (
                                  <Panel key={currentMeaningAndExampleIndex} bsStyle="info" style={{ marginTop: 15 }}>
                                    <Panel.Heading>
                                      <label>Dịch nghĩa</label>
                                      <button
                                        type="button"
                                        className="close"
                                        onClick={() => { this.props.handleRemoveMeaning(currentTypeIndex, currentMeaningAndExampleIndex); }}
                                      >
                                        &times;
                                      </button>
                                    </Panel.Heading>
                                    <Panel.Body>
                                      <input type="text" className="form-control" value={currentMeaningAndExampleValue.meaning.value} onChange={(event) => { this.props.handleWordMeaningChange(currentTypeIndex, currentMeaningAndExampleIndex, event); }} />
                                      <div className="text-danger">{currentMeaningAndExampleValue.meaning.message}</div>
                                      <Panel bsStyle="success" style={{ marginTop: 15 }}>
                                        <Panel.Heading>
                                          <label>Các ví dụ</label>
                                        </Panel.Heading>
                                        <Panel.Body>
                                          {
                                            currentMeaningAndExampleValue.examples.map((currentExampleValue, currentExampleIndex, exampleArray) => {
                                              return (
                                                <Panel key={currentExampleIndex} style={{ marginTop: 15 }}>
                                                  <Panel.Heading>
                                                    <label>{currentExampleIndex + 1}</label>
                                                    <button
                                                      type="button" className="close"
                                                      onClick={() => {
                                                        this.props.handleRemoveExample(currentTypeIndex, currentMeaningAndExampleIndex, currentExampleIndex)
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
                                                            <input type="text" className="form-control" value={currentExampleValue.inEnglish.value} onChange={(event) => { this.props.handleWordExampleInEnglishChange(currentTypeIndex, currentMeaningAndExampleIndex, currentExampleIndex, event); }} />
                                                            <div className="text-danger">{currentExampleValue.inEnglish.message}</div>
                                                          </Col>
                                                          <Col md={6} sm={12}>
                                                            <label>Tiếng Việt</label>
                                                            <input type="text" className="form-control" value={currentExampleValue.inVietnamese.value} onChange={(event) => { this.props.handleWordExampleInVietnameseChange(currentTypeIndex, currentMeaningAndExampleIndex, currentExampleIndex, event); }} />
                                                            <div className="text-danger">{currentExampleValue.inVietnamese.message}</div>
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
                                            onClick={() => { this.props.handleAddExample(currentTypeIndex, currentMeaningAndExampleIndex); }}
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
                              onClick={() => { this.props.handleAddMeaning(currentTypeIndex); }}
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
                    <Button bsStyle="info" onClick={() => { this.props.handleAddType() }}>
                      Thêm loại từ
                    </Button>
                  </div>
                </Col>
              </Row>
            </Grid>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle="primary" onClick={this.props.handleSave}>Lưu vào từ điển</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
