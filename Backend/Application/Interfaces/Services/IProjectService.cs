using Application.DTO.Project;
using Application.DTO.Yarn;
using Domain.Enums;

namespace Application.Interfaces.Services;

public interface IProjectService
{
    Guid AddProject(NewProjectDto project, List<NewYarnDto> yarns);
    List<ProjectDto> GetProjectsList();
    object GetProjectById(Guid projectId);
    List<ProjectDto> GetProjectsByType(NeedleworkType type);
    List<ProjectDto> GetProjectsByCategory(string category);
    List<ProjectDto> GetProjectsByStatus(bool finished);
    object UpdateProject(NewProjectDto project, List<NewYarnDto> yarns);
    void DeleteProject(Guid id);
}