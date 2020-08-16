using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Server.DTOs.ViewModels
{
    public class EstatisticaViewModelDto
    {
        public DateTime dataInicio { get; set; }

        public DateTime dataFim { get; set; }

        public virtual List<string> empresas { get; set; }

        public virtual List<int> numeroEmbarcados { get; set; }
    }
}