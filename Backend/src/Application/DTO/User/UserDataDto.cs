
using Application.Mapping;
using AutoMapper;

namespace Application.DTO.User
{
    public class UserDataDto : IMapFrom<Domain.Entities.User>
    {
        public Guid Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }

        public static void Mapping(Profile profile)
        {
            profile.CreateMap<Domain.Entities.User, UserDataDto>()
                .ForMember(d => d.Id, opt => opt.MapFrom(s => s.Id))
                .ForMember(d => d.Username, opt => opt.MapFrom(s => s.Username))
                .ForMember(d => d.Email, opt => opt.MapFrom(s => s.Email));

            profile.CreateMap<UserDataDto, Domain.Entities.User>().ReverseMap();
        }
    }
}
