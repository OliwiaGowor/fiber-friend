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

    public DbSet<User> Users { get; set; }
    public DbSet<Project> Projects { get; set; }
    public DbSet<Pattern> Patterns { get; set; }
    public DbSet<Resource> Resources { get; set; }
    public DbSet<CountersGroup> CountersGroups { get; set; }
    public DbSet<Yarn> Yarns { get; set; }
    public DbSet<Tool> Tools { get; set; }
    public DbSet<OtherSupply> OtherSupplies { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<Project>()
            .HasMany(e => e.Yarns);
    }
}