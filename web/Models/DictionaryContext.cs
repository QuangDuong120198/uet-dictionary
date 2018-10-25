using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Sqlite;

namespace UetDictionaryWeb.Models
{
    public class DictionaryContext : DbContext
    {
        public DbSet<Word> Words { get; set; }
        public DictionaryContext(DbContextOptions<DictionaryContext> options) : base(options)
        {
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlite("Data Source=dictionary.db");
            }
        }
    }
}
