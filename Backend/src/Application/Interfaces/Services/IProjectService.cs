using Application.DTO.Project;
using Application.DTO.Yarn;
using Common.Enums;
using Common.Helpers;

namespace Application.Interfaces.Services;

public interface IProjectService
{
    Guid AddProject(NewProjectDto project);
    List<ProjectDto> GetProjectsListForUser(Guid userId);
    object GetProjectById(Guid projectId);
    List<ProjectDto> GetProjectsForUser(FilterModel? filters, Guid userId, int page, int pageSize);
    List<ProjectDto> GetProjectsByTimePeriodForUser(DateTime timePeriodStart, DateTime timePeriodEnd, Guid userId);
    object UpdateProject(NewProjectDto project, List<NewYarnDto> yarns);
    void DeleteProject(Guid id);
}