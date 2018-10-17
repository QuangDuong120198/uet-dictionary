﻿using System;
using System.Text;
using System.Collections.Generic;
using System.IO;
using Newtonsoft.Json;

namespace UetDictionaryCLI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            Console.OutputEncoding = Encoding.Unicode;
            Console.InputEncoding = Encoding.Unicode;
            Console.WriteLine("Từ điển");
            Console.WriteLine("1. Thêm từ mới");
            Console.WriteLine("2. Hiển thị toàn bộ từ điển");
            Console.WriteLine("3. Tìm kiếm");
            Console.WriteLine("4. Xuất file");
            Console.WriteLine("5. Nhập từ file");
            Console.Write("Chọn tính năng: ");

            int feature = int.Parse(Console.ReadLine());

            switch(feature) {
                case 2:
                    DictionaryManager.ShowAllWords();
                    break;
                case 3:
                    DictionaryManager.Search();
                    break;
                case 4:
                    DictionaryManager.Export();
                    break;
                case 5:
                    DictionaryManager.Import();
                    break;
                default:
                    DictionaryManager.InsertFromCommandLine();
                    break;
            }
        }
    }
}