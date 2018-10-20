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

            Console.Write(">>> Nhập vào từ tiếng Anh: ");
            English = Console.ReadLine();

            Console.Write(">>> Nhập vào nghĩa tiếng Việt: ");
            Vietnamese = Console.ReadLine();

            Dictionary.Write(new Word(English, Vietnamese));
        }

        public static void ShowAllWords() {
            //Console.OutputEncoding = Encoding.Unicode;
            try {
                if (Dictionary.list.Count > 0) {
                    Dictionary.list.ForEach(item => {
                        Message.Log($"{item.InEnglish}: {item.InVietnamese}", MessageType.Info);
                    });
                }
            } catch (NullReferenceException exception) {
                exception.Message.ToString();
                Message.Log("Từ điển đang rỗng", MessageType.Warn);
            }
        }

        public static void Search() {
            Console.Write("Nhập từ tìm kiếm: ");
            string _query = Console.ReadLine();
            List<Word> result = Dictionary.list
                .Where(item => item.InEnglish.StartsWith(_query.ToLower()))
                .ToList();
            if (result.Count > 0) {
                result.ForEach(item => {
                    Message.Log($"* {item.InEnglish}: {item.InVietnamese}", MessageType.Info);
                });
            } else {
                Message.Log("Không tìm thấy từ bạn tìm kiếm", MessageType.Warn);
            }
        }

        public static void Export() {
            string filepath = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.UserProfile), "dictionary.txt");
            TextWriter writer = new StreamWriter(filepath);
            writer.WriteLine(JsonConvert.SerializeObject(Dictionary.list, Formatting.Indented));
            writer.Flush();
            writer.Close();
            Console.WriteLine($"Đã xuất ra file {filepath}");
        }

        public static void Import() {
            Console.Write("Nhập tên file: ");
            string filepath = Console.ReadLine();

            if (File.Exists(filepath)) {
                TextReader reader = new StreamReader(filepath);
                string content = reader.ReadToEnd();
                List<Word> ParseContent = null;
                
                try {
                    ParseContent = JsonConvert.DeserializeObject<List<Word>>(content);
                } catch (JsonSerializationException exception) {
                    exception.Message.ToString();
                    Message.Log("File không đúng định dạng", MessageType.Danger);
                } catch (JsonReaderException exception) {
                    exception.Message.ToString();
                    Message.Log("File không đúng định dạng", MessageType.Danger);
                } catch (IOException exception) {
                    exception.Message.ToString();
                    Message.Log("File đang được sử dụng", MessageType.Danger);
                } finally {
                    if (ParseContent == null) {
                        Message.Log("File không đúng định dạng", MessageType.Danger);
                    } else {
                        ParseContent.ForEach(item => {
                            Dictionary.Write(item);
                        });
                    }
                }
            } else {
                Message.Log("File này không tồn tại", MessageType.Danger);
            }
        }

    }
}

