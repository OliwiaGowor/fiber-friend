using Application.DTO.Project;
using Application.DTO.Yarn;
using Common.Enums;

namespace Application.Interfaces.Services;

public interface IProjectService
{
    Guid AddProject(NewProjectDto project, List<NewYarnDto> yarns);
    List<ProjectDto> GetProjectsListForUser(Guid userId);
    object GetProjectById(Guid projectId);
    List<ProjectDto> GetProjectsByTypeForUser(NeedleworkType type, Guid userId);
    List<ProjectDto> GetProjectsByCategoryForUser(string category, Guid userId);
    List<ProjectDto> GetProjectsByStatusForUser(bool finished, Guid userId);
    List<ProjectDto> GetProjectsByTimePeriodForUser(DateTime timePeriodStart, DateTime timePeriodEnd, Guid userId);
    object UpdateProject(NewProjectDto project, List<NewYarnDto> yarns);
    void DeleteProject(Guid id);
}