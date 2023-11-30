using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Emit;

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
    public DbSet<Counter> Counters { get; set; }
    public DbSet<CountersGroup> CountersGroups { get; set; }
    public DbSet<Yarn> Yarns { get; set; }
    public DbSet<Tool> Tools { get; set; }
    public DbSet<OtherSupply> OtherSupplies { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        //USER
        builder.Entity<User>()
            .HasKey(u => u.Id);

        builder.Entity<User>()
           .Property(u => u.Id)
           .ValueGeneratedOnAdd();

        builder.Entity<User>()
            .Property(u => u.Username)
            .IsRequired();

        builder.Entity<User>()
            .Property(u => u.Email)
            .IsRequired();

        builder.Entity<User>()
            .Property(u => u.HashedPassword)
            .IsRequired();

        builder.Entity<User>()
            .HasMany(u => u.Patterns)
            .WithOne(p => p.Author)
            .HasForeignKey(p => p.AuthorId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.Entity<User>()
            .HasMany(u => u.Projects)
            .WithOne()
            .HasForeignKey(p => p.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.Entity<User>()
            .HasMany(u => u.CountersGroups)
            .WithOne()
            .HasForeignKey(cg => cg.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.Entity<User>()
            .HasMany(u => u.Resources)
            .WithOne()
            .HasForeignKey(cg => cg.UserId)
            .OnDelete(DeleteBehavior.Cascade);


        //PATTERN BASE
        builder.Entity<PatternBase>()
          .HasKey(p => p.Id);

        builder.Entity<PatternBase>()
            .Property(p => p.Id)
            .ValueGeneratedOnAdd();

        builder.Entity<PatternBase>()
            .Property(p => p.Name)
            .IsRequired();

        builder.Entity<PatternBase>()
                .HasDiscriminator<string>("Discriminator")
                .HasValue<Pattern>("Pattern")
                .HasValue<CommunityPattern>("Community");

        builder.Entity<PatternBase>()
            .HasOne(u => u.Author)
            .WithMany(p => p.Patterns)
            .HasForeignKey(p => p.AuthorId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.Entity<PatternBase>()
            .HasMany(p => p.Yarns)
            .WithOne()
            .HasForeignKey(y => y.PatternId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.Entity<PatternBase>()
            .HasMany(p => p.Tools)
            .WithOne()
            .HasForeignKey(y => y.PatternId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.Entity<PatternBase>()
            .HasMany(p => p.OtherSupplies)
            .WithOne()
            .HasForeignKey(y => y.PatternId)
            .OnDelete(DeleteBehavior.Cascade);


        //PROJECT
        builder.Entity<Project>()
            .HasKey(p => p.Id);

        builder.Entity<Project>()
            .Property(p => p.Id)
            .ValueGeneratedOnAdd();

        builder.Entity<Project>()
            .Property(p => p.Name)
            .IsRequired();

        builder.Entity<Project>()
            .Property(p => p.StartDate)
            .IsRequired();

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

        //RESOURCE
        builder.Entity<Resource>()
        .HasKey(r => r.Id);

        builder.Entity<Resource>()
            .Property(r => r.Id)
            .ValueGeneratedOnAdd();

        builder.Entity<Resource>()
            .Property(r => r.Name)
        .IsRequired();

        builder.Entity<Resource>()
            .Property(r => r.Type)
        .IsRequired();

        builder.Entity<Resource>()
            .Property(r => r.ToolSize)
            .IsRequired();

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
            .Property(c => c.Name)
            .IsRequired();

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
            .Property(cg => cg.Name)
        .IsRequired();

        builder.Entity<CountersGroup>()
            .HasMany(cg => cg.Counters)
            .WithOne()
            .HasForeignKey(c => c.CountersGroupId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.Entity<CountersGroup>()
            .HasOne(cg => cg.Pattern)
            .WithMany()
            .HasForeignKey(cg => cg.PatternId)
            .OnDelete(DeleteBehavior.NoAction);

        builder.Entity<CountersGroup>()
            .HasOne(cg => cg.Project)
            .WithMany()
            .HasForeignKey(cg => cg.ProjectId)
            .OnDelete(DeleteBehavior.NoAction);


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
            .WithMany(p => p.Tools)
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