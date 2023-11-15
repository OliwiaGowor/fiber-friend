using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure;
//TODO: do onModelCreating
public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions options)
        : base(options)
    {
    }

    public DbSet<Project> Projects { get; set; }
    public DbSet<Pattern> Patterns { get; set; }
    public DbSet<Resource> Resources { get; set; }
    public DbSet<Yarn> Yarns { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<Project>()
            .HasMany(e => e.Yarns)
            .WithOne(e => e.Parent)
            .HasForeignKey(e => e.ParentId)
            .IsRequired(false);
    }
}