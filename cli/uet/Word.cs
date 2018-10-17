using System;

namespace UetDictionaryCLI {
    public class Word {
        public string InEnglish { get; set; }
        public string InVietnamese { get; set; }
        public Word() {
        }
        public static bool operator== (Word left, Word right) {
            return left.InEnglish == right.InEnglish && left.InVietnamese == right.InVietnamese;
        }
        public static bool operator!= (Word left, Word right) {
            return left.InEnglish != right.InEnglish || left.InVietnamese != right.InVietnamese;
        }

        public override bool Equals(object obj) {
            if (obj is Word) {
                return false;
            }
            return this == (Word)obj;
        }
        public override int GetHashCode(){
            return base.GetHashCode();
        }
        public Word(string _InEnglish, string _InVietnamese) {
            InEnglish = _InEnglish;
            InVietnamese = _InVietnamese;
        }
    }
}