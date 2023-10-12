using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions options)
        : base(options)
    {
    }

    public DbSet<Project> Projects { get; set; }
    public DbSet<Yarn> Yarns { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<Project>()
            .HasMany(e => e.Yarns)
            .WithOne(e => e.Project)
            .HasForeignKey(e => e.ProjectId)
            .IsRequired(false);
    }
}