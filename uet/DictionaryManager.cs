using System;
using System.Text;

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
    }
}

