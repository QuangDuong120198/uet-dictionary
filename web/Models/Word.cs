using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace UetDictionaryWeb.Models
{
    public class Unit
    {
        public int Id { get; set; }
        public string Word { get; set; }
        public string Content { get; set; }
        public Unit()
        {
        }
        public Unit(string _Word, string _Content)
        {
            this.Word = _Word;
            this.Content = _Content;
        }
    }
}
