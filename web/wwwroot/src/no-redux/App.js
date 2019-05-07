import React from "react";
import axios from "axios";
import Snackbar from "node-snackbar";
import Layout from "./components/Layout";
import InsertModal from "./components/modal/Insert";
import EditModal from "./components/modal/Edit";
import Validate from "./components/Validate";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            searchInput: "",
            currentWord: {
                Id: 0,
                Word: "",
                Content: ""
            },
            insertModal: {
                show: false,
                data: {
                    Id: 0,
                    Word: { value: "", message: "" },
                    Content: [
                        {
                            type: { value: "", message: "" },
                            meaningsAndExamples: [
                                {
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
                    ]
                }
            },
            editModal: {
                show: false,
                data: {
                    Id: 0,
                    Word: { value: "", message: "" },
                    Content: [
                        {
                            type: { value: "", message: "" },
                            meaningsAndExamples: [
                                {
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
                    ]
                }
            }
        };
        this.handleSearchBoxChange = this.handleSearchBoxChange.bind(this);
        this.setCurrentWord = this.setCurrentWord.bind(this);

        this.handleInsertModalShow = this.handleInsertModalShow.bind(this);
        this.handleInsertModalHide = this.handleInsertModalHide.bind(this);
        this.handleEditModalShow = this.handleEditModalShow.bind(this);
        this.handleEditModalHide = this.handleEditModalHide.bind(this);

        this.handleWordChange = this.handleWordChange.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleMeaningChange = this.handleMeaningChange.bind(this);
        this.handleExampleInEnglishChange = this.handleExampleInEnglishChange.bind(this);
        this.handleExampleInVietnameseChange = this.handleExampleInVietnameseChange.bind(this);

        this.handleAddExample = this.handleAddExample.bind(this);
        this.handleRemoveExample = this.handleRemoveExample.bind(this);
        this.handleAddMeaning = this.handleAddMeaning.bind(this);
        this.handleRemoveMeaning = this.handleRemoveMeaning.bind(this);
        this.handleAddType = this.handleAddType.bind(this);
        this.handleRemoveType = this.handleRemoveType.bind(this);

        this.handleInsert = this.handleInsert.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
    }

    componentDidMount() {
        this.updateDictionary();
    }

    updateDictionary() {
        axios.get("/home/getdictionary")
            .then((response) => {
                this.setState({
                    data: response.data
                });
            })
            .catch((err) => {
                console.warn(err.message);
            })
            .then(() => {
                this.setCurrentWord(this.state.currentWord.ID);
            });
    }

    setCurrentWord(id = 0, openEditModal = false) {
        let empty = {
            Id: 0,
            Word: "",
            Content: ""
        };
        let state = this.state;
        state.currentWord = empty;

        if (!isNaN(+id) && Number(+id) > 0) {
            let result = this.state.data.filter((wordValue, wordIndex, wordArray) => {
                return wordValue.Id === Number(id);
            });
            let word = result.length ? result[0] : empty;
            state.currentWord = word;
            state.editModal.show = false;

            state.editModal.data.Id = word.Id;

            state.editModal.data.Word = { value: word.Word, message: "" };

            state.editModal.data.Content = eval(JSON.parse(word.Content));

            state.editModal.data.Content.forEach((typeValue, typeIndex, typeArray) => {

                typeArray[typeIndex].type = { value: typeValue.type, message: "" };

                typeValue.meaningsAndExamples.forEach((meaningValue, meaningIndex, meaningArray) => {
                    typeArray[typeIndex]
                        .meaningsAndExamples[meaningIndex]
                        .meaning = { value: meaningValue.meaning, message: "" };

                    meaningValue.examples.forEach((exampleValue, exampleIndex, exampleArray) => {
                        typeArray[typeIndex]
                            .meaningsAndExamples[meaningIndex]
                            .examples[exampleIndex]
                            = {
                                    inEnglish: { value: exampleValue.inEnglish, message: "" },
                                    inVietnamese: { value: exampleValue.inVietnamese, message: "" }
                                };
                    });
                });
            });
        }
        state.editModal.show = openEditModal;

        this.setState(state);
    }

    handleSearchBoxChange(event) {
        this.setState({
            searchInput: event.target.value
        });
    }

    handleInsertModalShow() {
        this.setState({
            insertModal: {
                show: true,
                data: {
                    Id: 0,
                    Word: { value: "", message: "" },
                    Content: [
                        {
                            type: { value: "", message: "" },
                            meaningsAndExamples: [
                                {
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
                    ]
                }
            }
        });
    }

    handleInsertModalHide() {
        this.setState({
            insertModal: {
                show: false,
                data: {
                    Id: 0,
                    Word: { value: "", message: "" },
                    Content: [
                        {
                            type: { value: "", message: "" },
                            meaningsAndExamples: [
                                {
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
                    ]
                }
            }
        });
    }

    handleEditModalShow() {
        this.setCurrentWord(this.state.currentWord.Id, true);
    }

    handleEditModalHide() {
        this.setCurrentWord(this.state.currentWord.Id, false);
    }

    handleWordChange(event, isedit = false) {
        let state = this.state;
        let modalType = isedit ? "editModal" : "insertModal";
        let value = event.target.value;
        state[modalType].data.Word.value = value;
        Validate.word(state[modalType].data.Word);
        this.setState(state);
    }

    handleTypeChange(ContentIndex, event, isedit = false) {
        let state = this.state;
        let modalType = isedit ? "editModal" : "insertModal";
        let value = event.target.value;
        state[modalType].data
            .Content[ContentIndex].type.value = value;
        Validate.type(state[modalType].data.Content[ContentIndex].type);
        this.setState(state);
    }

    handleMeaningChange(ContentIndex, meaningAndExampleIndex, event, isedit = false) {
        let state = this.state;
        let modalType = isedit ? "editModal" : "insertModal";
        let value = event.target.value;

        let meaning = state[modalType].data
            .Content[ContentIndex]
            .meaningsAndExamples[meaningAndExampleIndex]
            .meaning;

        meaning.value = value;

        Validate.meaning(meaning);

        state[modalType].data
            .Content[ContentIndex]
            .meaningsAndExamples[meaningAndExampleIndex]
            .meaning = meaning;

        this.setState(state);
    }

    handleExampleInEnglishChange(ContentIndex, meaningAndExampleIndex, exampleIndex, event, isedit = false) {
        let state = this.state;
        let modalType = isedit ? "editModal" : "insertModal";
        let value = event.target.value;

        let inEnglish = state[modalType].data
            .Content[ContentIndex]
            .meaningsAndExamples[meaningAndExampleIndex]
            .examples[exampleIndex]
            .inEnglish;
        inEnglish.value = value;

        Validate.exampleInEnglish(inEnglish);

        state[modalType].data
            .Content[ContentIndex]
            .meaningsAndExamples[meaningAndExampleIndex]
            .examples[exampleIndex]
            .inEnglish = inEnglish;
        this.setState(state);
    }

    handleExampleInVietnameseChange(ContentIndex, meaningAndExampleIndex, exampleIndex, event, isedit = false) {
        let state = this.state;
        let value = event.target.value;
        let modalType = isedit ? "editModal" : "insertModal";

        let inVietnamese = state[modalType].data
            .Content[ContentIndex]
            .meaningsAndExamples[meaningAndExampleIndex]
            .examples[exampleIndex]
            .inVietnamese;
        inVietnamese.value = value;

        Validate.exampleInVietnamese(inVietnamese);

        state[modalType].data
            .Content[ContentIndex]
            .meaningsAndExamples[meaningAndExampleIndex]
            .examples[exampleIndex]
            .inVietnamese = inVietnamese;
        this.setState(state);
    }

    handleAddType(isedit = false) {
        let state = this.state;
        let modalType = isedit ? "editModal" : "insertModal";
        state[modalType].data
            .Content
            .push({
                type: { value: "", message: "" },
                meaningsAndExamples: [
                    {
                        meaning: { value: "", message: "" },
                        examples: [
                            {
                                inEnglish: { value: "", message: "" },
                                inVietnamese: { value: "", message: "" }
                            }
                        ]
                    }
                ]
            });
        this.setState(state);
    }

    handleRemoveType(typeIndex, isedit = false) {
        let state = this.state;
        let modalType = isedit ? "editModal" : "insertModal";
        if (state[modalType].data.Content.length > 1) {
            state[modalType].data.Content.splice(typeIndex, 1);
            this.setState(state);
        }
    }

    handleAddMeaning(typeIndex, isedit = false) {
        let state = this.state;
        let modalType = isedit ? "editModal" : "insertModal";
        state[modalType].data
            .Content[typeIndex]
            .meaningsAndExamples
            .push({
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

    handleRemoveMeaning(typeIndex, meaningAndExampleIndex, isedit = false) {
        let state = this.state;
        let modalType = isedit ? "editModal" : "insertModal";
        if (state[modalType].data.Content[typeIndex].meaningsAndExamples.length > 1) {
            state[modalType].data.Content[typeIndex].meaningsAndExamples.splice(meaningAndExampleIndex, 1);
            this.setState(state);
        }
    }

    handleAddExample(typeIndex, meaningAndExampleIndex, isedit = false) {
        let state = this.state;
        let modalType = isedit ? "editModal" : "insertModal";
        state[modalType].data
            .Content[typeIndex]
            .meaningsAndExamples[meaningAndExampleIndex]
            .examples
            .push({
                inEnglish: { value: "", message: "" },
                inVietnamese: { value: "", message: "" }
            });
        this.setState(state);
    }

    handleRemoveExample(typeIndex, meaningAndExampleIndex, exampleIndex, isedit = false) {
        let modalType = isedit ? "editModal" : "insertModal";
        if (this.state[modalType].data.Content[typeIndex].meaningsAndExamples[meaningAndExampleIndex].examples.length > 1) {
            let state = this.state;
            state[modalType].data
                .Content[typeIndex]
                .meaningsAndExamples[meaningAndExampleIndex]
                .examples
                .splice(exampleIndex, 1);
            this.setState(state);
        }
    }

    handleInsert() {
        let insertModalState = this.state.insertModal;
        Validate.all(insertModalState);
        let isValid = Validate.all(insertModalState);
        this.setState(
            { insertModal: insertModalState },
            () => {
                if (isValid) {
                    let jsonObject = {
                        Id: 0,
                        Word: "",
                        Content: []
                    };

                    let insertModalData = this.state.insertModal.data;

                    jsonObject.Word = insertModalData.Word.value;

                    insertModalData.Content.forEach((typeValue, typeIndex, typeArray) => {
                        jsonObject.Content.push({
                            type: typeValue.type.value,
                            meaningsAndExamples: []
                        });
                        typeValue.meaningsAndExamples.forEach((meaningValue, meaningIndex, meaningArray) => {
                            jsonObject
                                .Content[typeIndex]
                                .meaningsAndExamples
                                .push({
                                    meaning: meaningValue.meaning.value,
                                    examples: []
                                });
                            meaningValue.examples.forEach((exampleValue, exampleIndex, exampleArray) => {
                                jsonObject
                                    .Content[typeIndex]
                                    .meaningsAndExamples[meaningIndex]
                                    .examples
                                    .push({
                                        inEnglish: exampleValue.inEnglish.value,
                                        inVietnamese: exampleValue.inVietnamese.value
                                    });
                            });
                        });
                    });

                    jsonObject.Content = JSON.stringify(jsonObject.Content);

                    axios.post("/home/insertunit", jsonObject)
                        .then(() => {
                            this.handleInsertModalHide();
                            Snackbar.show({
                                text: "Đã thêm vào từ điển",
                                duration: 3000,
                                pos: "bottom-center",
                                showAction: false
                            });
                        })
                        .catch((err) => {
                            console.warn(err.message);
                        })
                        .then(() => {
                            this.handleInsertModalHide();
                            this.updateDictionary();
                        });
                }
            }
        );
    }

    handleEdit() {
        let editModalState = this.state.editModal;
        Validate.all(editModalState);
        let isValid = Validate.all(editModalState);
        this.setState(
            { editModal: editModalState },
            () => {
                if (isValid) {
                    let jsonObject = {
                        Id: 0,
                        Word: "",
                        Content: []
                    };

                    let editModalData = this.state.editModal.data;

                    jsonObject.Id = editModalData.Id;
                    jsonObject.Word = editModalData.Word.value;

                    editModalData.Content.forEach((typeValue, typeIndex, typeArray) => {
                        jsonObject.Content.push({
                            type: typeValue.type.value,
                            meaningsAndExamples: []
                        });
                        typeValue.meaningsAndExamples.forEach((meaningValue, meaningIndex, meaningArray) => {
                            jsonObject
                                .Content[typeIndex]
                                .meaningsAndExamples
                                .push({
                                    meaning: meaningValue.meaning.value,
                                    examples: []
                                });
                            meaningValue.examples.forEach((exampleValue, exampleIndex, exampleArray) => {
                                jsonObject
                                    .Content[typeIndex]
                                    .meaningsAndExamples[meaningIndex]
                                    .examples
                                    .push({
                                        inEnglish: exampleValue.inEnglish.value,
                                        inVietnamese: exampleValue.inVietnamese.value
                                    });
                            });
                        });
                    });

                    jsonObject.Content = JSON.stringify(jsonObject.Content);

                    axios.put("/home/editunit", jsonObject)
                        .then(() => {
                            this.handleEditModalHide();
                        })
                        .catch((err) => {
                            console.warn(err.message);
                        })
                        .then(() => {
                            this.handleEditModalHide();
                            this.updateDictionary();
                            Snackbar.show({
                                text: "Đã sửa",
                                duration: 3000,
                                pos: "bottom-center",
                                showAction: false
                            });
                        });
                }
            }
        );
    }

    handleRemove() {
        if (confirm("Bạn có chắc muốn xóa từ này khỏi từ điển?")) {
            let id = this.state.currentWord.Id ? Math.abs(this.state.currentWord.Id) : 0;
            axios.delete("home/removeunit", { data: id })
                .then((response) => {
                    if (response.data > 0) {
                        this.setCurrentWord(0);
                    }
                })
                .catch((err) => {
                    console.warn(err.message);
                })
                .then(() => {
                    this.updateDictionary();
                });
        }
    }

    render() {
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
                    handleEditModalShow={this.handleEditModalShow}
                    handleEditModalHide={this.handleEditModalHide}
                    handleRemove={this.handleRemove}
                />
                <InsertModal
                    data={this.state.data}
                    insertModal={this.state.insertModal}
                    handleInsertModalShow={this.handleInsertModalShow}
                    handleInsertModalHide={this.handleInsertModalHide}
                    handleWordChange={this.handleWordChange}
                    handleTypeChange={this.handleTypeChange}
                    handleMeaningChange={this.handleMeaningChange}
                    handleExampleInEnglishChange={this.handleExampleInEnglishChange}
                    handleExampleInVietnameseChange={this.handleExampleInVietnameseChange}
                    handleAddExample={this.handleAddExample}
                    handleRemoveExample={this.handleRemoveExample}
                    handleAddMeaning={this.handleAddMeaning}
                    handleRemoveMeaning={this.handleRemoveMeaning}
                    handleAddType={this.handleAddType}
                    handleRemoveType={this.handleRemoveType}
                    handleInsert={this.handleInsert}
                />
                <EditModal
                    data={this.state.data}
                    editModal={this.state.editModal}
                    handleEditModalShow={this.handleEditModalShow}
                    handleEditModalHide={this.handleEditModalHide}
                    handleWordChange={this.handleWordChange}
                    handleTypeChange={this.handleTypeChange}
                    handleMeaningChange={this.handleMeaningChange}
                    handleExampleInEnglishChange={this.handleExampleInEnglishChange}
                    handleExampleInVietnameseChange={this.handleExampleInVietnameseChange}
                    handleAddExample={this.handleAddExample}
                    handleRemoveExample={this.handleRemoveExample}
                    handleAddMeaning={this.handleAddMeaning}
                    handleRemoveMeaning={this.handleRemoveMeaning}
                    handleAddType={this.handleAddType}
                    handleRemoveType={this.handleRemoveType}
                    handleEdit={this.handleEdit}
                />
            </div>
        );
    }
}

