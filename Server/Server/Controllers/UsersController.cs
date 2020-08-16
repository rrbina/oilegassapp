using Server.db;
using Server.DTOs;
using Server.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using AutoMapper;
using System.Web.Http.Cors;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Server.Token;

namespace Server.Controllers
{
    [EnableCors("http://localhost:4200", "*", "*")]
    [RoutePrefix("api/users")]
    public class UsersController : Controlador
    {
        public UsersController() : base()
        {
        }

        public UsersController(DatabaseContext context) : base(context)
        {
        }

        // localhost:51839/api/users
        [TokenAuthorization]
        [HttpGet]
        public IEnumerable<UserDto> GetUsers()
        {
            return _context.Users.ToList().Select(Mapper.Map<User,UserDto>);
        }

        // localhost:51839/api/users/1
        [TokenAuthorization]
        [HttpGet]
        public IHttpActionResult GetUsers(int id)
        {
            var user = _context.Users.SingleOrDefault( u => u.ID == id);
            if(user==null)
                return NotFound();

            return Ok(Mapper.Map<User, UserDto>(user));
        }

        [HttpPost]
        //localhost:51839/api/users
        //[Route("create")]
        public IHttpActionResult CreateUser(UserDto userDto)
        {
            var user = Mapper.Map<UserDto, User>(userDto);
            _context.Users.Add(user);

            try
            {
                _context.SaveChanges();
            }
            catch
            {
                return BadRequest();
            }
            

            userDto.ID = user.ID;
            return Created(new Uri(Request.RequestUri + "/" + user.ID), userDto)  ;
        }

        [HttpPut]
        //localhost:51839/api/users/1
        [TokenAuthorization]
        public IHttpActionResult UpdateUser(int id, UserDto userDto)
        {
            if (userDto == null || id == 0)
                return BadRequest();
            
            var userInDb = _context.Users.SingleOrDefault(u => u.ID == id);

            if (userInDb == null )
                return NotFound();

            userDto.Password = userInDb.Password;
            Mapper.Map<UserDto, User>(userDto, userInDb);

            try
            {
                _context.SaveChanges();
            }
            catch(Exception)
            {
                return BadRequest();
            }
            return Ok(Mapper.Map<User, UserDto>(userInDb));
        }

        [HttpDelete]
        //localhost:51839/api/users/1  
        public IHttpActionResult DeleteUser(int id)
        {
            var userInDb = _context.Users.SingleOrDefault(u => u.ID == id);
            if (userInDb == null)
                return NotFound();

            _context.Users.Remove(userInDb);
            try
            {
                _context.SaveChanges();
            }
            catch
            {
                return BadRequest();
            }
            return Ok(Mapper.Map<User, UserDto>(userInDb));
        }

        [Route("coloquei_pq_deu_Multiple_actions_were_found_that_match_the_request:(")]
        public override bool OnlyOwnerAccountIsAuthorized(HttpRequestMessage Request)
        {
            string absolutePath = Request.RequestUri.AbsolutePath;
            if (absolutePath.StartsWith("/api/users"))
            {
                if (Request.Method.Method == "PUT")
                {
                    return true;
                }
                else if (Request.Method.Method == "GET")
                {
                    return absolutePath.Any(c => char.IsDigit(c));                    
                }
                else if (Request.Method.Method == "POST")
                {
                    return false;
                }
                else if (Request.Method.Method == "DELETE")
                {
                    return true;
                }
            }

            return false;
        }

        public override bool UserIsHimself(HttpRequestMessage Request, string email)
        {
            string absolutePath = Request.RequestUri.AbsolutePath;
            if (absolutePath.StartsWith("/api/users"))
            {
                if (Request.Method.Method == "PUT")
                {
                    Task<string> result = getContentAsync(Request.Content);
                    if (string.IsNullOrEmpty(result.Result))
                        return false;

                    var user = _context.Users.SingleOrDefault(u => u.Email == email);
                    if (user == null)
                        return false;

                    var obj = JsonConvert.DeserializeObject<UserDto>(result.Result);
                    if (obj.Email != user.Email)
                        return false;
                }
                else if (Request.Method.Method == "GET")
                {
                    if (absolutePath.Any(c => char.IsDigit(c)))
                    {
                        int userId = getUserIdInUri(absolutePath);

                        var user = _context.Users.SingleOrDefault(u => u.Email == email);
                        if (user == null)
                            return false;
                        return user.ID == userId;
                    }
                }
                else if (Request.Method.Method == "DELETE")
                {
                    if (absolutePath.Any(c => char.IsDigit(c)))
                    {
                        int userId = getUserIdInUri(absolutePath);

                        var user = _context.Users.SingleOrDefault(u => u.Email == email);
                        if (user == null)
                            return false;
                        return user.ID == userId;
                    }

                    return false;
                }
            }

            return true;
        }
    }
}
