using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using System.IO;
using Microsoft.EntityFrameworkCore;

namespace UetDictionaryCli
{
    public static class DictionaryManager
    {
        public static void ShowAllWords()
        {
            Dictionary.GetAllWords()
                .ForEach(word => {
                    Message.Log($"* {word.InEnglish}: {word.InVietnamese}", MessageType.Info);
                });
        }

        public static void Search()
        {
            Console.Write(">>> Nhập từ tìm kiếm: ");
            string _query = Console.ReadLine();
            _query = Regex.Replace(_query, @"[^A-Za-z]+", "").ToLower();
            Dictionary.Search(_query)
                .ForEach(word => {
                    Message.Log($"* {word.InEnglish}: {word.InVietnamese}", MessageType.Info);
                });
        }

        public static void InsertFromCli()
        {
            string _English, _Vietnamese;
            Console.Write(">>> Nhập từ tiếng Anh: ");
            _English = Console.ReadLine();
            Console.Write(">>> Nhập nghĩa tiếng Việt: ");
            _Vietnamese = Console.ReadLine();

            _English = Regex.Replace(_English, @"[^A-Za-z]+", "").ToLower();

            int changes = Dictionary.Insert(_English, _Vietnamese);

            if (changes == 0) {
                Message.Log($"\"{_English}\" đã có trong từ điển", MessageType.Warning);
            } else {
                Message.Log($"Đã thêm \"{_English}\" vào từ điển", MessageType.Success);
            }
        }

        public static void EditFromCli()
        {
            string _WordToEdit, _NewEnglish, _NewVietnamese;
            Console.Write(">>> Nhập từ bạn muốn sửa: ");
            
            _WordToEdit = Console.ReadLine();
            _WordToEdit = Regex.Replace(_WordToEdit, "[^a-zA-Z]", "").ToLower();

            if (Dictionary.Search(_WordToEdit).Count > 0) {
                Console.Write(">>> Nhập lại từ tiếng Anh: ");
                _NewEnglish = Console.ReadLine();
                _NewEnglish = Regex.Replace(_NewEnglish, "[^a-zA-Z]", "").ToLower();

                Console.Write(">>> Nhập lại nghĩa tiếng Việt: ");
                _NewVietnamese = Console.ReadLine();

                int result = Dictionary.Edit(_WordToEdit, _NewEnglish, _NewVietnamese);
                if (result > 0) {
                    Message.Log($"Đã sửa từ \"{_WordToEdit}\"", MessageType.Success);
                } else {
                    Message.Log($"Không có thay đổi nào", MessageType.Warning);
                }
            } else {
                Message.Log("Không tìm thấy từ bạn muốn sửa", MessageType.Danger);
            }
        }

        public static void RemoveFromCli()
        {
            string _WordToRemove;
            Console.Write(">>> Nhập từ bạn muốn xóa: ");
            _WordToRemove = Console.ReadLine();

            _WordToRemove = Regex.Replace(_WordToRemove, "[^A-Za-z]", "");

            if (Dictionary.Search(_WordToRemove).Count > 0) {
                int deleted = Dictionary.Remove(_WordToRemove);
                if (deleted > 0) {
                    Message.Log($"Đã xóa \"{_WordToRemove}\" khỏi từ điển", MessageType.Success);
                } else {
                    Message.Log("Không có thay đổi nào", MessageType.Warning);
                }
            } else {
                Message.Log("Không tìm thấy từ bạn muốn xóa", MessageType.Danger);
            }
        }

        public static void Export()
        {
            try {
                string homepath = Environment.GetFolderPath(Environment.SpecialFolder.UserProfile);
                string filepath = Path.Combine(homepath, "dictionary.txt");
                if (!File.Exists(filepath)) {
                    File.Create(filepath);
                }
                using(TextWriter writer = new StreamWriter(filepath)) {
                    string content = Dictionary.ToString();
                    writer.WriteLine(content);
                    Message.Log($"Đã lưu từ điển vào file {filepath}", MessageType.Success);
                }
            } catch(IOException exception) {
                exception.Message.ToString();
                Message.Log($"Đã xảy ra lỗi khi lưu file, vui lòng thử lại", MessageType.Danger);
            }
        }
    }
}
