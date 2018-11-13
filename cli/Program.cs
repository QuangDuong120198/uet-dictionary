using System;
using System.Text;
using System.Linq;

namespace UetDictionaryCli
{
  class Program
  {
    static void Main(string[] args)
    {
      if (Environment.OSVersion.VersionString.Contains("Windows"))
      {
        Console.OutputEncoding = Encoding.Unicode;
        Console.InputEncoding = Encoding.Unicode;
      }

      string choice;
      bool stop = false;
      do
      {
        Console.WriteLine("TỪ ĐIỂN TRÊN DÒNG LỆNH");
        Console.WriteLine("1> Liệt kê toàn bộ");
        Console.WriteLine("2> Tìm kiếm");
        Console.WriteLine("3> Thêm từ mới");
        Console.WriteLine("4> Sửa");
        Console.WriteLine("5> Xóa");
        Console.WriteLine("6> Xuất file");
        Console.WriteLine("7> Thoát chương trình");
        Console.Write("Chọn tính năng (1-6): ");

        choice = Console.ReadLine();

        switch (choice)
        {
          case "1":
            DictionaryManager.ShowAllWords();
            break;
          case "2":
            DictionaryManager.Search();
            break;
          case "3":
            DictionaryManager.InsertFromCli();
            break;
          case "4":
            DictionaryManager.EditFromCli();
            break;
          case "5":
            DictionaryManager.RemoveFromCli();
            break;
          case "6":
            DictionaryManager.Export();
            break;
          default:
            System.Environment.Exit(0);
            break;
        }

        Console.Write("Tiếp tục? [y/n]: ");
        ConsoleKeyInfo decision = Console.ReadKey();
        if (decision.Key == ConsoleKey.Y || decision.Key == ConsoleKey.Enter) {
          stop = false;
          Console.Clear();
        } else {
          stop = true;
        }
      } while (!stop);
    }
  }
}
