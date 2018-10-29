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
                wordId: 0,
                wordInEnglish: "",
                wordPronunciation: "",
                wordDetails: [
                    {
                        type: "",
                        meaning: "",
                        examples: [
                            {
                                inEnglish: "",
                                inVietnamese: ""
                            }
                        ]
                    }
                ]
            },
            editModal: {
                show: false,
                input: {
                    wordId: 0,
                    wordInEnglish: { value: "", message: "" },
                    wordPronunciation: { value: "", message: "" },
                    wordDetails: [
                        {
                            type: { value: "", message: "" },
                            meaning: { value: "", message: "" },
                            examples: [
                                {
                                    inEnglish: { value: "", message: "" },
                                    inVietnamese: { value: "", message: "" }
                                }
                            ]
                        }
                    ]
                }
            },
            insertModal: {
                show: false,
                input: {
                    wordId: 0,
                    wordName: { value: "", message: "" },
                    wordPronunciation: { value: "", message: "" },
                    wordDetails: [
                        {
                            type: { value: "", message: "" },
                            meaning: { value: "", message: "" },
                            examples: [
                                {
                                    inEnglish: { value: "", message: "" },
                                    inVietnamese: { value: "", message: "" }
                                }
                            ]
                        }
                    ]
                }
            }
        };
        this.handleSearchBoxChange = this.handleSearchBoxChange.bind(this);
        this.handleEditModalHide = this.handleEditModalHide.bind(this);
        this.handleEditModalShow = this.handleEditModalShow.bind(this);
        this.handleInsertModalHide = this.handleInsertModalHide.bind(this);
        this.handleInsertModalShow = this.handleInsertModalShow.bind(this);

        this.setCurrentWord = this.setCurrentWord.bind(this);
    }

    componentDidMount()
    {
        axios.post("/home/getdictionary")
        .then((response) => {
            console.log(response.data);// khi làm xong thì bỏ dòng này đi
            this.setState({
                data: response.data
            });
        })
        .catch((err) => {
            console.warn(err.message);
        });
    }

    setCurrentWord(id)
    {
        if (typeof (+id) === "number" && Number.isInteger(+id) && (+id > 0)) {
            let getWordData = this.state.data.filter(value => value.id === (+id));
            if (getWordData.length) {
                this.setState({
                    currentWord: {
                        wordId: getWordData[0].id,
                        wordInEnglish: getWordData[0].inEnglish,
                        wordPronunciation: getWordData[0].pronunciation,
                        wordDetails: JSON.parse(getWordData[0].details)
                    }
                });
            }
        }
    }

    handleSearchBoxChange(e)
    {
        this.setState({
            searchInput: e.target.value
        });
    }

    handleEditModalShow()
    {
        let state = this.state;
        state.editModal.show = true;
        this.setState({
            editModal: state.editModal
        }, ()=>{
            console.log(state.editModal);
        });
    }

    handleEditModalHide()
    {
        let state = this.state;
        state.editModal.show = false;
        this.setState({
            editModal: state.editModal
        });
    }

    handleInsertModalShow()
    {
        let state = this.state;
        state.insertModal.show = true;
        this.setState({
            insertModal: state.insertModal
        });
    }

    handleInsertModalHide()
    {
        let state = this.state;
        state.insertModal.show = false;
        this.setState({
            insertModal: state.insertModal
        });
    }

    render()
    {
        return (
            <div>
                <Layout
                data={this.state.data}
                searchInput={this.state.searchInput}
                currentWord={this.state.currentWord}
                handleSearchBoxChange={this.handleSearchBoxChange}
                setCurrentWord={this.setCurrentWord}
                handleInsertModalShow={this.handleInsertModalShow}
                />
                <InsertModal
                data={this.state.data}
                insertModal={this.state.insertModal}
                handleInsertModalHide={this.handleInsertModalHide}
                handleInsertModalShow={this.handleInsertModalShow}
                />
                <EditModal
                data={this.state.data}
                editModal={this.state.editModal}
                handleEditModalHide={this.handleEditModalHide}
                handleEditModalShow={this.handleEditModalShow}
                />
            </div>
        );
    }
}

