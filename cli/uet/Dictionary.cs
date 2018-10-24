using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using Microsoft.EntityFrameworkCore;
using UetDictionaryCli.Models;

namespace UetDictionaryCli
{
    public static class Dictionary
    {
        static DictionaryContext db;
        static Dictionary()
        {
            db = new DictionaryContext();
        }
        public static List<Word> GetAllWords()
        {
            return db.Words.OrderBy(item => item.InEnglish).ToList();
        }

        public static List<Word> Search(string _English)
        {
            List<Word> result = db.Words
                .Where(item => item.InEnglish.ToLower().StartsWith(_English))
                .OrderBy(item => item.InEnglish)
                .ToList();
            return result;
        }
        public static int Insert(string _English, string _Vietnamese)
        {
            db.Words.Add(new Word(_English, _Vietnamese));
            return db.SaveChanges();
        }
        public static int Edit(string _English, string _NewEnglish, string _NewVietnamese)
        {
            db.Words
                .ToList()
                .ForEach(item => {
                    item.InEnglish = (item.InEnglish.ToLower() == _English) ? _NewEnglish : item.InEnglish;
                    item.InVietnamese = (item.InEnglish.ToLower() == _English) ? _NewVietnamese : item.InVietnamese;
                });
            return db.SaveChanges();
        }
        public static int Remove(string _English)
        {
            var result = db.Words.Where(item => item.InEnglish.ToLower() == _English).FirstOrDefault();
            db.Words.Remove(result);
            return db.SaveChanges();
        }

        public new static string ToString()
        {
            string str = "";
            db.Words
                .OrderBy(word => word.InEnglish)
                .ToList()
                .ForEach(word => {
                    str += $"{word.InEnglish}: {word.InVietnamese}{System.Environment.NewLine}";
                });
            return str;
        }

    }
}
