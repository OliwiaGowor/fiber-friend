using Application.DTO.Project;
using Application.Interfaces.Services;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class ProjectController : ControllerBase
{
    private readonly IProjectService _projectService;
    private readonly IMapper _mapper;

    public ProjectController(IProjectService projectService, IMapper mapper)
    {
        _projectService = projectService;
        _mapper = mapper;
    }

    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public ActionResult<IEnumerable<ProjectDto>> GetAllProjects()
    {
        var list = _projectService.GetProjectsList();
        return Ok(list);
    }

    [HttpGet("{id:Guid}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public ActionResult<ProjectDto> GetProjectById(Guid id)
    {
        if (id.Equals("0") || id.Equals("")) return BadRequest();
        var service = _projectService.GetProjectById(id);
        if (service is null) return NotFound();

        return Ok(service);
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public ActionResult Create([FromBody] ProjectDto newProject)
    {
        if (!ModelState.IsValid) return BadRequest();

        var mappedProject = _mapper.Map<ProjectDto>(newProject);

        var projectId = _projectService.AddProject(mappedProject);
        newProject.Id = projectId;

        return CreatedAtRoute("GetProject", new { id = projectId }, newProject);
    }

    [HttpDelete("{id:Guid}", Name = "DeleteProject")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public IActionResult Delete(Guid id)
    {
        if (id.Equals("0") || id.Equals("")) return BadRequest();
        _projectService.DeleteProject(id);

        return NoContent();
    }

    [HttpPut]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public IActionResult Update([FromBody] ProjectDto newProject)
    {
        if (!this.ModelState.IsValid) return BadRequest();

        var mappedProject = _mapper.Map<ProjectDto>(newProject);

        _projectService.UpdateProject(mappedProject);
        return NoContent();
    }
}