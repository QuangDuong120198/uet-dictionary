import React from "react";
import axios from "axios";
import Layout from "./components/Layout";
import InsertModal from "./components/modal/Insert";
import EditModal from "./components/modal/Edit";

export default class App extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            data: [],
            searchInput: ""
        };
        this.handleSearchBoxChange = this.handleSearchBoxChange.bind(this);
    }

    componentDidMount()
    {
        this.updateDictionary();
    }

    updateDictionary()
    {
        axios.post("/home/getdictionary")
        .then((response) => {
            this.setState({
                data: response.data
            });
        })
        .catch((err) => {
            console.warn(err.message);
        });
    }

    setCurrentWord(id = 0)
    {
        
    }

    handleSearchBoxChange(e)
    {
        this.setState({
            searchInput: e.target.value
        });
    }


    render()
    {
        return (
            <div>
                <Layout
                data={this.state.data}
                searchInput={this.state.searchInput}
                handleSearchBoxChange={this.handleSearchBoxChange}
                />
                <InsertModal
                data={this.state.data}
                />
                <EditModal
                data={this.state.data}
                />
            </div>
        );
    }
}

