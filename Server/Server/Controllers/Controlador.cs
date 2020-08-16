using Server.db;
using System;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace Server.Controllers
{
    public abstract class Controlador : ApiController
    {      
        protected DatabaseContext _context;

        public Controlador()
        {
            _context = new DatabaseContext();
        }

        public Controlador(DatabaseContext context)
        {
            _context = context;
        }       

        public static async Task<string> getContentAsync(HttpContent requestContent)
        {
            string result = await requestContent.ReadAsStringAsync();
            return result;
        }

        public int getUserIdInUri(string absolutePath)
        {
            string b = string.Empty;
            int userId = 0;

            for (int i = 0; i < absolutePath.Length; i++)
            {
                if (Char.IsDigit(absolutePath[i]))
                    b += absolutePath[i];
            }

            if (b.Length > 0)
                userId = int.Parse(b);

            return userId;
        }

        public virtual bool UserIsHimself(HttpRequestMessage Request, string email)
        {
            return true;
        }
        public virtual bool OnlyOwnerAccountIsAuthorized(HttpRequestMessage Request)
        {
            return false;
        }
    }
}
