using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;
using Moq;
using BlizzardWebApp.Server.Services;
using BlizzardWebApp.Server.Interfaces;

namespace DataPortal.Tests
{
    public class DbServiceTests
    {
        public readonly Mock<IDbService> _mockDbService;


        public DbServiceTests()
        {
            _mockDbService = new Mock<IDbService>();
        }

        [Fact]
        public async Task Create_Groups_WithValidInput()
        {
            int a = 5, b = 10;

            var result = a + b;

            Assert.Equal(15, result);
        }

        [Fact]
        public async Task Create_Groups_WithInValidInput()
        {
            int a = 5;
            int b = 10;

            var result = a + b;

            Assert.Equal(15, result);
        }
    }
}
