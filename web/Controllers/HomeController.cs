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
    protected DictionaryContext db;

    public HomeController()
    {
      db = new DictionaryContext();
    }
    public IActionResult Index()
    {
      return View();
    }
    public IActionResult GetDictionary()
    {
      return new JsonResult(db.Words);
    }

    public int InsertToDictionary()
    {
      using(StreamReader reader = new StreamReader(Request.Body))
      {
        string jsonString = reader.ReadToEnd();

        Word jsonObject = JsonConvert.DeserializeObject<Word>(jsonString);
        Word item = new Word(jsonObject.InEnglish, jsonObject.Pronunciation, jsonObject.Content);

        db.Words.Add(item);

        return db.SaveChanges();
      }
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
      return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
  }
}
