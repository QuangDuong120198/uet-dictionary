module.exports = {

  wordInEnglish: function(wordInEnglishState) {
    if(wordInEnglishState.value.trim() === "") {
      wordInEnglishState.message = "Không được để trống";
    } else if (!/(^[a-z]+$)/ig.test(wordInEnglishState.value)) {
      wordInEnglishState.message = "Chỉ được sử dụng các kí tự A-Z";
    } else if (wordInEnglishState.value.length > 32) {
      wordInEnglishState.message = "Không được dài hơn 32 kí tự";
    } else {
      wordInEnglishState.message = "";
    }
  },

  wordPronunciation: function(wordPronunciationState) {
    if (wordPronunciationState.value.trim() === "") {
      wordPronunciationState.message = "Không được để trống";
    } else if (/^\s|\s$/g.test(wordPronunciationState.value)) {
      wordPronunciationState.message = "Không được bắt đầu hoặc kết thúc bằng khoảng trắng";
    } else if (wordPronunciationState.value.length > 32) {
      wordPronunciationState.message = "Không được dài hơn 32 kí tự";
    } else {
      wordPronunciationState.message = "";
    }
  },

  wordType: function(wordTypeState) {
    if (wordTypeState.value.trim() === "") {
      wordTypeState.message = "Không được để trống";
    } else if (/^\s|\s$/g.test(wordTypeState.value)) {
      wordTypeState.message = "Không được bắt đầu hoặc kết thúc bằng khoảng trắng";
    } else if (wordTypeState.value.length > 32) {
      wordTypeState.message = "Không được dài hơn 32 kí tự";
    } else {
      wordTypeState.message = "";
    }
  },

  wordMeaning: function(wordMeaningState) {
    if (wordMeaningState.value.trim() === "") {
      wordMeaningState.message = "Không được để trống";
    } else if (/^\s|\s$/g.test(wordMeaningState.value)) {
      wordMeaningState.message = "Không được bắt đầu hoặc kết thúc bằng khoảng trắng";
    } else if (wordMeaningState.value.length > 128) {
      wordMeaningState.message = "Không được dài hơn 128 kí tự";
    } else {
      wordMeaningState.message = "";
    }
  },

  wordExampleInEnglish: function(wordExampleInEnglishState) {
    if (wordExampleInEnglishState.value.trim() === "") {
      wordExampleInEnglishState.message = "Không được để trống";
    } else if (/^\s|\s$/g.test(wordExampleInEnglishState.value)) {
      wordExampleInEnglishState.message = "Không được bắt đầu hoặc kết thúc bằng khoảng trắng";
    } else if (wordExampleInEnglishState.value.length > 256) {
      wordExampleInEnglishState.message = "Không được dài hơn 256 kí tự";
    } else {
      wordExampleInEnglishState.message = "";
    }
  },

  wordExampleInVietnamese: function(wordExampleInVietnameseState) {
    if (wordExampleInVietnameseState.value.trim() === "") {
      wordExampleInVietnameseState.message = "Không được để trống";
    } else if (/^\s|\s$/g.test(wordExampleInVietnameseState.value)) {
      wordExampleInVietnameseState.message = "Không được bắt đầu hoặc kết thúc bằng khoảng trắng";
    } else if (wordExampleInVietnameseState.value.length > 256) {
      wordExampleInVietnameseState.message = "Không được dài hơn 256 kí tự";
    } else {
      wordExampleInVietnameseState.message = "";
    }
  },

  word: function(state) {
    
  }

};
