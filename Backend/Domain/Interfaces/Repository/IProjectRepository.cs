using Domain.Entities;
using Domain.Enums;

namespace Domain.Interfaces.Repository;

public interface IProjectRepository
{
    void DeleteProject(Guid projectId);
    Guid AddProject(Project project, List<Yarn> yarns);
    IQueryable<Project> GetAllProjects();
    Project GetProjectById(Guid projectId);
    IQueryable<Project> GetProjectsByType(NeedleworkType type);
    IQueryable<Project> GetProjectsByCategory(string category);
    IQueryable<Project> GetProjectsByStatus(bool finished);
    void UpdateProject(Project project, List<Yarn> yarns);
}