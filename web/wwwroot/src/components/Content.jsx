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
        speechSynthesis.speak(new SpeechSynthesisUtterance(this.props.currentWord.wordName));
    }

    displayCurrentWord()
    {
        if (this.props.currentWord.wordId) {
            return (
                <div>
                    <div>
                        <div>
                            <h4>{this.props.currentWord.wordName}&nbsp;<button type="button" onClick={this.speak}>Speak</button></h4>
                        </div>
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
            </div>
        );
    }
}
