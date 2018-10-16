using System;
using System.Text;
using System.Linq;
using System.IO;
using Newtonsoft.Json;

namespace uet_dictionary {
    public class DictionaryManager {
        public static void InsertFromCommandLine() {
            string English, Vietnamese;

            Console.InputEncoding = Encoding.Unicode;
            Console.OutputEncoding = Encoding.Unicode;

            Console.Write(">>> Nhập vào từ tiếng Anh: ");
            English = Console.ReadLine();

            Console.Write(">>> Nhập vào nghĩa tiếng Việt: ");
            Vietnamese = Console.ReadLine();

            Word w = new Word() {
                InEnglish = English,
                InVietnamese = Vietnamese
            };

            Dictionary.Write(w);
        }

        public static void ShowAllWords() {
            Console.OutputEncoding = Encoding.Unicode;
            Dictionary.list.ForEach(item => {
                Console.WriteLine($"{item.InEnglish}: {item.InVietnamese}");
            });
        }

        public static void Search() {
            Console.OutputEncoding = Encoding.Unicode;
            Console.InputEncoding = Encoding.Unicode;
            Console.Write("Nhập từ tìm kiếm: ");
            string _query = Console.ReadLine();
            Dictionary.list
                .Where(item => item.InEnglish.StartsWith(_query.ToLower()))
                .ToList()
                .ForEach(item => {
                    Console.WriteLine($"{item.InEnglish}: {item.InVietnamese}");
                });
        }

        public static void Export() {
            string filepath = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.UserProfile), "dictionary.txt");
            TextWriter t = new StreamWriter(filepath);
            t.WriteLine(JsonConvert.SerializeObject(Dictionary.list, Formatting.Indented));
            t.Flush();
            t.Close();
            Console.WriteLine($"Đã xuất ra file {filepath}");
        }
    }
}

