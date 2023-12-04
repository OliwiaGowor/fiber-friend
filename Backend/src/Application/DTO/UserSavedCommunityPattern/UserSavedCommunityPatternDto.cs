using Application.DTO.Pattern;
using Application.DTO.User;
using Application.Mapping;
using AutoMapper;

namespace Application.DTO.UserSavedCommunityPattern
{
    public class UserSavedCommunityPatternDto : IMapFrom<Domain.Entities.UserSavedCommunityPattern>
    {
        public Guid UserId { get; set; }
        public UserDto User { get; set; }
        public Guid CommunityPatternId { get; set; }
        public CommunityPatternDto CommunityPattern { get; set; }

        public static void Mapping(Profile profile)
        {
            profile.CreateMap<Domain.Entities.UserSavedCommunityPattern, UserSavedCommunityPatternDto>()
                .ForMember(d => d.UserId, opt => opt.MapFrom(s => s.UserId))
                .ForMember(d => d.User, opt => opt.MapFrom(s => s.User))
                .ForMember(d => d.CommunityPatternId, opt => opt.MapFrom(s => s.CommunityPatternId))
                .ForMember(d => d.CommunityPattern, opt => opt.MapFrom(s => s.CommunityPattern));

        }
    }
}
