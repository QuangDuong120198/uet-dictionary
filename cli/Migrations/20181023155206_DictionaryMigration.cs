﻿using Microsoft.EntityFrameworkCore.Migrations;

namespace UetDictionaryCli.Migrations
{
  public partial class DictionaryMigration : Migration
  {
    protected override void Up(MigrationBuilder migrationBuilder)
    {
      migrationBuilder.CreateTable(
          name: "Words",
          columns: table => new
          {
            ID = table.Column<int>(nullable: false)
                  .Annotation("Sqlite:Autoincrement", true),
            InEnglish = table.Column<string>(nullable: false),
            InVietnamese = table.Column<string>(nullable: false)
          },
          constraints: table =>
          {
            table.PrimaryKey("PK_Words", x => x.ID);
          });
    }

    protected override void Down(MigrationBuilder migrationBuilder)
    {
      migrationBuilder.DropTable(
          name: "Words");
    }
  }
}
