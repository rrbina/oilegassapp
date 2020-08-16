using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Server.DTOs
{
    //Dtos devem ter apenas tipos primitivos ou outros dtos
    public class UserDto
    {
        [Required]
        [Column("id")]
        public int ID { get; set; }

        [Required]
        [MaxLength(27)]
        [Column("nome")]
        public string Name { get; set; }

        [Required]
        [Column("email")]
        public string Email { get; set; }

        [Column("senha")]
        public string Password { get; set; }

        [Column("funcao")]
        public string funcao { get; set; }

        [Column("empresa")]
        public string empresa { get; set; }
    }
}