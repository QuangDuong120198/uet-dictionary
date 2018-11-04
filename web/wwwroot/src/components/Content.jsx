import React from "react";
import { DropdownButton, MenuItem } from "react-bootstrap";

export default class Content extends React.Component
{
    constructor(props)
    {
        super(props);
        this.speak = this.speak.bind(this);
    }

    speak()
    {
        let utter = new SpeechSynthesisUtterance();
        utter.text = this.props.currentWord.wordInEnglish;
        speechSynthesis.speak(utter);
    }


    render()
    {
        return (
            <div className="content">
                <div className="app-name">Từ điển Anh-Việt</div>
                
                
            </div>
        );
    }
}
