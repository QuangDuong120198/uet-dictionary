using System;
using System.Text;
using System.Collections.Generic;
using System.Linq;
using System.IO;
using Newtonsoft.Json;

namespace UetDictionaryCLI {
    public class DictionaryManager {
        public static void InsertFromCommandLine() {
            string English, Vietnamese;

            Console.InputEncoding = Encoding.Unicode;
            Console.OutputEncoding = Encoding.Unicode;

            Console.Write(">>> Nhập vào từ tiếng Anh: ");
            English = Console.ReadLine();

            Console.Write(">>> Nhập vào nghĩa tiếng Việt: ");
            Vietnamese = Console.ReadLine();

            Dictionary.Write(new Word(English, Vietnamese));
        }

        public static void ShowAllWords() {
            Console.OutputEncoding = Encoding.Unicode;
            try {
                if (Dictionary.list.Count > 0) {
                    Dictionary.list.ForEach(item => {
                        Console.WriteLine($"{item.InEnglish}: {item.InVietnamese}");
                    });
                }
            } catch (NullReferenceException exception) {
                exception.Message.ToString();
            }
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

        public static void Import() {
            Console.OutputEncoding = Encoding.Unicode;
            Console.InputEncoding = Encoding.Unicode;
            Console.WriteLine("Nhập tên file");
            string filepath = Console.ReadLine();
            if (File.Exists(filepath)) {
                TextReader reader = new StreamReader(filepath);
                string content = reader.ReadToEnd();
                List<Word> ParseContent = null;
                try {
                    ParseContent = JsonConvert.DeserializeObject<List<Word>>(content);
                } catch (JsonSerializationException exception) {
                    exception.Message.ToString();
                } finally {
                    if (ParseContent == null) {
                        Console.WriteLine("File không đúng định dạng");
                    } else {
                        ParseContent.ForEach(item => {
                            Dictionary.Write(item);
                        });
                    }
                }
            } else {
                Console.WriteLine("File này không tồn tại");
            }
        }

    }
}

