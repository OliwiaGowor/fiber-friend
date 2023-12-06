using Application.DTO.CountersGroup;
using Application.DTO.Pattern;
using Application.DTO.Project;
using Application.DTO.Resource;
using Application.DTO.UserSavedCommunityPattern;
using Application.Mapping;
using AutoMapper;

namespace Application.DTO.User;

public class UserDto : IMapFrom<Domain.Entities.User>
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Username { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string HashedPassword { get; set; } = null!;
    public List<PatternDto>? Patterns { get; set; }
    public List<UserSavedCommunityPatternDto>? SavedCommPatterns { get; set; }
    public List<ProjectDto>? Projects { get; set; }
    public List<CountersGroupDto>? CountersGroups { get; set; }
    public List<ResourceDto>? Resources { get; set; }

    public static void Mapping(Profile profile)
    {
        profile.CreateMap<Domain.Entities.User, UserDto>()
            .ForMember(d => d.Id, opt => opt.MapFrom(s => s.Id))
            .ForMember(d => d.Username, opt => opt.MapFrom(s => s.Username))
            .ForMember(d => d.Email, opt => opt.MapFrom(s => s.Email))
            .ForMember(d => d.HashedPassword, opt => opt.MapFrom(s => s.HashedPassword))
            .ForMember(d => d.Patterns, opt => opt.MapFrom(s => s.Patterns))
            .ForMember(d => d.SavedCommPatterns, opt => opt.MapFrom(s => s.SavedCommPatterns))
            .ForMember(d => d.Projects, opt => opt.MapFrom(s => s.Projects))
            .ForMember(d => d.CountersGroups, opt => opt.MapFrom(s => s.CountersGroups))
            .ForMember(d => d.Resources, opt => opt.MapFrom(s => s.Resources));
    }
}
