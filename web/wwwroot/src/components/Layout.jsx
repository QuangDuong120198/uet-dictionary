import React from "react";
import Menu from "./Menu";
import Content from "./Content";

export default class Layout extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {};
    }
    render()
    {
        return (
            <div>
                <Menu />
                <Content />
            </div>
        );
    }
}
