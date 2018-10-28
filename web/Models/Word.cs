using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace UetDictionaryWeb.Models
{
    public class Word
    {
        public int ID { get; set; }
        [Required]
        public string InEnglish { get; set; }
        [Required]
        public string Pronunciation { get; set; }
        [Required]
        public string Details { get; set; }
        public Word()
        {
        }
        public Word(string _InEnglish, string _Pronunciation, string _Details)
        {
            this.InEnglish = _InEnglish;
            this.Pronunciation = _Pronunciation;
            this.Details = _Details;
        }
    }
}
