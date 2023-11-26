using Application.DTO.Pattern;
using Application.Interfaces.Services;
using AutoMapper;
using Common.Enums;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Common.Helpers;

namespace WebApi.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class PatternController : ControllerBase
{
    private readonly IPatternService _patternService;
    private readonly IMapper _mapper;

    public PatternController(IPatternService patternService, IMapper mapper)
    {
        _patternService = patternService;
        _mapper = mapper;
    }

    [HttpGet("GetAllPatternsForUser/{userId:Guid}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public ActionResult<IEnumerable<PatternDto>> GetAllPatternsForUser(Guid userId)
    {
        var list = _patternService.GetPatternsListForUser(userId);
        return Ok(list);
    }

    [HttpGet("{id:Guid}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public ActionResult<PatternDto> GetPatternById(Guid id)
    {
        if (id.Equals("0") || id.Equals("")) return BadRequest();
        var service = _patternService.GetPatternById(id);
        if (service is null) return NotFound();

        return Ok(service);
    }

    [HttpGet("GetPatternsForUser/{userId:Guid}/{filters}/page={page}/pageSize={pageSize}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public ActionResult<PatternDto> GetPatternsForUser([FromQuery] FilterModel filters, Guid userId, [FromQuery]int page = 1, [FromQuery]int pageSize = 10)
    {
        if (userId.Equals("") || page < 0 || pageSize < 0) return BadRequest();
        var service = _patternService.GetPatternsForUser(filters, userId, page, pageSize);

        if (service is null) return NotFound();

        return Ok(service);
    }

    [HttpGet("GetSharedPatterns/{filters}/page={page}/pageSize={pageSize}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public ActionResult<PatternDto> GetSharedPatterns([FromQuery] FilterModel filters, [FromQuery]int page = 1, [FromQuery]int pageSize = 10)
    {
        if (page < 0 || pageSize < 0) return BadRequest();
        var service = _patternService.GetSharedPatterns(filters, page, pageSize);

        if (service is null) return NotFound();

        return Ok(service);
    }


    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public ActionResult Create([FromBody] NewPatternDto newPattern)
    {
        if (!ModelState.IsValid) return BadRequest();

        var patternId = _patternService.AddPattern(newPattern);
        newPattern.Id = patternId;

        return CreatedAtRoute("GetPattern", new { id = patternId }, newPattern);
    }

    [HttpDelete("{id:Guid}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public IActionResult Delete(Guid id)
    {
        if (id.Equals("0") || id.Equals("")) return BadRequest();
        _patternService.DeletePattern(id);

        return NoContent();
    }

    [HttpPut]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public IActionResult Update([FromBody] NewPatternDto newPattern)
    {
        if (!this.ModelState.IsValid) return BadRequest();

        _patternService.UpdatePattern(newPattern);
        return NoContent();
    }
}