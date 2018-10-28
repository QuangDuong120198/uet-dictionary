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
            filteredData: [],
            searchInput: "",
            currentWord: {
                wordId: 0,
                wordName: "",
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
        };
        this.handleSearchBoxChange = this.handleSearchBoxChange.bind(this);
        this.setCurrentWord = this.setCurrentWord.bind(this);
    }

    componentDidMount()
    {
        axios.post("/home/getdictionary")
        .then((response) => {
            console.log(response.data);
            this.setState({
                data: response.data,
                filteredData: response.data
            });
        })
        .catch((err) => {
            console.warn(err.message);
        });
    }

    handleSearchBoxChange(e)
    {
        this.setState({
            searchInput: e.target.value
        });
    }

    setCurrentWord(id)
    {
        if (typeof (+id) === "number" && Number.isInteger(+id) && (+id > 0)) {
            let currentWordInJson =  this.state.data
                                .find((value) => {
                                    return value.id === id;
                                });
            let currentWord = this.state.currentWord;
            currentWord.wordId = currentWordInJson.id;
            currentWord.wordName = currentWordInJson.inEnglish;
            currentWord.wordPronunciation = currentWordInJson.pronunciation;
            currentWord.wordDetails = JSON.parse(currentWordInJson.details);
            this.setState({
                currentWord: currentWord
            });
        }
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

