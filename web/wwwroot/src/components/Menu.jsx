import React from "react";

export default class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        };
        this.handleSearchBoxChange = this.handleSearchBoxChange.bind(this);
    }

    handleSearchBoxChange(e) {
        if (/^[a-zA-Z\s]+$/g.test(e.target.value)) {
            if (/^[a-zA-Z\s]+$/g.test(e.target.value.replace(/(^\s+|\s+$)/g, ""))) {
                document.querySelector(".result").style.display = "block";
            } else {
                document.querySelector(".result").style.display = "none";
            }
        } else {
            document.querySelector(".result").style.display = "none";
        }
    }

    render() {
        return (
            <div className="search-panel">
                <div className="inner-search-panel">
                    <input type="text" className="form-control" onChange={this.handleSearchBoxChange} placeholder="Search..." />
                    <div className="search-icon">
                        <span>
                            <i className="fa fa-search"></i>
                        </span>
                    </div>
                </div>
                <div className="result-container">
                    <div className="result">
                    {
                        this.state.list.map((value, index) => 
                            <div className="item" key={index}>{value.InEnglish}</div>
                        )
                    }
                    </div>
                </div>
            </div>
        );
    }
}
