using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.IO;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using UetDictionaryWeb.Models;

namespace UetDictionaryWeb.Controllers
{
    public class HomeController : Controller
    {
        protected DictionaryContext Db;
        public HomeController()
        {
            Db = new DictionaryContext();
        }
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public IActionResult GetDictionary()
        {
            return new JsonResult(Db.Units);
        }

        [HttpPost]
        public int InsertUnit()
        {
            using (StreamReader reader = new StreamReader(Request.Body))
            {
                string jsonString = reader.ReadToEnd();

                Unit jsonObject = JsonConvert.DeserializeObject<Unit>(jsonString);
                Unit item = new Unit(jsonObject.Word, jsonObject.Content);

                Db.Units.Add(item);

                return Db.SaveChanges();
            }
        }

        [HttpPut]
        public int EditUnit()
        {
            using (StreamReader reader = new StreamReader(Request.Body))
            {
                string jsonString = reader.ReadToEnd();

                Unit jsonObject = JsonConvert.DeserializeObject<Unit>(jsonString);

                Unit item = Db.Units.FirstOrDefault(Unit => Unit.Id == jsonObject.Id);
                if (item != null)
                {
                    item.Word = jsonObject.Word;
                    item.Content = jsonObject.Content;
                    return Db.SaveChanges();
                }
                else
                {
                    return 0;
                }
            }
        }

        [HttpDelete]
        public int RemoveUnit()
        {
            using (StreamReader reader = new StreamReader(Request.Body))
            {
                int id = int.Parse(reader.ReadToEnd());
                Unit itemWillBeRemoved = Db.Units.Where(Unit => Unit.Id == id).FirstOrDefault();
                Db.Units.Remove(itemWillBeRemoved);

                return Db.SaveChanges();
            }
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
