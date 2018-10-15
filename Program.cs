using System;
using System.Text;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.IO;
using Newtonsoft.Json;

namespace uet_dictionary
{
    public class Program
    {
        public static void Main(string[] args)
        {
            DictionaryManager.InsertFromCommandLine();
        }
    }
}
