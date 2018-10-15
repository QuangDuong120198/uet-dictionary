using System;
using System.Text;
using System.Text.RegularExpressions;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.IO;
using System.Linq;
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
        public static void Write(Word _word) {
            List<Word> _list = Dictionary.list;
            if (new Regex(@"^[A-Za-z]+$").IsMatch(_word.InEnglish)) {
                if (!new Regex(@"^\s|\s$|\d").IsMatch(_word.InVietnamese)) {
                    // chuyển thành chữ in thường
                    _word.InEnglish = _word.InEnglish.ToLower();
                    _word.InVietnamese = _word.InVietnamese.ToLower();
                    /* Có 2 tình huống có thể xảy ra
                     * 1. Từ vừa nhập chưa có -> thêm vào
                     * 2. Từ vừa nhập đã có
                     */
                    if (!Dictionary.list.Exists(item => item.InEnglish == _word.InEnglish)) {
                        _list.Add(_word);
                        Dictionary.list = _list;
                    } else {
                        _list[Dictionary.list.FindIndex(item => item.InEnglish == _word.InEnglish)] = _word;
                        Dictionary.list = _list;
                    }
                    Console.WriteLine("Đã thêm từ mới");
                } else {
                    Console.WriteLine("Từ không được bắt đầu bằng khoảng trắng, không chứa chữ số");
                }
            } else {
                Console.WriteLine("Chỉ sử dụng kí tự chữ cái");
            }
        }
    }
}
