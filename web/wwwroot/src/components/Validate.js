module.exports = {

  wordInEnglish: function(wordInEnglishState) {
    if(wordInEnglishState.value.trim() === "") {
      wordInEnglishState.message = "Không được để trống";
      return false;
    } else if (!/(^[a-z]+$)/ig.test(wordInEnglishState.value)) {
      wordInEnglishState.message = "Chỉ được sử dụng các kí tự A-Z";
      return false;
    } else if (wordInEnglishState.value.length > 32) {
      wordInEnglishState.message = "Không được dài hơn 32 kí tự";
      return false;
    } else {
      wordInEnglishState.message = "";
      return true;
    }
  },

  wordPronunciation: function(wordPronunciationState) {
    if (wordPronunciationState.value.trim() === "") {
      wordPronunciationState.message = "Không được để trống";
      return false;
    } else if (/^\s|\s$/g.test(wordPronunciationState.value)) {
      wordPronunciationState.message = "Không được bắt đầu hoặc kết thúc bằng khoảng trắng";
      return false;
    } else if (wordPronunciationState.value.length > 32) {
      wordPronunciationState.message = "Không được dài hơn 32 kí tự";
      return false;
    } else {
      wordPronunciationState.message = "";
      return true;
    }
  },

  wordType: function(wordTypeState) {
    if (wordTypeState.value.trim() === "") {
      wordTypeState.message = "Không được để trống";
      return false;
    } else if (/^\s|\s$/g.test(wordTypeState.value)) {
      wordTypeState.message = "Không được bắt đầu hoặc kết thúc bằng khoảng trắng";
      return false;
    } else if (wordTypeState.value.length > 32) {
      wordTypeState.message = "Không được dài hơn 32 kí tự";
      return false;
    } else {
      wordTypeState.message = "";
      return true;
    }
  },

  wordMeaning: function(wordMeaningState) {
    if (wordMeaningState.value.trim() === "") {
      wordMeaningState.message = "Không được để trống";
      return false;
    } else if (/^\s|\s$/g.test(wordMeaningState.value)) {
      wordMeaningState.message = "Không được bắt đầu hoặc kết thúc bằng khoảng trắng";
      return false;
    } else if (wordMeaningState.value.length > 128) {
      wordMeaningState.message = "Không được dài hơn 128 kí tự";
      return false;
    } else {
      wordMeaningState.message = "";
      return true;
    }
  },

  wordExampleInEnglish: function(wordExampleInEnglishState) {
    if (wordExampleInEnglishState.value.trim() === "") {
      wordExampleInEnglishState.message = "Không được để trống";
      return false;
    } else if (/^\s|\s$/g.test(wordExampleInEnglishState.value)) {
      wordExampleInEnglishState.message = "Không được bắt đầu hoặc kết thúc bằng khoảng trắng";
      return false;
    } else if (wordExampleInEnglishState.value.length > 256) {
      wordExampleInEnglishState.message = "Không được dài hơn 256 kí tự";
      return false;
    } else {
      wordExampleInEnglishState.message = "";
      return true;
    }
  },

  wordExampleInVietnamese: function(wordExampleInVietnameseState) {
    if (wordExampleInVietnameseState.value.trim() === "") {
      wordExampleInVietnameseState.message = "Không được để trống";
      return false;
    } else if (/^\s|\s$/g.test(wordExampleInVietnameseState.value)) {
      wordExampleInVietnameseState.message = "Không được bắt đầu hoặc kết thúc bằng khoảng trắng";
      return false;
    } else if (wordExampleInVietnameseState.value.length > 256) {
      wordExampleInVietnameseState.message = "Không được dài hơn 256 kí tự";
      return false;
    } else {
      wordExampleInVietnameseState.message = "";
      return true;
    }
  },

  insertWord: function(insertModalState) {
    // insertModal: {
    //   show: true,
    //   data: {
    //     id: 0,
    //     inEnglish: { value: "", message: "" },
    //     pronunciation: { value: "", message: "" },
    //     content: [
    //       {
    //         type: { value: "", message: "" },
    //         meaningsAndExamples: [
    //           {
    //             meaning: { value: "", message: "" },
    //             examples: [
    //               {
    //                 inEnglish: { value: "", message: "" },
    //                 inVietnamese: { value: "", message: "" }
    //               }
    //             ]
    //           }
    //         ]
    //       }
    //     ]
    //   }
    // }
    let isValid = true;

    isValid = isValid && this.wordExampleInEnglish(insertModalState.data.inEnglish);
    
    isValid = isValid && this.wordPronunciation(insertModalState.data.pronunciation);

    insertModalState.data.content.forEach((currentTypeValue) => {

      isValid = isValid && this.wordType(currentTypeValue.type);

      currentTypeValue.meaningsAndExamples.forEach((currentMeaningValue) => {
        
        isValid = isValid && this.wordType(currentMeaningValue.meaning);

        currentMeaningValue.examples.forEach((currentExampleValue) => {

          isValid = isValid && this.wordExampleInEnglish(currentExampleValue.inEnglish);
          isValid = isValid && this.wordExampleInVietnamese(currentExampleValue.inVietnamese);

        });
      
      });

    });
    return isValid;
  }

};
