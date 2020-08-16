using Moq;
using Server.Controllers;
using Server.db;
using Server.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace Server.Tests
{
    public class TestUtil
    {
        public static Mock<DbSet<T>> GetQueryableMockDbSet<T>(params T[] sourceList) where T : class
        {
            var queryable = sourceList.AsQueryable();

            var dbSet = new Mock<DbSet<T>>();
            dbSet.As<IQueryable<T>>().Setup(m => m.Provider).Returns(queryable.Provider);
            dbSet.As<IQueryable<T>>().Setup(m => m.Expression).Returns(queryable.Expression);
            dbSet.As<IQueryable<T>>().Setup(m => m.ElementType).Returns(queryable.ElementType);
            dbSet.As<IQueryable<T>>().Setup(m => m.GetEnumerator()).Returns(() => queryable.GetEnumerator());

            return dbSet;
        }

        public static UsersController getUsersController(User user = null)
        {            
            var mockSet = GetQueryableMockDbSet<User>(
                           new User { ID = 1, Name = "Demo1", Email = "a@gmail.com" },
                           new User { ID = 2, Name = "Demo2", Email = "b@gmail.com" },
                            new User { ID = 3, Name = "Demo3", Email = "c@gmail.com" }
                        );

            var mockContext = new Mock<DatabaseContext>();
            mockContext.Setup(c => c.Users).Returns(mockSet.Object);

            if(user != null)
                mockContext.Object.Users.Add(user);

            var controller = new UsersController(mockContext.Object);

            controller.Request = new System.Net.Http.HttpRequestMessage();
            controller.Request.RequestUri = new Uri("http://localhost:51839/api/users");
            controller.Configuration = new System.Web.Http.HttpConfiguration();

            return controller;
        }
    }
}
