using System;
using System.Text;
using System.Text.RegularExpressions;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Newtonsoft.Json;

namespace UetDictionaryCLI {
    public class Dictionary {
        static Dictionary() {
            /* 
             * Phương thức khởi tạo tĩnh.
             * Kiểm tra xem đã có file .json chưa, nếu chưa có thì tạo
             * Ngược lại, nếu đã có thì kiểm tra nội dung file có đúng định dạng không
             */
            string path = Directory.GetCurrentDirectory();
            string filename = Path.Combine(path, "db.json");

            if (!File.Exists(filename)) {
                File.Create(filename);
                TextWriter writer = new StreamWriter(filename);
                writer.WriteLine("[]");
                writer.Close();
            } else {
                List<Word> list = null;
                TextReader reader = new StreamReader(filename);
                string content = reader.ReadToEnd();
                try {
                    list = JsonConvert.DeserializeObject<List<Word>>(content);
                } catch (JsonSerializationException exception) {
                    exception.Message.ToString();
                    reader.Close();
                    TextWriter writer = new StreamWriter(filename);
                    writer.WriteLine("[]");
                    writer.Close();
                } finally {
                    if (list == null) {
                        reader.Close();
                        TextWriter writer = new StreamWriter(filename);
                        writer.WriteLine("[]");
                        writer.Close();
                    }
                    reader.Close();
                }
            }
        }
        public static List<Word> list { 
            get {
                string path = Directory.GetCurrentDirectory();
                string filename = Path.Combine(path, "db.json");

                TextReader t = new StreamReader(filename);
                string content = t.ReadToEnd();
                List<Word> _list = JsonConvert.DeserializeObject<List<Word>>(content);
                t.Close();

                return _list;
            } set {
                string path = Directory.GetCurrentDirectory();
                string filename = Path.Combine(path, "db.json");

                TextWriter t = new StreamWriter(filename);
                t.WriteLine(JsonConvert.SerializeObject(value.OrderBy(item => item.InEnglish).Distinct(), Formatting.Indented));
                t.Flush();
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
                    _list.Add(_word);
                    Dictionary.list = _list;
                    Console.WriteLine("Đã thêm từ mới!");
                } else {
                    Console.WriteLine("Từ không được bắt đầu bằng khoảng trắng, không chứa chữ số");
                }
            } else {
                Console.WriteLine("Chỉ sử dụng kí tự chữ cái");
            }
        }
    }
}
