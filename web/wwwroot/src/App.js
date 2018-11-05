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
            searchInput: "",
            currentWord: {
                id: 0,
                inEnglish: "",
                pronunciation: "",
                content: ""
            },
            insertModal: {
                show: false,
                data: {
                    id: 0,
                    inEnglish: "",
                    pronunciation: "",
                    content: ""
                }
            },
            editModal: {
                show: false,
                data: {
                    id: 0,
                    inEnglish: "",
                    pronunciation: "",
                    content: ""
                }
            }
        };
        this.handleSearchBoxChange = this.handleSearchBoxChange.bind(this);
        this.setCurrentWord = this.setCurrentWord.bind(this);

        this.handleInsertModalShow = this.handleInsertModalShow.bind(this);
        this.handleInsertModalHide = this.handleInsertModalHide.bind(this);
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
        let empty = {
            id: 0,
            inEnglish: "",
            pronunciation: "",
            content: ""
        };
        if (Number(id) !== NaN && Number(id) > 0) {
            let result = this.state.data.filter((currentWordValue, currentWordIndex, wordArray) => {
                return currentWordValue.id === Number(id);
            });
            let word = result.length ? result[0] : empty;
            this.setState({
                currentWord: word
            });
        } else {
            this.setState({
                currentWord: empty
            });
        }
    }

    handleSearchBoxChange(e)
    {
        this.setState({
            searchInput: e.target.value
        });
    }

    handleInsertModalShow()
    {
        this.setState({
            insertModal: {
                show: true,
                data: {
                    id: 0,
                    inEnglish: "",
                    pronunciation: "",
                    content: ""
                }
            }
        });
    }

    handleInsertModalHide()
    {
        this.setState({
            insertModal: {
                show: false,
                data: {
                    id: 0,
                    inEnglish: "",
                    pronunciation: "",
                    content: ""
                }
            }
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
                    currentWord={this.state.currentWord}
                    setCurrentWord={this.setCurrentWord}

                    handleInsertModalShow={this.handleInsertModalShow}
                    handleInsertModalHide={this.handleInsertModalHide}
                />
                <InsertModal
                    data={this.state.data}
                    insertModal={this.state.insertModal}
                    handleInsertModalShow={this.handleInsertModalShow}
                    handleInsertModalHide={this.handleInsertModalHide}
                />
                <EditModal
                    data={this.state.data}
                />
            </div>
        );
    }
}

