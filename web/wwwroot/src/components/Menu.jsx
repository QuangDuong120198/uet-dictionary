import React from "react";

export default class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            wordId: NaN,
            text: this.props.text,
            list: [],
            displayResult: true,
            setWordId: this.props.setWordId
        };
        this.handleSearchBoxChange = this.handleSearchBoxChange.bind(this);
        this.handleWindowResize = this.handleWindowResize.bind(this);
        this.setWordId = this.setWordId.bind(this);
    }

    componentDidMount() {
        this.handleWindowResize();
        window.addEventListener("resize", this.handleWindowResize);

        window.addEventListener("click", (event) => {
            if (window.innerWidth < 768) {
                if (event.target.matches(".search-icon") || event.target.closest(".search-icon")) {
                    document.querySelector(".inner-search-panel input").setAttribute("aria-expanded", true);
                } else if (event.target.closest(".result-container")) {
                    document.querySelector(".inner-search-panel input").setAttribute("aria-expanded", false);
                    this.setState({
                        text: ""
                    });
                } else if (!event.target.closest(".inner-search-panel")) {
                    document.querySelector(".inner-search-panel input").setAttribute("aria-expanded", false);
                    this.setState({
                        text: ""
                    });
                }
            }
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            list: nextProps.list,
            wordId: nextProps.wordId
        });
    }

    handleWindowResize()
    {
        if (window.innerWidth >= 768) {
            document.querySelector(".inner-search-panel input").setAttribute("aria-expanded", true);
            document.querySelector(".result-container").setAttribute("aria-expanded", true);
            this.setState({
                displayResult: true
            });
        } else {
            document.querySelector(".inner-search-panel input").setAttribute("aria-expanded", false);
            document.querySelector(".result-container").setAttribute("aria-expanded", false);
            this.setState({
                displayResult: false
            });
        }
    }

    validTextInSearchBox(str) {
        let englishWord = /^[a-z\s]+$/ig;
        return window.innerWidth >= 768 || (englishWord.test(str) || englishWord.test(str.trim()));
    }

    handleSearchBoxChange(e) {
        this.setState({
            text: e.target.value
        });
    }

    setWordId(e) {
        this.state.setWordId(e.target.dataset.wordId);
    }

    render() {
        return (
            <div className="search-panel">
                <div className="inner-search-panel">
                    <div className="app-icon">
                        <span className="fa fa-book"></span>
                        <span className="app-name">
                            &nbsp;Lạc Trôi
                        </span>
                    </div>
                    <input type="text" className="form-control" onChange={this.handleSearchBoxChange} placeholder="Search..." value={this.state.text} aria-expanded={true} />
                    <div className="search-icon">
                        <span>
                            <i className="fa fa-search"></i>
                        </span>
                    </div>
                </div>
                <div className="result-container" aria-expanded={this.validTextInSearchBox(this.state.text)}>
                    <div className="result">
                    {
                        this.state.list.map((value, index) => 
                            <div className="item" key={index} data-word-id={value.id} onClick={this.setWordId}>
                                <div data-word-id={value.id}>{value.inEnglish}</div>
                            </div>
                        )
                    }
                    </div>
                </div>
            </div>
        );
    }
}
