module.exports = {
    word(wordState) {
        if (wordState.value.trim() === "") {
            wordState.message = "Không được để trống";
            return false;
        }
        else if (!/(^[a-z]+$)/ig.test(wordState.value)) {
            wordState.message = "Chỉ được sử dụng các kí tự A-Z";
            return false;
        }
        else if (wordState.value.length > 32) {
            wordState.message = "Không được dài hơn 32 kí tự";
            return false;
        }
        else {
            wordState.message = "";
            return true;
        }
    },
    type(typeState) {
        if (typeState.value.trim() === "") {
            typeState.message = "Không được để trống";
            return false;
        }
        else if (/^\s|\s$/g.test(typeState.value)) {
            typeState.message = "Không được bắt đầu hoặc kết thúc bằng khoảng trắng";
            return false;
        }
        else if (typeState.value.length > 32) {
            typeState.message = "Không được dài hơn 32 kí tự";
            return false;
        }
        else {
            typeState.message = "";
            return true;
        }
    },
    meaning(meaningState) {
        if (meaningState.value.trim() === "") {
            meaningState.message = "Không được để trống";
            return false;
        }
        else if (/^\s|\s$/g.test(meaningState.value)) {
            meaningState.message = "Không được bắt đầu hoặc kết thúc bằng khoảng trắng";
            return false;
        }
        else if (meaningState.value.length > 128) {
            meaningState.message = "Không được dài hơn 128 kí tự";
            return false;
        }
        else {
            meaningState.message = "";
            return true;
        }
    },
    exampleInEnglish(exampleInEnglishState) {
        if (exampleInEnglishState.value.trim() === "") {
            exampleInEnglishState.message = "Không được để trống";
            return false;
        }
        else if (/^\s|\s$/g.test(exampleInEnglishState.value)) {
            exampleInEnglishState.message = "Không được bắt đầu hoặc kết thúc bằng khoảng trắng";
            return false;
        }
        else if (exampleInEnglishState.value.length > 256) {
            exampleInEnglishState.message = "Không được dài hơn 256 kí tự";
            return false;
        }
        else {
            exampleInEnglishState.message = "";
            return true;
        }
    },
    exampleInVietnamese(exampleInVietnameseState) {
        if (exampleInVietnameseState.value.trim() === "") {
            exampleInVietnameseState.message = "Không được để trống";
            return false;
        }
        else if (/^\s|\s$/g.test(exampleInVietnameseState.value)) {
            exampleInVietnameseState.message = "Không được bắt đầu hoặc kết thúc bằng khoảng trắng";
            return false;
        }
        else if (exampleInVietnameseState.value.length > 256) {
            exampleInVietnameseState.message = "Không được dài hơn 256 kí tự";
            return false;
        }
        else {
            exampleInVietnameseState.message = "";
            return true;
        }
    },
    all(modalDataState) {
        let isValid = true;

        this.word(modalDataState.data.Word);
        isValid = isValid && this.exampleInEnglish(modalDataState.data.Word);

        modalDataState.data.Content.forEach((currentTypeValue) => {
            this.type(currentTypeValue.type);

            isValid = isValid && this.type(currentTypeValue.type);

            currentTypeValue.meaningsAndExamples.forEach((currentMeaningValue) => {
                this.type(currentMeaningValue.meaning);
                isValid = isValid && this.type(currentMeaningValue.meaning);
                currentMeaningValue.examples.forEach((currentExampleValue) => {
                    this.exampleInEnglish(currentExampleValue.inEnglish);
                    this.exampleInVietnamese(currentExampleValue.inVietnamese);
                    isValid = isValid && this.exampleInEnglish(currentExampleValue.inEnglish);
                    isValid = isValid && this.exampleInVietnamese(currentExampleValue.inVietnamese);
                });
            });
        });
        return isValid;
    }
};
