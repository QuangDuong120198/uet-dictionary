using System;

namespace UetDictionaryCLI {
    public class Word {
        public string InEnglish { get; set; }
        public string InVietnamese { get; set; }
        public Word() {
        }
        public Word(string _InEnglish, string _InVietnamese) {
            InEnglish = _InEnglish;
            InVietnamese = _InVietnamese;
        }
    }
}