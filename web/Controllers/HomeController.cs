using System;
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
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult Json()
        {
            List<string> str = new List<string>() {
                "Duong",
                "Giang",
                "Hoang",
                "Tung",
                "Khanh",
                "Le Huy",
                "Duy Anh"
            };
            return new JsonResult(str);
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
