using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Model
{
    public class User
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string SlotId { get; set; }
        public string SlotName { get; set; }
        public IEnumerable<Insertitem> Item{ get; set; }
    }
}
