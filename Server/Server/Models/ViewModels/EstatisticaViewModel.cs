using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Server.Models.ViewModels
{
    public class EstatisticaViewModel
    {
        public DateTime dataInicio { get; set; }

        public DateTime dataFim { get; set; }

        public virtual List<string> empresas { get; set; }

        public virtual List<int> numeroEmbarcados { get; set; }
    }
}