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
        ID: 0,
        InEnglish: "",
        Pronunciation: "",
        Content: ""
      },
      insertModal: {
        show: false,
        data: {
          id: 0,
          inEnglish: { value: "", message: "" },
          pronunciation: { value: "", message: "" },
          content: [
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
          id: 0,
          inEnglish: { value: "", message: "" },
          pronunciation: { value: "", message: "" },
          content: [
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

    this.handleWordInEnglishChange = this.handleWordInEnglishChange.bind(this);
    this.handleWordPronunciationChange = this.handleWordPronunciationChange.bind(this);
    this.handleWordTypeChange = this.handleWordTypeChange.bind(this);
    this.handleWordMeaningChange = this.handleWordMeaningChange.bind(this);
    this.handleWordExampleInEnglishChange = this.handleWordExampleInEnglishChange.bind(this);
    this.handleWordExampleInVietnameseChange = this.handleWordExampleInVietnameseChange.bind(this);

    this.handleAddExample = this.handleAddExample.bind(this);
    this.handleRemoveExample = this.handleRemoveExample.bind(this);
    this.handleAddMeaning = this.handleAddMeaning.bind(this);
    this.handleRemoveMeaning = this.handleRemoveMeaning.bind(this);
    this.handleAddType = this.handleAddType.bind(this);
    this.handleRemoveType = this.handleRemoveType.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleEditModalShow = this.handleEditModalShow.bind(this);
    this.handleEditModalHide = this.handleEditModalHide.bind(this);
  }

  componentDidMount() {
    this.updateDictionary();
  }

  updateDictionary() {
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

  setCurrentWord(id = 0) {
    let empty = {
      ID: 0,
      InEnglish: "",
      Pronunciation: "",
      Content: ""
    };
    let state = this.state;
    state.currentWord = empty;

    if (Number(id) !== NaN && Number(id) > 0) {
      let result = this.state.data.filter((wordValue, wordIndex, wordArray) => {
        return wordValue.ID === Number(id);
      });
      let word = result.length ? result[0] : empty;
      state.currentWord = word;
      state.editModal.show = false;

      state.editModal.data.id = word.ID;
      
      state.editModal.data.inEnglish = { value: word.InEnglish, message: "" };

      state.editModal.data.pronunciation = { value: word.Pronunciation, message: "" };

      state.editModal.data.content = eval(JSON.parse(word.Content));

      state.editModal.data.content.forEach((typeValue, typeIndex, typeArray) => {

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
          id: 0,
          inEnglish: { value: "", message: "" },
          pronunciation: { value: "", message: "" },
          content: [
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
          id: 0,
          inEnglish: { value: "", message: "" },
          pronunciation: { value: "", message: "" },
          content: [
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

  handleWordInEnglishChange(event, isedit = false) {
    let state = this.state;
    let modalType = isedit ? "editModal" : "insertModal";
    let value = event.target.value;
    state[modalType].data.inEnglish.value = value;
    Validate.wordInEnglish(state[modalType].data.inEnglish);
    this.setState(state);
  }

  handleWordPronunciationChange(event, isedit = false) {
    let state = this.state;
    let modalType = isedit ? "editModal" : "insertModal";
    let value = event.target.value;
    state[modalType].data.pronunciation.value = value;
    Validate.wordPronunciation(state[modalType].data.pronunciation);
    this.setState(state);
  }

  handleWordTypeChange(contentIndex, event, isedit = false) {
    let state = this.state;
    let modalType = isedit ? "editModal" : "insertModal";
    let value = event.target.value;
    state[modalType].data
      .content[contentIndex].type.value = value;
    Validate.wordType(state[modalType].data.content[contentIndex].type);
    this.setState(state);
  }

  handleWordMeaningChange(contentIndex, meaningAndExampleIndex, event, isedit = false) {
    let state = this.state;
    let modalType = isedit ? "editModal" : "insertModal";
    let value = event.target.value;

    let meaning = state[modalType].data
      .content[contentIndex]
      .meaningsAndExamples[meaningAndExampleIndex]
      .meaning;

    meaning.value = value;

    Validate.wordMeaning(meaning);

    state[modalType].data
      .content[contentIndex]
      .meaningsAndExamples[meaningAndExampleIndex]
      .meaning = meaning;

    this.setState(state);
  }

  handleWordExampleInEnglishChange(contentIndex, meaningAndExampleIndex, exampleIndex, event, isedit = false) {
    let state = this.state;
    let modalType = isedit ? "editModal" : "insertModal";
    let value = event.target.value;

    let inEnglish = state[modalType].data
      .content[contentIndex]
      .meaningsAndExamples[meaningAndExampleIndex]
      .examples[exampleIndex]
      .inEnglish;
    inEnglish.value = value;

    Validate.wordExampleInEnglish(inEnglish);

    state[modalType].data
      .content[contentIndex]
      .meaningsAndExamples[meaningAndExampleIndex]
      .examples[exampleIndex]
      .inEnglish = inEnglish;
    this.setState(state);
  }

  handleWordExampleInVietnameseChange(contentIndex, meaningAndExampleIndex, exampleIndex, event, isedit = false) {
    let state = this.state;
    let value = event.target.value;
    let modalType = isedit ? "editModal" : "insertModal";

    let inVietnamese = state[modalType].data
      .content[contentIndex]
      .meaningsAndExamples[meaningAndExampleIndex]
      .examples[exampleIndex]
      .inVietnamese;
    inVietnamese.value = value;

    Validate.wordExampleInVietnamese(inVietnamese);

    state[modalType].data
      .content[contentIndex]
      .meaningsAndExamples[meaningAndExampleIndex]
      .examples[exampleIndex]
      .inVietnamese = inVietnamese;
    this.setState(state);
  }

  handleAddType(isedit = false) {
    let state = this.state;
    let modalType = isedit ? "editModal" : "insertModal";
    state[modalType].data
      .content
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
    if (state[modalType].data.content.length > 1) {
      state[modalType].data.content.splice(typeIndex, 1);
      this.setState(state);
    }
  }

  handleAddMeaning(typeIndex, isedit = false) {
    let state = this.state;
    let modalType = isedit ? "editModal" : "insertModal";
    state[modalType].data
      .content[typeIndex]
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
    if (state[modalType].data.content[typeIndex].meaningsAndExamples.length > 1) {
      state[modalType].data.content[typeIndex].meaningsAndExamples.splice(meaningAndExampleIndex, 1);
      this.setState(state);
    }
  }

  handleAddExample(typeIndex, meaningAndExampleIndex, isedit = false) {
    let state = this.state;
    let modalType = isedit ? "editModal" : "insertModal";
    state[modalType].data
      .content[typeIndex]
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
    if (this.state[modalType].data.content[typeIndex].meaningsAndExamples[meaningAndExampleIndex].examples.length > 1) {
      let state = this.state;
      state[modalType].data
        .content[typeIndex]
        .meaningsAndExamples[meaningAndExampleIndex]
        .examples
        .splice(exampleIndex, 1);
      this.setState(state);
    }
  }

  handleSave() {
    let insertModalState = this.state.insertModal;
    Validate.insertWord(insertModalState);
    let isValid = Validate.insertWord(insertModalState);
    this.setState(
      { insertModal: insertModalState },
      () => {
        if (isValid) {
          let jsonObject = {
            ID: 0,
            InEnglish: "",
            Pronunciation: "",
            Content: []
          };

          let insertModalData = this.state.insertModal.data;

          jsonObject.InEnglish = insertModalData.inEnglish.value;
          jsonObject.Pronunciation = insertModalData.pronunciation.value.replace(/\'/g, "''");
          
          insertModalData.content.forEach((typeValue, typeIndex, typeArray) => {
            jsonObject.Content.push({
              type: typeValue.type.value.replace(/\'/g, "''"),
              meaningsAndExamples: []
            });
            typeValue.meaningsAndExamples.forEach((meaningValue, meaningIndex, meaningArray) => {
              jsonObject
                .Content[typeIndex]
                .meaningsAndExamples
                .push({
                  meaning: meaningValue.meaning.value.replace(/\'/g, "''"),
                  examples: []
                });
              meaningValue.examples.forEach((exampleValue, exampleIndex, exampleArray) => {
                jsonObject
                  .Content[typeIndex]
                  .meaningsAndExamples[meaningIndex]
                  .examples
                  .push({
                    inEnglish: exampleValue.inEnglish.value.replace(/\'/g, "''"),
                    inVietnamese: exampleValue.inVietnamese.value.replace(/\'/g, "''")
                  });
                });
            });
          });
          
          jsonObject.Content = JSON.stringify(jsonObject.Content);

          axios.post("/home/inserttodictionary", jsonObject)
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

/* --------------------------------------------------------------- */

  handleEditModalShow() {
    this.setState({
      editModal: {
        show: true,
        data: this.state.editModal.data
      }
    });
  }

  handleEditModalHide() {
    this.setState({
      editModal: {
        show: false,
        data: this.state.editModal.data
      }
    });
  }

/* =-------------------------------------------------------------- */

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
        />
        <InsertModal
          data={this.state.data}
          insertModal={this.state.insertModal}
          handleInsertModalShow={this.handleInsertModalShow}
          handleInsertModalHide={this.handleInsertModalHide}
          handleWordInEnglishChange={this.handleWordInEnglishChange}
          handleWordPronunciationChange={this.handleWordPronunciationChange}
          handleWordTypeChange={this.handleWordTypeChange}
          handleWordMeaningChange={this.handleWordMeaningChange}
          handleWordExampleInEnglishChange={this.handleWordExampleInEnglishChange}
          handleWordExampleInVietnameseChange={this.handleWordExampleInVietnameseChange}
          handleAddExample={this.handleAddExample}
          handleRemoveExample={this.handleRemoveExample}
          handleAddMeaning={this.handleAddMeaning}
          handleRemoveMeaning={this.handleRemoveMeaning}
          handleAddType={this.handleAddType}
          handleRemoveType={this.handleRemoveType}
          handleSave={this.handleSave}
        />
        <EditModal
          data={this.state.data}
          editModal={this.state.editModal}
          handleEditModalShow={this.handleEditModalShow}
          handleEditModalHide={this.handleEditModalHide}
          handleWordInEnglishChange={this.handleWordInEnglishChange}
          handleWordPronunciationChange={this.handleWordPronunciationChange}
        />
      </div>
    );
  }
}

