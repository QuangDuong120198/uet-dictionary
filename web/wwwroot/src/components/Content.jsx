import React from "react";

export default class Content extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            content: this.props.string
        };

        this.speak = this.speak.bind(this);
    }

    speak(str)
    {
        SpeechSynthesis.speak(new SpeechSynthesisUtterance(str));
    }

    render()
    {
        return (
            <div className="content">
                <div className="app-name">Từ điển Lạc Trôi</div>
                <div>
                </div>
            </div>
        );
    }
}
