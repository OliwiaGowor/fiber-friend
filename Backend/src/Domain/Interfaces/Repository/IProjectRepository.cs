using Common.Enums;
using Common.Helpers;
using Domain.Entities;

namespace Domain.Interfaces.Repository;

public interface IProjectRepository
{
    void DeleteProject(Guid projectId);
    Guid AddProject(Project project, List<Yarn> yarns, List<CountersGroup> counters, List<MyFile> files, List<Photo> photos);
    IQueryable<Project> GetAllProjectsForUser(Guid userId);
    Project GetProjectById(Guid projectId);
    IQueryable<Project> GetProjectsForUser(FilterModel filters, Guid userId, int page, int pageSize);
    IQueryable<Project> GetProjectsByTimePeriodForUser(DateTime timePeriodStart, DateTime timePeriodEnd, Guid userId);
    Project UpdateProject(Project project, List<Yarn> yarns, List<CountersGroup> counters, List<MyFile> files, List<Photo> photos);
}