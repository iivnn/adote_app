using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Adote.Library.BusinessContexts
{
    public class AdoteContext : DbContext
    {
        public AdoteContext(DbContextOptions<AdoteContext> options): base(options)
        {

        }

        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().ToTable("Adote_Users");
        }
    }
}
