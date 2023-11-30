using Application.Mapping;
using AutoMapper;

namespace Application.DTO.User;

public class UserDto : IMapFrom<Domain.Entities.User>
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Username { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string HashedPassword { get; set; } = null!;
    public static void Mapping(Profile profile)
    {
        profile.CreateMap<Domain.Entities.User, UserDto>()
            .ForMember(d => d.Id, opt => opt.MapFrom(s => s.Id))
            .ForMember(d => d.Username, opt => opt.MapFrom(s => s.Username))
            .ForMember(d => d.Email, opt => opt.MapFrom(s => s.Email))
            .ForMember(d => d.HashedPassword, opt => opt.MapFrom(s => s.HashedPassword));
    }
}
