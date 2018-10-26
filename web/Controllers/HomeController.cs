﻿using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
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
        public IActionResult Json()
        {
            return new JsonResult(db.Words.ToList().Select(word => new {
                id = word.ID,
                inEnglish = word.InEnglish
            }));
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
