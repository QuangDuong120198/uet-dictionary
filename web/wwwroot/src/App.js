import React from "react";
import Layout from "./components/Layout";

export default class App extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {};
    }
    render()
    {
        return (
            <Layout />
        );
    }
}

