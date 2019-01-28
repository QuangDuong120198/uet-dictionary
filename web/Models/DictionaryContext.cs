using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Sqlite;

namespace UetDictionaryWeb.Models
{
    public class DictionaryContext : DbContext
    {
        public DbSet<Unit> Units { get; set; }

        public DictionaryContext()
        {
        }

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

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<Unit>(entity =>
            {
                entity.HasKey(unit => unit.Id);
                entity.Property(unit => unit.Id)
                    .HasColumnType("integer");
                entity.Property(unit => unit.Word)
                    .IsRequired()
                    .HasColumnType("text");
                entity.Property(unit => unit.Content)
                    .IsRequired()
                    .HasColumnType("text");
            });
        }
    }
}
