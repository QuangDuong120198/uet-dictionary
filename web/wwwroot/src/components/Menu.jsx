import React from "react";

export default class Menu extends React.Component
{
    constructor(props)
    {
        super(props);
        this.handleSearchBoxChange = this.handleSearchBoxChange.bind(this);
        this.handleClickList = this.handleClickList.bind(this);
    }

    componentDidMount()
    {
        this.handleWindowResize();
        window.addEventListener("resize", this.handleWindowResize);

        window.addEventListener("click", (event) => {
            if (window.innerWidth < 768) {
                if (event.target.matches(".search-icon") || event.target.closest(".search-icon")) {
                    document.querySelector(".inner-search-panel input").setAttribute("aria-expanded", true);
                } else if (event.target.closest(".result-container")) {
                    document.querySelector(".inner-search-panel input").setAttribute("aria-expanded", false);
                } else if (!event.target.closest(".inner-search-panel")) {
                    document.querySelector(".inner-search-panel input").setAttribute("aria-expanded", false);
                }
            }
        });
    }

    handleWindowResize()
    {
        if (window.innerWidth >= 768) {
            document.querySelector(".inner-search-panel input").setAttribute("aria-expanded", true);
            document.querySelector(".result-container").setAttribute("aria-expanded", true);
        } else {
            document.querySelector(".inner-search-panel input").setAttribute("aria-expanded", false);
            document.querySelector(".result-container").setAttribute("aria-expanded", false);
        }
    }

    handleClickList(e)
    {
        this.props.setCurrentWord(+e.target.dataset.wordId);
    }

    handleSearchBoxChange(e)
    {

    }


    render()
    {
        let _this = this;
        return (
            <div className="search-panel">
                <div className="inner-search-panel">
                    <div className="app-icon">
                        <span className="fa fa-book"></span>
                        <span className="app-name">
                            Từ điển Anh-Việt
                        </span>
                    </div>
                    <input type="text" className="form-control" placeholder="Search..." value={this.props.searchInput} onChange={this.props.handleSearchBoxChange} aria-expanded={true} />
                    <div className="search-icon">
                        <span>
                            <i className="fa fa-search"></i>
                        </span>
                    </div>
                </div>
                <div className="result-container" aria-expanded={true}>
                    <div className="result">
                    {
                        this.props.data.map((value, index)=>{
                            return (
                                <div className="item" key={index} data-word-id={value.id} onClick={_this.handleClickList}>{value.inEnglish}</div>
                            );
                        })
                    }
                    </div>
                </div>
            </div>
        );
    }
}
