using System;
using System.Text;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace uet_dictionary {
    public class DictionaryManager {
        public static void InsertFromCommandLine() {
            string English, Vietnamese;
            Console.InputEncoding = Encoding.UTF8;
            Console.OutputEncoding = Encoding.UTF8;
            Console.Write("> Nhập vào từ tiếng Anh: ");
            English = Console.ReadLine();
            Console.Write("> Nhập vào nghĩa tiếng Việt: ");
            Vietnamese = Console.ReadLine();
            Word w = new Word() {
                InEnglish = English,
                InVietnamese = Vietnamese
            };
            Dictionary.Insert(w);
        }
    }
}

