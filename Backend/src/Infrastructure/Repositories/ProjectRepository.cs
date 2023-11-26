using Domain.Entities;
using Common.Enums;
using Domain.Interfaces.Repository;

namespace Infrastructure.Repositories;
//TODO: implement 
public class ProjectRepository : IProjectRepository
{
    private readonly ApplicationDbContext _dbContext;

    public ProjectRepository(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public Guid AddProject(Project project, List<Yarn> yarns)
    {
        _dbContext.Projects.Add(project);

        foreach (var yarn in yarns)
        {
            yarn.ParentId = project.Id;
            _dbContext.Yarns.Add(yarn);
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
        var project = _dbContext.Projects.FirstOrDefault(i => i.Id == projectId);
        return project;
    }

    public IQueryable<Project> GetProjectsByTypeForUser(NeedleworkType type, Guid userId)
    {
        var projects = _dbContext.Projects.Where(y => y.UserId == userId && y.Type == type);
        return projects;
    }

    public IQueryable<Project> GetProjectsByCategoryForUser(string category, Guid userId)
    {
        var projects = _dbContext.Projects.Where(y => y.UserId == userId && y.Category == category);
        return projects;
    }

    public IQueryable<Project> GetProjectsByStatusForUser(bool finished, Guid userId)
    {
        var projects = _dbContext.Projects.Where(y => y.UserId == userId && y.Finished == finished);
        return projects;
    }

        public IQueryable<Project> GetProjectsByTimePeriodForUser(DateTime timePeriodStart, DateTime timePeriodEnd, Guid userId)
    {
        var projects = _dbContext.Projects.Where(y => y.UserId == userId && y.StartDate >= timePeriodStart && y.EndDate <= timePeriodEnd);
        return projects;
    }

    public void UpdateProject(Project project, List<Yarn> yarns)
    {
        _dbContext.Attach(project);
        _dbContext.Entry(project).Property("ProjectType").IsModified = true;
        _dbContext.Entry(project).Property("StartDate").IsModified = true;
        _dbContext.Entry(project).Property("EndDate").IsModified = true;
        _dbContext.Entry(project).Property("Finished").IsModified = true;
        _dbContext.Entry(project).Property("Category").IsModified = true;
        _dbContext.Entry(project).Property("Notes").IsModified = true;

        var existingYarns = _dbContext.Yarns.Where(y => y.ParentId == project.Id);
        _dbContext.Yarns.RemoveRange(existingYarns);

        foreach (var yarn in yarns)
        {
            _dbContext.Yarns.Add(yarn);
        }


        _dbContext.SaveChanges();
    }
}