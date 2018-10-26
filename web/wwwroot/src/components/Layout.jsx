import React from "react";
import axios from "axios";
import Menu from "./Menu";
import Content from "./Content";

export default class Layout extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            wordId: NaN,
            text: "",
            list: []
        };
        this.setWordId = this.setWordId.bind(this);
    }

    setWordId(str) {
        this.setState({
            wordId: +str
        });
    }

    componentDidMount()
    {
        axios.post("/home/json")
        .then((response)=>{
            this.setState({
                list: response.data
            });
        })
        .catch((err)=>{
            console.warn(err.message);
        });
    }

    render()
    {
        return (
            <div>
                <Menu text={this.state.text} list={this.state.list} wordId={this.state.wordId} setWordId={this.setWordId} />
                <Content wordId={this.state.wordId} />
            </div>
        );
    }
}
