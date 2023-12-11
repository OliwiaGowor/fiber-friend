using Common.Enums;
using Common.Helpers;
using Domain.Entities;
using Domain.Interfaces.Repository;
using Infrastructure.Helpers;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileSystemGlobbing.Internal;
using System.Diagnostics.Metrics;

namespace Infrastructure.Repositories;
//TODO: implement 
public class ProjectRepository : IProjectRepository
{
    private readonly ApplicationDbContext _dbContext;

    public ProjectRepository(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public Guid AddProject(Project project, List<Yarn> yarns, List<CountersGroup> counters, List<MyFile> files, List<Photo> photos)
    {
        if (!_dbContext.Users.Any(u => u.Id == project.UserId)) throw new Exception("User not found");

        _dbContext.Projects.Add(project);


        foreach (var counter in counters)
        {
            counter.ProjectId = project.Id;
            _dbContext.CountersGroups.Add(counter);
        }

        foreach (var file in files)
        {
            file.ProjectId = project.Id;
            _dbContext.Files.Add(file);
        }

        foreach (var photo in photos)
        {
            photo.ProjectId = project.Id;
            _dbContext.Photos.Add(photo);
        }

        _dbContext.SaveChanges();
        return project.Id;
    }

    public void DeleteProject(Guid projectId)
    {
        var project = _dbContext.Projects.Find(projectId);
        if (project is not null)
        {
            _dbContext.Projects.Remove(project);
            _dbContext.SaveChanges();
        }
    }

    public IQueryable<Project> GetAllProjectsForUser(Guid userId)
    {
        var projects = _dbContext.Projects.Where(y => y.UserId == userId);
        return projects;
    }

    public Project GetProjectById(Guid projectId)
    {
        var project = _dbContext.Projects.Include(p => p.Yarns)
            .Include(p => p.Photos)
            .Include(p => p.Files)
            .FirstOrDefault(i => i.Id == projectId);
        return project;
    }

    public IQueryable<Project> GetProjectsForUser(FilterModel filters, Guid userId, int page, int pageSize)
    {
        var query = _dbContext.Projects.AsQueryable();

        if (filters != null)
        {
            if (filters.Type is not null)
            {
                query = query.Where(p => p.Type == filters.Type);
            }

            if (filters.category is not null)
            {
                query = query.Where(p => p.Category == filters.category);
            }

            if (filters.isFinished is not null)
            {
                query = query.Where(p => p.Finished == true);
            }
        }

        var projects = query.Include(p => p.Yarns)
            .Include(p => p.Photos)
            .Include(p => p.Files)
            .Where(p => p.UserId == userId)
            .Skip((page - 1) * pageSize)
            .Take(pageSize);

        return projects;
    }

    public IQueryable<Project> GetProjectsByTimePeriodForUser(DateTime timePeriodStart, DateTime timePeriodEnd, Guid userId)
    {
        var projects = _dbContext.Projects.Where(y => y.UserId == userId && y.StartDate >= timePeriodStart && y.EndDate <= timePeriodEnd);
        return projects;
    }

    public Project UpdateProject(
         Project project,
         List<Yarn> yarns,
         List<CountersGroup> counters,
         List<MyFile> files,
         List<Photo> photos
         )
    {
        var dbProject = _dbContext.Projects
         .Include(p => p.Yarns)
         .Include(p => p.Counters)
         .Include(p => p.Files)
         .Include(p => p.Photos)
         .FirstOrDefault(y => y.Id == project.Id);

        if (dbProject != null)
        {
            _dbContext.Entry(dbProject).CurrentValues.SetValues(project);

            foreach (var yarn in yarns)
            {
                yarn.ProjectId = project.Id;
            }

            foreach (var file in files)
            {
                file.ProjectId = project.Id;
            }

            foreach (var photo in photos)
            {
                photo.ProjectId = project.Id;
            }

            RepositoryHelper.UpdateCollection(_dbContext.Yarns, dbProject.Yarns, yarns, yarn => yarn.Id);
            RepositoryHelper.UpdateCollection(_dbContext.CountersGroups, dbProject.Counters, counters, counter => counter.Id);
            RepositoryHelper.UpdateCollection(_dbContext.Files, dbProject.Files, files, file => file.Id);
            RepositoryHelper.UpdateCollection(_dbContext.Photos, dbProject.Photos, photos, photo => photo.Id);

            _dbContext.SaveChanges();

            return dbProject;
        }
        else
        {
            throw new Exception("Project not found");
        }
    }
}