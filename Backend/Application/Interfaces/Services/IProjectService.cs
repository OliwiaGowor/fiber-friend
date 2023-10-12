using Application.DTO.Project;

namespace Application.Interfaces.Services;

public interface IProjectService
{
    Guid AddProject(ProjectDto project);
    List<ProjectDto> GetProjectsList();
    object GetProjectById(Guid projectId);
    object UpdateProject(ProjectDto project);
    void DeleteProject(Guid id);
}