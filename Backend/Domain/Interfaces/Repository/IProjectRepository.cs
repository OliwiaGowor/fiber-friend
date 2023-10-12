using Domain.Entities;

namespace Domain.Interfaces.Repository;

public interface IProjectRepository
{
    void DeleteProject(Guid projectId);
    Guid AddProject(Project project);
    IQueryable<Project> GetAllProjects();
    Project GetProjectById(Guid projectId);
    void UpdateProject(Project project);
}