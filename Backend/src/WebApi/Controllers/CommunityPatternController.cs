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
    public class CommunityPatternController : ControllerBase
    {
        private readonly ICommunityPatternService _communityPatternService;
        private readonly IMapper _mapper;

        public CommunityPatternController(ICommunityPatternService communityPatternService, IMapper mapper)
        {
            _communityPatternService = communityPatternService;
            _mapper = mapper;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<IEnumerable<CommunityPatternDto>> GetAllCommunityPatterns(Guid userId)
        {
            var list = _communityPatternService.GetAllCommunityPatterns();
            return Ok(list);
        }

        [HttpGet("{filters}/page={page}/pageSize={pageSize}")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<CommunityPatternDto> GetCommunityPatterns([FromQuery] FilterModel filters, Guid userId, [FromQuery] int page = 1, [FromQuery] int pageSize = 10)
        {
            if (userId.Equals("") || page < 0 || pageSize < 0) return BadRequest();
            var service = _communityPatternService.GetCommunityPatterns(filters, userId, page, pageSize);

            if (service is null) return NotFound();

            return Ok(service);
        }

        [HttpGet("GetAllCommunityPatternsForUser/{userId:Guid}")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ActionResult<IEnumerable<CommunityPatternDto>> GetAllCommunityPatternsForUser(Guid userId)
        {
            var list = _communityPatternService.GetAllCommunityPatternsForUser(userId);
            return Ok(list);
        }

        [HttpGet("GetCommunityPatternsForUser/{userId:Guid}/{filters}/page={page}/pageSize={pageSize}")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<CommunityPatternDto> GetCommunityPatternsForUser([FromQuery] FilterModel filters, Guid userId, [FromQuery] int page = 1, [FromQuery] int pageSize = 10)
        {
            if (userId.Equals("") || page < 0 || pageSize < 0) return BadRequest();
            var service = _communityPatternService.GetCommunityPatternsForUser(filters, userId, page, pageSize);

            if (service is null) return NotFound();

            return Ok(service);
        }

        [HttpGet("{id:Guid}")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public ActionResult<CommunityPatternDto> GetCommunityPatternById(Guid id)
        {
            if (id.Equals("0") || id.Equals("")) return BadRequest();
            var service = _communityPatternService.GetCommunityPatternById(id);
            if (service is null) return NotFound();

            return Ok(service);
        }
    }
}
