using Application.DTO.User;
using Application.DTO.UserSavedCommunityPattern;
using Application.Mapping;
using AutoMapper;
using Domain.Entities;

namespace Application.DTO.Pattern
{
    public class CommunityPatternDto : PatternBaseDto, IMapFrom<Domain.Entities.Pattern>
    {
        //public List<UserSavedCommunityPatternDto> SavedByUsers { get; set; }

        public static void Mapping(Profile profile)
        {
            profile.CreateMap<Domain.Entities.Pattern, CommunityPatternDto>()
                .ForMember(d => d.Id, opt => opt.MapFrom(s => s.Id))
                .ForMember(d => d.Name, opt => opt.MapFrom(s => s.Name))
                .ForMember(d => d.Type, opt => opt.MapFrom(s => s.Type))
                .ForMember(d => d.Category, opt => opt.MapFrom(s => s.Category))
                .ForMember(d => d.Notes, opt => opt.MapFrom(s => s.Notes))
                .ForMember(d => d.Photos, opt => opt.MapFrom(s => s.Photos))
                .ForMember(d => d.Yarns, opt => opt.MapFrom(s => s.Yarns))
                .ForMember(d => d.Tools, opt => opt.MapFrom(s => s.Tools))
                .ForMember(d => d.OtherSupplies, opt => opt.MapFrom(s => s.OtherSupplies))
                .ForMember(d => d.Author, opt => opt.MapFrom(s => s.Author))
                .ForMember(d => d.IsShared, opt => opt.MapFrom(s => s.IsShared));
            //.ForMember(d => d.SavedByUsers, opt => opt.MapFrom(s => s.SavedByUsers));
        }
    }
}
