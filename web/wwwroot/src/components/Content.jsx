import React from "react";
import { DropdownButton, MenuItem } from "react-bootstrap";

export default class Content extends React.Component {
  constructor(props) {
    super(props);
    this.speak = this.speak.bind(this);
    this.displayCurrentWord = this.displayCurrentWord.bind(this);
  }

  speak() {
    let utter = new SpeechSynthesisUtterance();
    utter.text = this.props.currentWord.InEnglish;
    speechSynthesis.speak(utter);
  }

  displayCurrentWord() {
    let _this = this;
    if (_this.props.currentWord.ID) {
      let content = eval(JSON.parse(_this.props.currentWord.Content));

      return (
        <div className="word">
          <div className="word-in-english">
            {_this.props.currentWord.InEnglish}&nbsp;&nbsp;
            <DropdownButton
              title=""
              id="tasks"
              bsStyle="default"
              bsSize="small"
              noCaret={false}
            >
              <MenuItem eventKey={1} onClick={this.props.handleEditModalShow}>
                <i className="fa fa-pencil-square-o text-warning"></i>&nbsp;Sửa
              </MenuItem> 
              <MenuItem eventKey={2} onClick={() => { this.props.setCurrentWord(0); }}>
                <i className="fa fa-times"></i>&nbsp;Đóng
              </MenuItem>
              <MenuItem divider={true}></MenuItem>
              <MenuItem eventKey={3}>
                <i className="fa fa-ban text-danger"></i>&nbsp;Xóa
              </MenuItem>
            </DropdownButton>
          </div>
          <div className="word-pronunciation">
            <div>{_this.props.currentWord.Pronunciation}</div>
            <div>
              <i
                className="fa fa-2x fa-volume-up"
                style={{ cursor: "pointer" }}
                title="Click để nghe phát âm"
                onClick={() => { _this.speak(); }}
              >
              </i>
            </div>
          </div>
          <div className="word-content">
            {
              content.map((currentContentValue, currentContentIndex, contentArray) => {
                return (
                  <div key={currentContentIndex}>
                    <strong>{currentContentValue.type}</strong>
                    {
                      currentContentValue.meaningsAndExamples
                        .map((currentMeaningsAndExamplesValue, currentMeaningsAndExamplesIndex, meaningsAndExamplesArray) => {
                          return (
                            <div className="word-meanings-and-examples" key={currentMeaningsAndExamplesIndex}>
                              <div>{currentMeaningsAndExamplesValue.meaning}</div>
                              {
                                currentMeaningsAndExamplesValue.examples
                                  .map((currentExampleValue, currentExampleIndex, exampleArray) => {
                                    return (
                                      <div className="word-example" key={currentExampleIndex}>
                                        <div>{currentExampleValue.inEnglish}</div>
                                        <div>{currentExampleValue.inVietnamese}</div>
                                      </div>
                                    );
                                  })
                              }
                            </div>
                          );
                        })
                    }
                  </div>
                );
              })
            }
          </div>
        </div>
      );
    }
    return;
  }


  render() {
    return (
      <div className="content">
        <div className="app-name">Từ điển Anh-Việt</div>
        <div>
          {
            this.displayCurrentWord()
          }
        </div>
        <button className="insert-modal-button" onClick={this.props.handleInsertModalShow}>
          <i className="fa fa-plus"></i>
        </button>
      </div>
    );
  }
}
