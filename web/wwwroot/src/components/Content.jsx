import React from "react";
import axios from "axios";

export default class Content extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {};
    }

    componentDidMount()
    {
        axios.post("/home/json")
        .then((response) => {
            console.log(response.data);
        })
        .catch((err) => {
            console.warn(err.message);
        });
    }

    render()
    {
        return (
            <div className="content">
                Dictionary
            </div>
        );
    }
}
