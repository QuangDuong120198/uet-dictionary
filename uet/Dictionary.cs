using System;
using System.Text;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.IO;
using Newtonsoft.Json;

namespace uet_dictionary {
    public class Dictionary {
        public static List<Word> list { 
            get {
                string path = Directory.GetCurrentDirectory();
                string filename = Path.Combine(path, "test.json");
                TextReader t = new StreamReader(filename);
                string content = t.ReadToEnd();
                List<Word> _list = JsonConvert.DeserializeObject<List<Word>>(content);
                t.Close();
                return _list;
            } set {
                string path = Directory.GetCurrentDirectory();
                string filename = Path.Combine(path, "test.json");
                TextWriter t = new StreamWriter(filename);
                t.WriteLine(JsonConvert.SerializeObject(value, Formatting.Indented));
                t.Close();
            }
        }
        static Dictionary() {
            string path = Directory.GetCurrentDirectory();
            string filename = Path.Combine(path, "test.json");
            if (!File.Exists(filename)) {
                File.Create(filename);
                TextWriter t = new StreamWriter(filename);
                t.WriteLine("[]");
                t.Close();
            }
        }
        public static void Insert(Word _word) {
            List<Word> _list = Dictionary.list;
            _list.Add(_word);
            Dictionary.list = _list;
        }
    }
}
