using Server.Models;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Data.SQLite;

namespace Server.db
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext() :
            base(new SQLiteConnection()
            {
                ConnectionString = new SQLiteConnectionStringBuilder() { DataSource = System.Web.Hosting.HostingEnvironment.MapPath(@"~/DB/sqlite.db")
                    , ForeignKeys = true }.ConnectionString
            }, true)
        {
        }

        public DatabaseContext(int i)            
        {
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
            base.OnModelCreating(modelBuilder);
        }

        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<Embarcacao> Embarcacoes { get; set; }
    }
}