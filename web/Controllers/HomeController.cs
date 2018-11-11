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
    public int InsertWord()
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
    public int EditWord()
    {
      using(StreamReader reader = new StreamReader(Request.Body))
      {
        string jsonString = reader.ReadToEnd();

        Word jsonObject = JsonConvert.DeserializeObject<Word>(jsonString);

        Word item = db.Words.Where(word => word.ID == jsonObject.ID).FirstOrDefault();
        if (item != null) {
          item.InEnglish = jsonObject.InEnglish;
          item.Pronunciation = jsonObject.Pronunciation;
          item.Content = jsonObject.Content;
          return db.SaveChanges();
        } else {
          return 0;
        }
      }
    }

    public int RemoveWord()
    {
      using(StreamReader reader = new StreamReader(Request.Body))
      {
        int id = int.Parse(reader.ReadToEnd());
        Word itemWillBeRemoved = db.Words.Where(word => word.ID == id).FirstOrDefault();
        db.Words.Remove(itemWillBeRemoved);
        
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
