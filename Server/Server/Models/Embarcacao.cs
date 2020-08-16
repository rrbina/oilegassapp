using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Server.Models
{
    [Table("embarcacao")]
    public class Embarcacao 
    {
        [Required]
        [Column("id")]
        public int ID { get; set; }

        [ForeignKey("Usuario")]
        [Column("user_id")]
        public int UserId { get; set; }

        [Required]
        [Column("data_embarque")]
        public DateTime DataEmbarque { get; set; }

        [Required]
        [Column("data_desembarque")]
        public DateTime DataDesembarque { get; set; }


        [Required]
        [Column("inicio_folga")]
        public DateTime DataInicioFolga { get; set; }

        [Required]
        [Column("fim_folga")]
        public DateTime DataFimFolga { get; set; }

        public virtual User Usuario { get; set; }
    }
}