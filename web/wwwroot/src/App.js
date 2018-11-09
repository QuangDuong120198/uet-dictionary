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

    this.handleInsertModalWordInEnglishChange = this.handleInsertModalWordInEnglishChange.bind(this);
    this.handleInsertModalWordPronunciationChange = this.handleInsertModalWordPronunciationChange.bind(this);
    this.handleInsertModalWordTypeChange = this.handleInsertModalWordTypeChange.bind(this);
    this.handleInsertModalWordMeaningChange = this.handleInsertModalWordMeaningChange.bind(this);
    this.handleInsertModalWordExampleInEnglishChange = this.handleInsertModalWordExampleInEnglishChange.bind(this);
    this.handleInsertModalWordExampleInVietnameseChange = this.handleInsertModalWordExampleInVietnameseChange.bind(this);

    this.handleInsertModalAddExample = this.handleInsertModalAddExample.bind(this);
    this.handleInsertModalRemoveExample = this.handleInsertModalRemoveExample.bind(this);
    this.handleInsertModalAddMeaning = this.handleInsertModalAddMeaning.bind(this);
    this.handleInsertModalRemoveMeaning = this.handleInsertModalRemoveMeaning.bind(this);
    this.handleInsertModalAddType = this.handleInsertModalAddType.bind(this);
    this.handleInsertModalRemoveType = this.handleInsertModalRemoveType.bind(this);
    this.handleInsertModalSave = this.handleInsertModalSave.bind(this);
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
    if (Number(id) !== NaN && Number(id) > 0) {
      let result = this.state.data.filter((currentWordValue, currentWordIndex, wordArray) => {
        return currentWordValue.ID === Number(id);
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

  handleInsertModalWordInEnglishChange(event) {
    let state = this.state;
    let value = event.target.value;
    state.insertModal.data.inEnglish.value = value;
    Validate.wordInEnglish(state.insertModal.data.inEnglish);
    this.setState(state);
  }

  handleInsertModalWordPronunciationChange(event) {
    let state = this.state;
    let value = event.target.value;
    state.insertModal.data.pronunciation.value = value;
    Validate.wordPronunciation(state.insertModal.data.pronunciation);
    this.setState(state);
  }

  handleInsertModalWordTypeChange(contentIndex, event) {
    let state = this.state;
    let value = event.target.value;
    state.insertModal.data
      .content[contentIndex].type.value = value;
    Validate.wordType(state.insertModal.data.content[contentIndex].type);
    this.setState(state);
  }

  handleInsertModalWordMeaningChange(contentIndex, meaningAndExampleIndex, event) {
    let state = this.state;
    let value = event.target.value;

    let meaning = state.insertModal.data
      .content[contentIndex]
      .meaningsAndExamples[meaningAndExampleIndex]
      .meaning;

    meaning.value = value;

    Validate.wordMeaning(meaning);

    state.insertModal.data
      .content[contentIndex]
      .meaningsAndExamples[meaningAndExampleIndex]
      .meaning = meaning;

    this.setState(state);
  }

  handleInsertModalWordExampleInEnglishChange(contentIndex, meaningAndExampleIndex, exampleIndex, event) {
    let state = this.state;
    let value = event.target.value;

    let inEnglish = state.insertModal.data
      .content[contentIndex]
      .meaningsAndExamples[meaningAndExampleIndex]
      .examples[exampleIndex]
      .inEnglish;
    inEnglish.value = value;

    Validate.wordExampleInEnglish(inEnglish);

    state.insertModal.data
      .content[contentIndex]
      .meaningsAndExamples[meaningAndExampleIndex]
      .examples[exampleIndex]
      .inEnglish = inEnglish;
    this.setState(state);

  }

  handleInsertModalWordExampleInVietnameseChange(contentIndex, meaningAndExampleIndex, exampleIndex, event) {
    let state = this.state;
    let value = event.target.value;

    let inVietnamese = state.insertModal.data
      .content[contentIndex]
      .meaningsAndExamples[meaningAndExampleIndex]
      .examples[exampleIndex]
      .inVietnamese;
    inVietnamese.value = value;

    Validate.wordExampleInVietnamese(inVietnamese);

    state.insertModal.data
      .content[contentIndex]
      .meaningsAndExamples[meaningAndExampleIndex]
      .examples[exampleIndex]
      .inVietnamese = inVietnamese;
    this.setState(state);
  }

  handleInsertModalAddType() {
    let state = this.state;
    state.insertModal.data
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

  handleInsertModalRemoveType(typeIndex) {
    let state = this.state;
    if (state.insertModal.data.content.length > 1) {
      state.insertModal.data.content.splice(typeIndex, 1);
      this.setState(state);
    }
  }

  handleInsertModalAddMeaning(typeIndex) {
    let state = this.state;
    state.insertModal.data
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

  handleInsertModalRemoveMeaning(typeIndex, meaningAndExampleIndex) {
    let state = this.state;
    if (state.insertModal.data.content[typeIndex].meaningsAndExamples.length > 1) {
      state.insertModal.data.content[typeIndex].meaningsAndExamples.splice(meaningAndExampleIndex, 1);
      this.setState(state);
    }
  }

  handleInsertModalAddExample(typeIndex, meaningAndExampleIndex) {
    let state = this.state;
    state.insertModal.data
      .content[typeIndex]
      .meaningsAndExamples[meaningAndExampleIndex]
      .examples
      .push({
        inEnglish: { value: "", message: "" },
        inVietnamese: { value: "", message: "" }
      });
    this.setState(state);
  }

  handleInsertModalRemoveExample(typeIndex, meaningAndExampleIndex, exampleIndex) {
    if (this.state.insertModal.data.content[typeIndex].meaningsAndExamples[meaningAndExampleIndex].examples.length > 1) {
      let state = this.state;
      state.insertModal.data
        .content[typeIndex]
        .meaningsAndExamples[meaningAndExampleIndex]
        .examples
        .splice(exampleIndex, 1);
      this.setState(state);
    }
  }

  handleInsertModalSave() {
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
        />
        <InsertModal
          data={this.state.data}
          insertModal={this.state.insertModal}
          handleInsertModalShow={this.handleInsertModalShow}
          handleInsertModalHide={this.handleInsertModalHide}
          handleInsertModalWordInEnglishChange={this.handleInsertModalWordInEnglishChange}
          handleInsertModalWordPronunciationChange={this.handleInsertModalWordPronunciationChange}
          handleInsertModalWordTypeChange={this.handleInsertModalWordTypeChange}
          handleInsertModalWordMeaningChange={this.handleInsertModalWordMeaningChange}
          handleInsertModalWordExampleInEnglishChange={this.handleInsertModalWordExampleInEnglishChange}
          handleInsertModalWordExampleInVietnameseChange={this.handleInsertModalWordExampleInVietnameseChange}
          handleInsertModalAddExample={this.handleInsertModalAddExample}
          handleInsertModalRemoveExample={this.handleInsertModalRemoveExample}
          handleInsertModalAddMeaning={this.handleInsertModalAddMeaning}
          handleInsertModalRemoveMeaning={this.handleInsertModalRemoveMeaning}
          handleInsertModalAddType={this.handleInsertModalAddType}
          handleInsertModalRemoveType={this.handleInsertModalRemoveType}
          handleInsertModalSave={this.handleInsertModalSave}
        />
        <EditModal
          data={this.state.data}
        />
      </div>
    );
  }
}

