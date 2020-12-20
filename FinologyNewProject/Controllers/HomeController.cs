using Model;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;

namespace FinologyNewProject.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult FindBankDetailsByIFSC(string Code)
        {
            var retVal = false;
            try
            {
                var BranchDetails = new WebClient().DownloadString("https://ifsc.razorpay.com/" + Code);
                retVal = true;
                return Json(new { retVal = retVal, BranchDetail = BranchDetails }, JsonRequestBehavior.AllowGet);
            }
            catch(Exception ex)
            {
                var ErrorMsg = "IFSC Not Found";
                return Json(new { retVal = retVal, ErrorMsg = ErrorMsg }, JsonRequestBehavior.AllowGet);
            }
            
            
        }
    }

    
}

