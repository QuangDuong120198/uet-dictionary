using System;
using System.Collections.Generic;

namespace UetDictionaryWeb.Models
{
    class WordDetails
    {
        public string Pronunciation { get; set; }
        // Tuple Type
        public WordAllMeaningsAndExamples AllMeaningsAndExamples { get; set; }
    }

    class WordAllMeaningsAndExamples {
        public string WordType { get; set; }
        public List<WordMeaningAndExample> MeaningAndExample { get; set; }
    }
    class WordMeaningAndExample {
        public string Meaning { get; set; }
        public string Example { get; set; }
    }
}