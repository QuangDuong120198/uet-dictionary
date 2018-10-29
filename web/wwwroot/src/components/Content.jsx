import React from "react";

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
                    </div>
                    <div className="word-pronunciation">
                        <span>{currentWord.wordPronunciation}</span>
                        <span>
                            <i className="fa fa-2x fa-volume-up" onClick={this.speak}></i>
                        </span>
                    </div>
                    <div className="word-details">
                    {
                        currentWord.wordDetails.map((currentWordValue, currentWordIndex, currentWordArray) => {
                            return (
                                <div key={currentWordIndex}>
                                    <div>{currentWordValue.WordType}</div>
                                    <ul>
                                    {
                                        currentWordValue.MeaningAndExample.map((currentMeaningAndExampleValue, currentMeaningAndExampleIndex, currentMeaningAndExampleArray)=> {
                                            return (
                                                <li key={currentMeaningAndExampleIndex}>
                                                    <div>{currentMeaningAndExampleValue.Meaning}</div>
                                                    {
                                                        currentMeaningAndExampleValue.Examples.map((currentExampleValue, currentExampleIndex, currentExampleArray) => {
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
                    <i className="fa fa-gear"></i>
                </button>
            </div>
        );
    }
}
