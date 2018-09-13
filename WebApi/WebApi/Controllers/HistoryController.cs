using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;
using WebApi.Model;
using System.Linq;


namespace WebApi.Controllers
{
    [Route("api/[controller]/[action]")]
    public class HistoryController : Controller
    {
        MongoClient db;
        IMongoCollection<HistoryBorrow> Collection;
        IMongoCollection<Slotitem> SlotCollection;
        IMongoCollection<HistorySendBack> SendbackCollection;
        public HistoryController()
        {
            db = new MongoClient("mongodb://borrowv:abcd1234@ds243502.mlab.com:43502/borrowv");
            var test = db.GetDatabase("borrowv");
            Collection = test.GetCollection<HistoryBorrow>("history");
            SlotCollection = test.GetCollection<Slotitem>("Locker");
            SendbackCollection = test.GetCollection<HistorySendBack>("sendback");

        }


        // GET api/values
        [HttpGet("{username}")]
        public IEnumerable<HistoryBorrow> ListBorrow(string username)
        {
            var data = Collection.Find(x => (x.Borrowname == username || x.WitnessName == username)
                && x.Dateborrowitem != null
                ).ToList();
            return data;
        }


        [HttpPost("{username}")]
        public HistoryBorrow BorrowItem([FromBody]Slotitem model, string username)
        {
            var history = new HistoryBorrow()
            {
                Id = Guid.NewGuid().ToString(),
                Borrowname = username,
                SlotName = model.Slotname,
                Item = model.Item,
                SlotId = model.Id
            };
            Collection.InsertOne(history);
            return history;
        }

        [HttpPost("{id}/{witnessname}")]
        public bool ConfirmBorrow(string id, string witnessname)
        {
            try
            {

                var history = Collection.Find(x => x.Id == id).FirstOrDefault();
                if (history.Borrowname == witnessname)
                {
                    return false;
                }

                history.WitnessName = witnessname;
                history.Dateborrowitem = DateTime.UtcNow;
                Collection.ReplaceOne(it => it.Id == id, history);
                var slot = SlotCollection.Find(x => x.Id == history.SlotId).FirstOrDefault();
                foreach (var item in history.Item)
                {
                    var updated = slot.Item.FirstOrDefault(i => i.Id == item.Id);
                    updated.quantity -= item.quantity;
                }
                SlotCollection.ReplaceOne(it => it.Id == slot.Id, slot);

                return true;
            }
            catch (Exception)
            {

                return false;
            }

        }

        // GET api/values
        [HttpGet("{id}")]
        public HistoryBorrow GetBorrow(string id)
        {
            var data = Collection.Find(x => (x.Id == id)).FirstOrDefault();
            return data;
        }


        [HttpPost("{id}/{usernamesendback}/{witnessname}")]
        public bool SendBackItem(string id, string usernamesendback, string witnessname)
        {
            try
            {
                var history = Collection.Find(x => x.Id == id).FirstOrDefault();
                //if (!(history.Borrowname == witnessname || history.WitnessName == witnessname || history.Borrowname == usernameborrow || history.WitnessName == usernameborrow))
                //{
                //    return false;
                //}
                //else 

                //if (!((history.Borrowname == usernamesendback || history.WitnessName == usernamesendback) && usernamesendback != witnessname))
                //{
                //    return false;
                //}
                if (history.Borrowname == usernamesendback || history.WitnessName == usernamesendback)
                {

                    //history.SendbackUsername = usernamesendback;
                    //history.WitnessSendback = witnessname;
                    //history.Datebackitem = DateTime.UtcNow;
                    Collection.ReplaceOne(it => it.Id == id, history);
                    var slot = SlotCollection.Find(x => x.Id == history.SlotId).FirstOrDefault();
                    foreach (var item in history.Item)
                    {
                        var updated = slot.Item.FirstOrDefault(i => i.Id == item.Id);
                        updated.quantity += item.quantity;
                    }
                    SlotCollection.ReplaceOne(it => it.Id == slot.Id, slot);

                    return true;
                }
                else if (history.Borrowname != usernamesendback || history.Borrowname != witnessname)
                {
                    return false;
                }
                return false;
            }
            catch (Exception)
            {

                return false;
            }

        }

        //[HttpGet]
        //public IEnumerable<History> ListHistory()
        //{

        //    //return " ";
        //}



        [HttpPost("{id}/{username}")]
        public HistorySendBack Sendback([FromBody]IEnumerable<Insertitem> items, string id, string username)
        {
            var xxx = Collection.Find(x => x.Id == id).FirstOrDefault();

            if (!(xxx.Borrowname == username || xxx.WitnessName == username))
            {
                return null;
            }
            else { 
            var sendback = new HistorySendBack()
            {
                Id = Guid.NewGuid().ToString(),
                SendbackUsername = username,
                SlotName = xxx.SlotName,
                Item = items,
                SlotId = xxx.SlotId
            };
            SendbackCollection.InsertOne(sendback);
            return sendback;
        }
    }

    //[HttpPost("{id}/{witnessname}")]
    //public bool ConfirmSendback(string id, string witnessname)
    //{
    //    try
    //    {

    //        var sendback = Collection.Find(x => x.Id == id).FirstOrDefault();
    //        if (sendback.Borrowname == witnessname)
    //        {
    //            return false;
    //        }

    //        sendback.WitnessName = witnessname;
    //        sendback.Dateborrowitem = DateTime.UtcNow;
    //        Collection.ReplaceOne(it => it.Id == id, sendback);
    //        var slot = SlotCollection.Find(x => x.Id == sendback.SlotId).FirstOrDefault();
    //        foreach (var item in sendback.Item)
    //        {
    //            var updated = slot.Item.FirstOrDefault(i => i.Id == item.Id);
    //            updated.quantity -= item.quantity;
    //        }
    //        SlotCollection.ReplaceOne(it => it.Id == slot.Id, slot);

    //        return true;
    //    }
    //    catch (Exception)
    //    {

    //        return false;
    //    }

    //}



}
}
