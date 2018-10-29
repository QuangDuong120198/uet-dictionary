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
            }
        };
        this.handleSearchBoxChange = this.handleSearchBoxChange.bind(this);
        this.handleEditModalHide = this.handleEditModalHide.bind(this);
        this.handleEditModalShow = this.handleEditModalShow.bind(this);
        this.handleInsertModalHide = this.handleInsertModalHide.bind(this);
        this.handleInsertModalShow = this.handleInsertModalShow.bind(this);

        this.handleInsertWordInEnglishChange = this.handleInsertWordInEnglishChange.bind(this);
        this.handleInsertWordPronunciationChange = this.handleInsertWordPronunciationChange.bind(this);
        this.handleInsertWordDetailTypeChange = this.handleInsertWordDetailTypeChange.bind(this);
        this.handleInsertWordDetailMeaningChange = this.handleInsertWordDetailMeaningChange.bind(this);
        this.handleInsertWordDetailExampleInEnglishChange = this.handleInsertWordDetailExampleInEnglishChange.bind(this);
        this.handleInsertWordDetailExampleInVietnameseChange = this.handleInsertWordDetailExampleInVietnameseChange.bind(this);

        this.addWordDetail = this.addWordDetail.bind(this);
        this.removeWordDetail = this.removeWordDetail.bind(this);

        this.setCurrentWord = this.setCurrentWord.bind(this);
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
            } else {
                this.setState({
                    currentWord: {
                        wordId: 0,
                        wordInEnglish: "",
                        wordPronunciation: "",
                        wordDetails: [
                            {
                                WordType: "",
                                MeaningAndExample: [
                                    {
                                        Meaning: "",
                                        Examples: ""
                                    }
                                ]
                            }
                        ]
                    }
                });
            }
        } else {
            this.setState({
                currentWord: {
                    wordId: 0,
                    wordInEnglish: "",
                    wordPronunciation: "",
                    wordDetails: [
                        {
                            WordType: "",
                            MeaningAndExample: [
                                {
                                    Meaning: "",
                                    Examples: ""
                                }
                            ]
                        }
                    ]
                }
            })
        }
    }

    handleInsertWordInEnglishChange(e)
    {
        let state = this.state;
        state.insertModal.input.wordInEnglish.value = e.target.value;
        state.insertModal.input.wordInEnglish.message = e.target.value.trim() ? "" : "Không được để trống";
        this.setState(state);
    }

    handleInsertWordPronunciationChange(e)
    {
        let state = this.state;
        state.insertModal.input.wordPronunciation.value = e.target.value;
        state.insertModal.input.wordPronunciation.message = e.target.value.trim() ? "" : "Không được để trống";
        this.setState(state);
    }

    handleInsertWordDetailTypeChange(e, detailIndex)
    {
        let state = this.state;
        state.insertModal.input.wordDetails[detailIndex].type.value = e.target.value;
        state.insertModal.input.wordDetails[detailIndex].type.message = e.target.value.trim() ? "" : "Không được để trống";
        this.setState(state);
    }

    handleInsertWordDetailMeaningChange(e, detailIndex)
    {
        let state = this.state;
        state.insertModal.input.wordDetails[detailIndex].meaning.value = e.target.value;
        state.insertModal.input.wordDetails[detailIndex].meaning.message = e.target.value.trim() ? "" : "Không được để trống";
        this.setState(state);
    }

    handleInsertWordDetailExampleInEnglishChange(e, detailIndex, exampleIndex)
    {
        let state = this.state;
        state.insertModal.input.wordDetails[detailIndex].examples[exampleIndex].inEnglish.value = e.target.value;
        state.insertModal.input.wordDetails[detailIndex].examples[exampleIndex].inEnglish.message = e.target.value.trim() ? "" : "Không được để trống";
        this.setState(state);
    }

    handleInsertWordDetailExampleInVietnameseChange(e, detailIndex, exampleIndex)
    {
        let state = this.state;
        state.insertModal.input.wordDetails[detailIndex].examples[exampleIndex].inVietnamese.value = e.target.value;
        state.insertModal.input.wordDetails[detailIndex].examples[exampleIndex].inVietnamese.message = e.target.value.trim() ? "" : "Không được để trống";
        this.setState(state);
    }

    addWordDetail()
    {
        let state = this.state;
        state.insertModal.input.wordDetails.push({
            type: { value: "", message: "" },
            meaning: { value: "", message: "" },
            examples: [
                {
                    inEnglish: { value: "", message: "" },
                    inVietnamese: { value: "", message: "" }
                }
            ]
        });
        this.setState(state);
    }

    removeWordDetail(index)
    {
        let state = this.state;
        state.insertModal.input.wordDetails.splice(index, 1);
        this.setState(state);
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
                handleInsertWordInEnglishChange={this.handleInsertWordInEnglishChange}
                handleInsertWordPronunciationChange={this.handleInsertWordPronunciationChange}
                handleInsertWordDetailTypeChange={this.handleInsertWordDetailTypeChange}
                handleInsertWordDetailMeaningChange={this.handleInsertWordDetailMeaningChange}
                handleInsertWordDetailExampleInEnglishChange={this.handleInsertWordDetailExampleInEnglishChange}
                handleInsertWordDetailExampleInVietnameseChange={this.handleInsertWordDetailExampleInVietnameseChange}
                addWordDetail={this.addWordDetail}
                removeWordDetail={this.removeWordDetail}
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

