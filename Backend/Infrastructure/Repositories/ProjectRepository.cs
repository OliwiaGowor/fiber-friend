using Domain.Entities;
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

    public Guid AddProject(Project project)
    {

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

    public void UpdateProject(Project service)
    {
        _dbContext.Attach(service);
        _dbContext.Entry(service).Property("ProjectType").IsModified = true;
        _dbContext.Entry(service).Property("StartDate").IsModified = true;
        _dbContext.Entry(service).Property("EndDate").IsModified = true;
        _dbContext.Entry(service).Property("ProjectStatus").IsModified = true;
        _dbContext.Entry(service).Property("PaymentStatus").IsModified = true;
        _dbContext.Entry(service).Property("City").IsModified = true;
        _dbContext.Entry(service).Property("Price").IsModified = true;

        var oldMaterials = _dbContext.Yarns.Where(m => m.ParentId == service.Id).ToList();
        
        _dbContext.SaveChanges();
    }
}