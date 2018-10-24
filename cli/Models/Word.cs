using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace UetDictionaryCli.Models
{
    public class Word
    {
        public int ID { get; set; }
        [Required]
        public string InEnglish { get; set; }
        [Required]
        public string InVietnamese { get; set; }
        public Word()
        {
        }
        public Word(string _InEnglish, string _InVietnamese)
        {
            this.InEnglish = _InEnglish;
            this.InVietnamese = _InVietnamese;
        }
    }
}
