using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Web.Http;
using System.Web.Http.Cors;
using Microsoft.IdentityModel.Tokens;
using Server.db;
using Server.Models;
using Server.Token;

namespace Server.Controllers
{
    [EnableCors("http://localhost:4200", "*", "*")]
    [RoutePrefix("jwt")]
    public class JwtController : Controlador
    {                  
        public JwtController() : base()
        {
        }

        public JwtController(DatabaseContext context) : base(context)
        {
        }

        [HttpPost]
        [Route("token")]
        public IHttpActionResult Authenticate(User userAuth)
        {
            string email = userAuth.Email;
            string password = userAuth.Password;

            var user = _context.Users.SingleOrDefault(u => u.Email == email && u.Password == password);
            if(user == null)
                return Unauthorized();

            var token = CreateToken(email,user.ID.ToString());
            return Ok(token);
            
        }

        private string CreateToken(string email, string id)
        {
            DateTime issuedAt = DateTime.UtcNow;
            DateTime expires = DateTime.UtcNow.AddDays(1);

            var tokenHandler = new JwtSecurityTokenHandler();

            var claimsIdentity = new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.Email, email),
                new Claim("id", id)
            });

            string secrectKey = TokenUtil.secret;
            //var securityKey = new SymmetricSecurityKey(System.Text.Encoding.Default.GetBytes(secrectKey));
            var securityKey = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(TokenUtil.secret));
            var signingCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256Signature);

            var token =
                (JwtSecurityToken)
                tokenHandler.CreateJwtSecurityToken(
                    issuer: TokenUtil.server,
                    audience: TokenUtil.server,
                    subject: claimsIdentity,
                    notBefore: issuedAt,
                    expires: expires,
                    signingCredentials: signingCredentials);

            var tokenString = tokenHandler.WriteToken(token);

            return tokenString;
        }
    }
}
