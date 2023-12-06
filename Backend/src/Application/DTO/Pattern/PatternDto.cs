using Application.DTO.File;
using Application.Mapping;
using AutoMapper;
using Domain.Entities;

namespace Application.DTO.Pattern
{
    public class PatternDto : PatternBaseDto, IMapFrom<Domain.Entities.Pattern>
    {
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public List<MyFileDto>? Files { get; set; }
        public bool IsFinished { get; set; } = false;
        public bool IsAuthorial { get; set; }

        public static void Mapping(Profile profile)
        {
            profile.CreateMap<Domain.Entities.Pattern, PatternDto>()
                .ForMember(d => d.Id, opt => opt.MapFrom(s => s.Id))
                .ForMember(d => d.Name, opt => opt.MapFrom(s => s.Name))
                .ForMember(d => d.Type, opt => opt.MapFrom(s => s.Type))
                .ForMember(d => d.IsAuthorial, opt => opt.MapFrom(s => s.IsAuthorial))
                .ForMember(d => d.Category, opt => opt.MapFrom(s => s.Category))
                .ForMember(d => d.Notes, opt => opt.MapFrom(s => s.Notes))
                .ForMember(d => d.Photos, opt => opt.MapFrom(s => s.Photos))
                .ForMember(d => d.Files, opt => opt.MapFrom(s => s.Files))
                .ForMember(d => d.StartDate, opt => opt.MapFrom(s => s.StartDate))
                .ForMember(d => d.EndDate, opt => opt.MapFrom(s => s.EndDate))
                .ForMember(d => d.Yarns, opt => opt.MapFrom(s => s.Yarns))
                .ForMember(d => d.Tools, opt => opt.MapFrom(s => s.Tools))
                .ForMember(d => d.OtherSupplies, opt => opt.MapFrom(s => s.OtherSupplies))
                .ForMember(d => d.Author, opt => opt.MapFrom(s => s.Author))
                .ForMember(d => d.IsShared, opt => opt.MapFrom(s => s.IsShared));
        }
    }
}
