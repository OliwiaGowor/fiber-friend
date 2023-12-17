using Application.DTO.Pattern;
using Application.Interfaces.Services;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Common.Helpers;
using Domain.Interfaces.Repository;

namespace Application.Services;

internal class CommunityPatternService : ICommunityPatternService
{
    private readonly IMapper _mapper;
    private readonly ICommunityPatternRepository _communityPatternRepo;

    public CommunityPatternService(ICommunityPatternRepository communityPatternRepo, IMapper mapper)
    {
        _communityPatternRepo = communityPatternRepo;
        _mapper = mapper;
    }

    public List<CommunityPatternDto> GetAllCommunityPatterns()
    {
        var communityPatterns = _communityPatternRepo.GetAllCommunityPatterns().ToList();
        var communityPatternDtos = communityPatterns
            .Select(dto => _mapper.Map<CommunityPatternDto>(dto))
            .ToList();

        return communityPatternDtos;
    }

    public List<CommunityPatternDto> GetCommunityPatterns(FilterModel filters, int page, int pageSize)
    {
        var communityPatterns = _communityPatternRepo.GetCommunityPatterns(filters, page, pageSize)
            .ProjectTo<CommunityPatternDto>(_mapper.ConfigurationProvider)
            .ToList();

        return communityPatterns;
    }

    public List<CommunityPatternDto> GetAllCommunityPatternsForUser(Guid userId)
    {
        var communityPatterns = _communityPatternRepo.GetAllCommunityPatternsForUser(userId)
            .ProjectTo<CommunityPatternDto>(_mapper.ConfigurationProvider)
            .ToList();

        return communityPatterns;
    }

    public List<CommunityPatternDto> GetCommunityPatternsForUser(FilterModel filters, Guid userId, int page, int pageSize)
    {
        var communityPatterns = _communityPatternRepo.GetCommunityPatternsForUser(filters, userId, page, pageSize)
           .ProjectTo<CommunityPatternDto>(_mapper.ConfigurationProvider)
           .ToList();

        return communityPatterns;
    }

    public object GetCommunityPatternById(Guid patternId)
    {
        var communityPattern = _communityPatternRepo.GetCommunityPatternById(patternId);
        var communityPatternDto = _mapper.Map<CommunityPatternDto>(communityPattern);

        return communityPatternDto;
    }
}