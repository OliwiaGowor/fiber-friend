using Domain.Entities;
using Domain.Enums;
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

    public IQueryable<Project> GetAllProjects()
    {
        var projects = _dbContext.Projects;
        return projects;
    }

    public Project GetProjectById(Guid projectId)
    {
        var project = _dbContext.Projects.FirstOrDefault(i => i.Id == projectId);
        return project;
    }

    public IQueryable<Project> GetProjectsByType(NeedleworkType type)
    {
        var projects = _dbContext.Projects.Where(y => y.Type == type);
        return projects;
    }

    public IQueryable<Project> GetProjectsByCategory(string category)
    {
        var projects = _dbContext.Projects.Where(y => y.Category == category);
        return projects;
    }

    public IQueryable<Project> GetProjectsByStatus(bool finished)
    {
        var projects = _dbContext.Projects.Where(y => y.Finished == finished);
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