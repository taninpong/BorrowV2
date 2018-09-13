using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using WebApi.Model;

namespace WebApi.Controllers
{
    [Produces("application/json")]
    [Route("api/User/[action]")]
    public class UserController : Controller
    {
        MongoClient db;
        IMongoCollection<HistoryBorrow> Collection;
        IMongoCollection<Slotitem> SlotCollection;
        public UserController()
        {
            db = new MongoClient("mongodb://borrowv:abcd1234@ds243502.mlab.com:43502/borrowv");
            var test = db.GetDatabase("borrowv");
            Collection = test.GetCollection<HistoryBorrow>("history");
            SlotCollection = test.GetCollection<Slotitem>("Locker");

        }

    }

}