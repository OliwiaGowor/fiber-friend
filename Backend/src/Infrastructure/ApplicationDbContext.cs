using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure;
public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions options)
        : base(options)
    {
    }
    public DbSet<User> Users { get; set; }
    public DbSet<Project> Projects { get; set; }
    public DbSet<Pattern> Patterns { get; set; }
    public DbSet<CommunityPattern> CommunityPatterns { get; set; }
    public DbSet<UserSavedCommunityPattern> UserSavedCommunityPatterns { get; set; }
    public DbSet<Resource> Resources { get; set; }
    public DbSet<Counter> Counters { get; set; }
    public DbSet<CountersGroup> CountersGroups { get; set; }
    public DbSet<Yarn> Yarns { get; set; }
    public DbSet<Tool> Tools { get; set; }
    public DbSet<OtherSupply> OtherSupplies { get; set; }
    public DbSet<MyFile> Files { get; set; }
    public DbSet<Photo> Photos { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        //PATTERN BASE
        builder.Entity<PatternBase>()
            .ToTable("Patterns");


        //USER
        builder.Entity<User>()
            .HasKey(u => u.Id);

        builder.Entity<User>()
           .Property(u => u.Id)
           .ValueGeneratedOnAdd();

        builder.Entity<User>()
                .HasMany(u => u.Patterns)
                .WithOne(p => p.Author)
                .HasForeignKey(p => p.AuthorId)
                .OnDelete(DeleteBehavior.Cascade);


        builder.Entity<User>()
            .HasMany(u => u.Resources)
            .WithOne()
            .HasForeignKey(cg => cg.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.Entity<User>()
            .HasMany(u => u.CountersGroups)
            .WithOne(cg => cg.User)
            .HasForeignKey(cg => cg.UserId)
            .OnDelete(DeleteBehavior.NoAction);

        builder.Entity<User>()
            .HasMany(u => u.Projects)
            .WithOne(p => p.User)
            .HasForeignKey(p => p.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.Entity<UserSavedCommunityPattern>()
            .HasKey(ucp => new { ucp.UserId, ucp.CommunityPatternId });

        builder.Entity<UserSavedCommunityPattern>()
            .HasOne(ucp => ucp.User)
            .WithMany(u => u.SavedCommPatterns)
            .HasForeignKey(ucp => ucp.UserId)
            .OnDelete(DeleteBehavior.NoAction); // Cascade delete when a user is deleted //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!111

        builder.Entity<UserSavedCommunityPattern>()
            .HasOne(ucp => ucp.CommunityPattern)
            .WithMany(cp => cp.SavedByUsers)
            .HasForeignKey(ucp => ucp.CommunityPatternId)
            .OnDelete(DeleteBehavior.Cascade); // Cascade delete when a pattern is deleted


        //PROJECT
        builder.Entity<Project>()
                .HasKey(p => p.Id);

        builder.Entity<Project>()
                .Property(p => p.Id)
                .ValueGeneratedOnAdd();

        builder.Entity<Project>()
                .HasOne(p => p.User)
                .WithMany(u => u.Projects)
                .HasForeignKey(p => p.UserId)
                .OnDelete(DeleteBehavior.NoAction);

        builder.Entity<Project>()
                .HasOne(p => p.ConnectedPattern)
                .WithMany()
                .HasForeignKey(p => p.ConnectedPatternId)
                .OnDelete(DeleteBehavior.SetNull);

        builder.Entity<Project>()
                .HasMany(p => p.Yarns)
                .WithOne(y => y.Project)
                .HasForeignKey(y => y.ProjectId)
                .OnDelete(DeleteBehavior.Cascade);

        builder.Entity<Project>()
            .HasMany(p => p.Counters)
            .WithOne(c => c.Project)
            .HasForeignKey(c => c.ProjectId)
            .OnDelete(DeleteBehavior.Cascade);


        //RESOURCE
        builder.Entity<Resource>()
            .HasKey(r => r.Id);

        builder.Entity<Resource>()
                .Property(r => r.Id)
                .ValueGeneratedOnAdd();

        builder.Entity<Resource>()
                .HasOne(r => r.User)
                .WithMany(u => u.Resources)
                .HasForeignKey(r => r.UserId)
                .OnDelete(DeleteBehavior.Cascade);


        //COUNTER 
        builder.Entity<Counter>()
                 .Property(c => c.Id)
                 .ValueGeneratedOnAdd();

        builder.Entity<Counter>()
                .HasOne(c => c.CountersGroup)
                .WithMany(cg => cg.Counters)
                .HasForeignKey(c => c.CountersGroupId)
                .OnDelete(DeleteBehavior.Cascade);


        //COUNTERS GROUP
        builder.Entity<CountersGroup>()
            .HasKey(cg => cg.Id);

        builder.Entity<CountersGroup>()
                .Property(cg => cg.Id)
                .ValueGeneratedOnAdd();

        builder.Entity<CountersGroup>()
                .HasMany(cg => cg.Counters)
                .WithOne(c => c.CountersGroup)
                .HasForeignKey(c => c.CountersGroupId)
                .OnDelete(DeleteBehavior.Cascade);

        builder.Entity<CountersGroup>()
                .HasOne(cg => cg.Pattern)
                .WithMany(p => p.Counters)
                .HasForeignKey(cg => cg.PatternId)
                .OnDelete(DeleteBehavior.Cascade);

        builder.Entity<CountersGroup>()
                .HasOne(cg => cg.Project)
                .WithMany(p => p.Counters)
                .HasForeignKey(cg => cg.ProjectId)
                .OnDelete(DeleteBehavior.Cascade);


        // YARN
        builder.Entity<Yarn>()
                .HasKey(y => y.Id);

        builder.Entity<Yarn>()
                .Property(y => y.Id)
                .ValueGeneratedOnAdd();

        builder.Entity<Yarn>()
                .HasOne(y => y.Pattern)
                .WithMany(p => p.Yarns)
                .HasForeignKey(y => y.PatternId)
                .OnDelete(DeleteBehavior.Cascade);

        builder.Entity<Yarn>()
                .HasOne(y => y.Project)
                .WithMany(p => p.Yarns)
                .HasForeignKey(y => y.ProjectId)
                .OnDelete(DeleteBehavior.Cascade);


        // TOOL
        builder.Entity<Tool>()
                .HasKey(y => y.Id);

        builder.Entity<Tool>()
                .Property(y => y.Id)
                .ValueGeneratedOnAdd();

        builder.Entity<Tool>()
               .HasOne(y => y.Pattern)
               .WithMany(pb => pb.Tools)
               .HasForeignKey(y => y.PatternId)
               .OnDelete(DeleteBehavior.Cascade);


        // OTHER SUPPLY
        builder.Entity<OtherSupply>()
                .HasKey(y => y.Id);

        builder.Entity<OtherSupply>()
                .Property(y => y.Id)
                .ValueGeneratedOnAdd();

        builder.Entity<OtherSupply>()
                .HasOne(y => y.Pattern)
                .WithMany(p => p.OtherSupplies)
                .HasForeignKey(y => y.PatternId)
                .OnDelete(DeleteBehavior.Cascade);

    }
}