using System;
using System.Text;

namespace UetDictionaryCLI {
    public sealed class Message {
        public static void Log(string str, MessageType type) {
            switch(type) {
                case MessageType.Success:
                    Console.ForegroundColor = ConsoleColor.Green;
                    break;
                case MessageType.Warn:
                    Console.ForegroundColor = ConsoleColor.Yellow;
                    break;
                case MessageType.Info:
                    Console.ForegroundColor = ConsoleColor.Cyan;
                    break;
                case MessageType.Danger:
                    Console.ForegroundColor = ConsoleColor.Red;
                    break;
                default:
                    Console.ForegroundColor = ConsoleColor.White;
                    break;
            }
            Console.WriteLine(str);
            Console.ForegroundColor = ConsoleColor.White;
        }
    }
}
