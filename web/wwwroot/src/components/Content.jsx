import React from "react";
import { DropdownButton, MenuItem } from "react-bootstrap";

export default class Content extends React.Component
{
    constructor(props)
    {
        super(props);
        this.displayCurrentWord = this.displayCurrentWord.bind(this);
        this.speak = this.speak.bind(this);
    }

    speak()
    {
        let utter = new SpeechSynthesisUtterance();
        utter.text = this.props.currentWord.wordInEnglish;
        speechSynthesis.speak(utter);
    }

    displayCurrentWord()
    {
        let currentWord = this.props.currentWord;
        if (currentWord.wordId) {
            return (
                <div className="word">
                    <div className="word-in-english">
                        {currentWord.wordInEnglish}
                        &nbsp;&nbsp;
                        <DropdownButton bsSize="xs" title="" id="tasks">
                            <MenuItem eventKey="1">
                                <i className="fa fa-pencil text-warning"></i>&nbsp;Sửa
                            </MenuItem>
                            <MenuItem eventKey="2">
                                <i className="fa fa-trash"></i>&nbsp;Xóa
                            </MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey="3" onClick={ () => { this.props.setCurrentWord(0); } }>
                                <i className="fa fa-times text-danger"></i>&nbsp;Đóng
                            </MenuItem>
                        </DropdownButton>
                    </div>
                    <div className="word-pronunciation">
                        <span>{currentWord.wordPronunciation}</span>
                        <span>
                            <i className="fa fa-2x fa-volume-up" title="Click để nghe phát âm" onClick={this.speak}></i>
                        </span>
                    </div>
                    <div className="word-details">
                    {
                        currentWord.wordDetails.map((currentWordValue, currentWordIndex, WordArray) => {
                            return (
                                <div key={currentWordIndex}>
                                    <div>{currentWordValue.WordType}</div>
                                    <ul>
                                    {
                                        currentWordValue.MeaningAndExample.map((currentMeaningAndExampleValue, currentMeaningAndExampleIndex, MeaningAndExampleArray)=> {
                                            return (
                                                <li key={currentMeaningAndExampleIndex}>
                                                    <div>{currentMeaningAndExampleValue.Meaning}</div>
                                                    {
                                                        currentMeaningAndExampleValue.Examples.map((currentExampleValue, currentExampleIndex, ExampleArray) => {
                                                            return (
                                                                <dl key={currentExampleIndex}>
                                                                    <dt>{currentExampleValue.InEnglish}</dt>
                                                                    <dd>{currentExampleValue.InVietnamese}</dd>
                                                                </dl>
                                                            );
                                                        })
                                                    }
                                                </li>
                                            );
                                        })
                                    }
                                    </ul>
                                </div>
                            );
                        })
                    }
                    </div>
                </div>
            );
        } else {
            return;
        }
    }

    render()
    {
        return (
            <div className="content">
                <div className="app-name">Từ điển Anh-Việt</div>
                {
                    this.displayCurrentWord()
                }
                <button className="insert-modal-button" onClick={this.props.handleInsertModalShow}>
                    <i className="fa fa-plus"></i>
                </button>
            </div>
        );
    }
}
