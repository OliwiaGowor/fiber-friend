using Application.DTO.Resource;
using Application.Interfaces.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class StatisticsController : ControllerBase
{
    private readonly IStatisticsService _statisticsService;

    public StatisticsController(IStatisticsService statisticsService)
    {
        _statisticsService = statisticsService;
    }

    [HttpGet("ProjectStatistics/{userId:Guid}/{timePeriodStart:DateTime}/{timePeriodEnd:DateTime}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public ActionResult<ResourceDto> GetProjectsStatisticsForUser(Guid userId, DateTime timePeriodStart, DateTime timePeriodEnd)
    {
        if (userId.Equals("0") || userId.Equals("")) return BadRequest();
        var service = _statisticsService.GetProjectsStatisticsForUser(userId, timePeriodStart, timePeriodEnd);
        if (service is null) return NotFound();

        return Ok(service);
    }

    [HttpGet("/PatternsStatistics/{userId:Guid}/{timePeriodStart:DateTime}/{timePeriodEnd:DateTime}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public ActionResult<ResourceDto> GetPatternsStatisticsForUser(Guid userId, DateTime timePeriodStart, DateTime timePeriodEnd)
    {
        if (userId.Equals("0") || userId.Equals("")) return BadRequest();
        var service = _statisticsService.GetPatternsStatisticsForUser(userId, timePeriodStart, timePeriodEnd);
        if (service is null) return NotFound();

        return Ok(service);
    }

}