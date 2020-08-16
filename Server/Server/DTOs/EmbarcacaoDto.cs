using Server.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Server.DTOs
{
    public class EmbarcacaoDto
    {
        [Required]
        [Column("id")]
        public int ID { get; set; }

        [Required]
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

        public virtual UserDto Usuario { get; set; }
    }
}