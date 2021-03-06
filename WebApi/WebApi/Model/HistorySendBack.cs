﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApi.Model
{
    public class HistorySendBack
    {
        public string Id { get; set; }
        public string SlotName { get; set; }
        // ชื่อคนคืนกับพยาน
        public string BorrowHistoryid { get; set; }
        public string SendbackUsername { get; set; }
        public string WitnessSendback { get; set; }
        public string SlotId { get; set; }
        public IEnumerable<Insertitem> Item { get; set; }
        public DateTime? Datebackitem { get; set; }
        // checkคน  ตอนคืน
    }
}
