using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Model
{
    public class HistoryBorrow
    {
        public string Id { get; set; }
        public string Borrowname { get; set; }
        public string SlotName { get; set; }
        public string SlotId { get; set; }
        public string WitnessName { get; set; }
        public IEnumerable<Insertitem> Item { get; set; }
        public DateTime? Dateborrowitem { get; set; }
    }

}
