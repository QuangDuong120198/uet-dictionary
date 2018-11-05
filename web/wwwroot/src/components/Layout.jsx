import React from "react";
import Menu from "./Menu";
import Content from "./Content";

export default class Layout extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
        return (
            <div>
                <Menu
                    data={this.props.data}
                    searchInput={this.props.searchInput}
                    handleSearchBoxChange={this.props.handleSearchBoxChange}
                    setCurrentWord={this.props.setCurrentWord}
                />
                <Content
                    data={this.props.data}
                    currentWord={this.props.currentWord}
                    handleInsertModalShow={this.props.handleInsertModalShow}
                    handleInsertModalHide={this.props.handleInsertModalHide}
                />
            </div>
        );
    }
}
