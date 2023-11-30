using Application.DTO.Pattern;
using Application.Interfaces.Services;
using AutoMapper;
using Common.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CommunityPatternController : ControllerBase
    {
        private readonly IPatternService _patternService;
        private readonly IMapper _mapper;

        public CommunityPatternController(IPatternService patternService, IMapper mapper)
        {
            _patternService = patternService;
            _mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<IEnumerable<PatternDto>> GetAllCommunityPatterns(Guid userId)
        {
            var list = _patternService.GetPatternsListForUser(userId);
            return Ok(list);
        }

        [HttpGet("GetAllSavedCommPatternsForUser/{userId:Guid}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<IEnumerable<PatternDto>> GetAllSavedCommPatternsForUser(Guid userId)
        {
            var list = _patternService.GetPatternsListForUser(userId);
            return Ok(list);
        }

        [HttpGet("{id:Guid}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<PatternDto> GetCommunityPatternById(Guid id)
        {
            if (id.Equals("0") || id.Equals("")) return BadRequest();
            var service = _patternService.GetPatternById(id);
            if (service is null) return NotFound();

            return Ok(service);
        }

        [HttpGet("GetSavedCommPatternsForUser/{userId:Guid}/{filters}/page={page}/pageSize={pageSize}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<PatternDto> GetSavedCommPatternsForUser([FromQuery] FilterModel filters, Guid userId, [FromQuery] int page = 1, [FromQuery] int pageSize = 10)
        {
            if (userId.Equals("") || page < 0 || pageSize < 0) return BadRequest();
            var service = _patternService.GetPatternsForUser(filters, userId, page, pageSize);

            if (service is null) return NotFound();

            return Ok(service);
        }
    }
}
