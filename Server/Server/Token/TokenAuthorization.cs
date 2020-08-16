using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Controllers;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Server.DTOs;
using Server.db;
using Server.Controllers;

namespace Server.Token
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, Inherited = true, AllowMultiple = true)]
    public class TokenAuthorization : AuthorizeAttribute
    {
        private DatabaseContext _context;

        private HttpStatusCode statusCode;

        public TokenAuthorization()
        {
            _context = new DatabaseContext();
        }

        protected override bool IsAuthorized(HttpActionContext actionContext)
        {           
            string token;
            var request = actionContext.Request;

            var controller = actionContext.ControllerContext.Controller as Controlador;            

            //chek if a token exists in the request header
            if (!TokenUtil.TryRetrieveToken(request, out token))
            {
                statusCode = HttpStatusCode.Unauthorized;
                return false;
            }
            
            try
            {
                var securityKey = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(TokenUtil.secret));

                var handler = new JwtSecurityTokenHandler();

                var validationParameters = new TokenValidationParameters
                {
                    ValidAudience = TokenUtil.server,
                    ValidIssuer = TokenUtil.server,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    LifetimeValidator = TokenUtil.LifetimeValidator,
                    IssuerSigningKey = securityKey
                };

                //extract and assign the user of the jwt
                var validation = handler.ValidateToken(token, validationParameters, out _);
                var payload = handler.ReadJwtToken(token);
                var email = payload.Claims.First(claim => claim.Type == "email").Value;

                if (controller.OnlyOwnerAccountIsAuthorized(request) && !controller.UserIsHimself(request, email.ToString()))
                    throw new SecurityTokenValidationException();                                   

                return true;
            }
            catch (SecurityTokenValidationException)
            {
                statusCode = HttpStatusCode.Unauthorized;
            }
            catch (Exception)
            {
                statusCode = HttpStatusCode.InternalServerError;
            }            

            return false;
        }

        protected override void HandleUnauthorizedRequest(HttpActionContext actionContext)
        {
            // optionally remember that somebody tried accessing a forbidden url
            actionContext.Response = new HttpResponseMessage(statusCode);
        }

        public static async Task<string> getContentAsync(HttpContent requestContent)
        {
            string result = await requestContent.ReadAsStringAsync();
            return result;
        }       
    }
}