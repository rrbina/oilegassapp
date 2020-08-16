using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Data.SQLite;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Server.Models
{
    [Table("users")]
    public class User : IValidatableObject
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

        [Required]
        [Column("senha")]
        public string Password { get; set; }

        [Column("funcao")]
        public string funcao { get; set; }

        [Column("empresa")]
        public string empresa { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            if (Name.Length > 27)
            {
                yield return new ValidationResult("O nome deve ter até 27 caracteres", new List<string> { "Nome" });
            }
        }
    }
}