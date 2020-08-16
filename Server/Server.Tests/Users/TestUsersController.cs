using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Web.Http.Results;
using System.Net;
using Server.Controllers;
using Server.Models;
using Server.DTOs;
using Server.db;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Moq;
using System.Web.Http;
using System.ComponentModel.DataAnnotations;

namespace Server.Tests
{
    [TestClass]
    public class TestUsersController
    {
        [TestInitialize]
        public void testInit()
        {
            Mapper.Initialize(c => c.AddProfile<App_Start.MappingProfile>());
        }

        [TestMethod]
        public void CreateUser_Should_Return_CreatedNegotiatedContentResult()
        {
            var controller = TestUtil.getUsersController();

            var user = GetDemoUserDto();

            IHttpActionResult result = controller.CreateUser(user);

            Assert.IsNotNull(result);

            Assert.IsInstanceOfType(result, typeof(CreatedNegotiatedContentResult<UserDto>));

            CreatedNegotiatedContentResult<UserDto> contentResult = result as CreatedNegotiatedContentResult<UserDto>;
            
            Assert.AreEqual(contentResult.Location, "http://localhost:51839/api/users/3");          
            
        }

        [TestMethod]
        public void CreateUser_Should_Return_BadRequest()
        {
            var controller = TestUtil.getUsersController();

            var user = GetDemoUserDto();
            user.Name = "111111111122222222223333333333";//30 caracteres

            var validationResults = new List<ValidationResult>();
            var passouNaValidacao = Validator.TryValidateObject(user, new ValidationContext(user), validationResults, true);

            Assert.IsFalse(passouNaValidacao);
            Assert.AreEqual(1, validationResults.Count);          
        }

        [TestMethod]
        public void UpdateUser_Should_Return_OkNegotiatedContentResult()
        {
            var controller = TestUtil.getUsersController();

            var user = GetDemoUserDto();
            IHttpActionResult result = controller.UpdateUser(3,user);

            Assert.IsNotNull(result);

            Assert.IsInstanceOfType(result, typeof(OkNegotiatedContentResult<UserDto>));

            OkNegotiatedContentResult<UserDto> contentResult = result as OkNegotiatedContentResult<UserDto>;

            Assert.AreEqual(contentResult.Content.Name, "Demo name");

            Assert.AreEqual(contentResult.Content.ID, 3);
        }

        [TestMethod]
        public void UpdateUser_Should_Return_BadRequest()
        {
            var controller = TestUtil.getUsersController();

            var user = GetDemoUserDto();
            user.Name = "111111111122222222223333333333";//30 caracteres

            var validationResults = new List<ValidationResult>();
            var passouNaValidacao = Validator.TryValidateObject(user, new ValidationContext(user), validationResults, true);

            Assert.IsFalse(passouNaValidacao);
            Assert.AreEqual(1, validationResults.Count);

        }

        [TestMethod]
        public void UpdateUser_ShouldFail_When_ID_Zero()
        {
            var controller = TestUtil.getUsersController();

            var user = GetDemoUserDto();
            IHttpActionResult result = controller.UpdateUser(0, user);

            Assert.IsInstanceOfType(result, typeof(BadRequestResult));
        }

        [TestMethod]
        public void UpdateUser_ShouldFail_When_Null()
        {
            var controller = TestUtil.getUsersController();

            IHttpActionResult result = controller.UpdateUser(3, null);

            Assert.IsInstanceOfType(result, typeof(BadRequestResult));
        }

        [TestMethod]
        public void UpdateUser_ShouldFail_When_User_Not_Exists()
        {
            var controller = TestUtil.getUsersController();

            var user = GetDemoUserDto();
            IHttpActionResult result = controller.UpdateUser(33, user);

            Assert.IsInstanceOfType(result, typeof(NotFoundResult));
        }


        [TestMethod]
        public void GetUser_Should_Return_User_With_Same_ID()
        {
            var controller = TestUtil.getUsersController();
            var result = controller.GetUsers(3);

            Assert.IsNotNull(result);

            Assert.IsInstanceOfType(result, typeof(OkNegotiatedContentResult<UserDto>));

            var casted = result as OkNegotiatedContentResult<UserDto>;
            Assert.AreEqual(3, casted.Content.ID);
        }

        [TestMethod]
        public void GetUser_User_Not_Exists()
        {
            var controller = TestUtil.getUsersController();
            var result = controller.GetUsers(33);

            Assert.IsNotNull(result);

            Assert.IsInstanceOfType(result, typeof(NotFoundResult));
        }

        [TestMethod]
        public void GetUsers_Should_Return_All_Users()
        {
            var controller = TestUtil.getUsersController();
            var result = controller.GetUsers() as IEnumerable<UserDto>;

            Assert.IsNotNull(result);

            Assert.AreEqual(3, result.Count());
        }

        [TestMethod]
        public void DeleteUser_Should_Return_OK()
        {
            var user = GetDemoUser();
            var controller = TestUtil.getUsersController(user);
            
            var result = controller.DeleteUser(3);
            Assert.IsNotNull(result);

            Assert.IsInstanceOfType(result, typeof(OkNegotiatedContentResult<UserDto>));

            var casted = result as OkNegotiatedContentResult<UserDto>;
            Assert.AreEqual(user.ID, casted.Content.ID);
        }

        [TestMethod]
        public void DeleteUser_User_Not_Exists()
        {
            var user = GetDemoUser();
            var controller = TestUtil.getUsersController(user);

            var result = controller.DeleteUser(33);
            Assert.IsNotNull(result);

            Assert.IsInstanceOfType(result, typeof(NotFoundResult));
        }

        User GetDemoUser()
        {
            return new User() { ID = 3, Name = "Demo name", Email = "c@gmail.com" };
        }

        UserDto GetDemoUserDto()
        {
            return new UserDto() { ID = 3, Name = "Demo name", Email = "c@gmail.com" };
        }
    }
}
