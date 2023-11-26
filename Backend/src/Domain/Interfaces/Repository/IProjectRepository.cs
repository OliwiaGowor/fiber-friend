using Domain.Entities;
using Common.Enums;

namespace Domain.Interfaces.Repository;

public interface IProjectRepository
{
    void DeleteProject(Guid projectId);
    Guid AddProject(Project project, List<Yarn> yarns);
    IQueryable<Project> GetAllProjectsForUser(Guid userId);
    Project GetProjectById(Guid projectId);
    IQueryable<Project> GetProjectsByTypeForUser(NeedleworkType type, Guid userId);
    IQueryable<Project> GetProjectsByCategoryForUser(string category, Guid userId);
    IQueryable<Project> GetProjectsByStatusForUser(bool finished, Guid userId);
    IQueryable<Project> GetProjectsByTimePeriodForUser(DateTime timePeriodStart, DateTime timePeriodEnd, Guid userId);
    void UpdateProject(Project project, List<Yarn> yarns);
}