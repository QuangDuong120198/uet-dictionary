import React from "react";
import { Modal, Grid, Row, Col, Button } from "react-bootstrap";

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
              <Col sm={6} xs={12}>
                <label>Từ tiếng Anh</label>
                <input
                  className="form-control"
                  value={modalData.inEnglish.value}
                  onChange={(event) => { this.props.handleWordInEnglishChange(event, true); }}
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
                  onChange={(event) => { this.props.handleWordPronunciationChange(event, true); }}
                />
                <div className="text-danger">
                  {modalData.pronunciation.message}
                </div>
              </Col>
            </Row>
          </Grid>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle="success">Lưu thay đổi</Button>
          <Button bsStyle="default">Hủy</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
