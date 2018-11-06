import React from "react";
import { Modal, Grid, Row, Col, Panel, Well } from "react-bootstrap";

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
            <Modal.Title>Thêm từ mới</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Grid fluid={true}>
              <Row className="show-grid">
                <Col sm={6} xs={12}>
                  <label>Từ tiếng Anh</label>
                  <input
                    className="form-control"
                    value={modalData.inEnglish.value}
                    onChange={this.props.handleInsertModalWordInEnglishChange}
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
                    onChange={this.props.handleInsertModalWordPronunciationChange}
                  />
                  <div className="text-danger">
                    {modalData.pronunciation.message}
                  </div>
                </Col>
              </Row>
              {
                modalData.content.map((currentContentValue, currentContentIndex, contentArray) => {
                  return (
                    <Row key={currentContentIndex} className="show-grid">
                      <Col xs={12}>
                        <Panel bsStyle="info" style={{ marginTop: 15 }}>
                          <Panel.Heading>
                            <label>Loại từ</label>
                            <button type="button" className="close">&times;</button>
                          </Panel.Heading>
                          <Panel.Body>
                            <input
                              type="text"
                              className="form-control"
                              value={currentContentValue.type.value}
                              onChange={(event) => { this.props.handleInsertModalWordTypeChange(currentContentIndex, event); }}
                            />
                            <div className="text-danger">{currentContentValue.type.message}</div>
                            {
                              currentContentValue.meaningsAndExamples.map((currentMeaningAndExampleValue, currentMeaningAndExampleIndex, meaningsAndExamplesArray) => {
                                return (
                                  <Panel key={currentMeaningAndExampleIndex} bsStyle="info" style={{ marginTop: 15 }}>
                                    <Panel.Heading>
                                      <label>Dịch nghĩa</label>
                                      <button type="button" className="close">&times;</button>
                                    </Panel.Heading>
                                    <Panel.Body>
                                      <input type="text" className="form-control" value={currentMeaningAndExampleValue.meaning.value} onChange={(event) => { this.props.handleInsertModalWordMeaningChange(currentContentIndex, currentMeaningAndExampleIndex, event); }} />
                                      <div className="text-danger">{currentMeaningAndExampleValue.meaning.message}</div>
                                      <Panel bsStyle="info" style={{ marginTop: 15 }}>
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
                                                        this.props.handleInsertModalRemoveExample(currentContentIndex, currentMeaningAndExampleIndex, currentExampleIndex)
                                                      }}
                                                    >
                                                      &times;
                                                    </button>
                                                  </Panel.Heading>
                                                  <Panel.Body>
                                                    <div>
                                                      <Grid fluid={true}>
                                                        <Row className="show-grid">
                                                          <Col sm={6} xs={12}>
                                                            <label>Tiếng Anh</label>
                                                            <input type="text" className="form-control" value={currentExampleValue.inEnglish.value} onChange={(e) => { this.props.handleInsertModalWordExampleInEnglishChange(currentContentIndex, currentMeaningAndExampleIndex, currentExampleIndex, e); }} />
                                                            <div className="text-danger">{currentExampleValue.inEnglish.message}</div>
                                                          </Col>
                                                          <Col sm={6} xs={12}>
                                                            <label>Tiếng Việt</label>
                                                            <input type="text" className="form-control" value={currentExampleValue.inVietnamese.value} onChange={(e) => { this.props.handleInsertModalWordExampleInVietnameseChange(currentContentIndex, currentMeaningAndExampleIndex, currentExampleIndex, e); }} />
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
                                        <Panel.Footer>
                                          <button type="button" className="btn" onClick={() => { this.props.handleInsertModalAddExample(currentContentIndex, currentMeaningAndExampleIndex); }}>
                                            <i className="fa fa-plus"></i>
                                          </button>
                                        </Panel.Footer>
                                      </Panel>
                                    </Panel.Body>
                                  </Panel>
                                );
                              })
                            }
                          </Panel.Body>
                        </Panel>
                      </Col>
                    </Row>
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
