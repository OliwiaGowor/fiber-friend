using Application.DTO.OtherSupply;
using Application.DTO.Tool;
using Application.DTO.User;
using Application.DTO.Yarn;
using Application.Mapping;
using AutoMapper;
using Domain.Entities;

namespace Application.DTO.Pattern
{
    public class PatternDto : PatternBaseDto, IMapFrom<Domain.Entities.Pattern>
    {
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public bool IsFinished { get; set; } = false;
        public bool IsAuthorial { get; set; }
        //public ??? List<Photo> Photos { get; set; }
        //public ??? List<File> Files { get; set; }
        public List<YarnDto> Yarns { get; set; }
        public List<ToolDto> Tools { get; set; }
        public List<OtherSupplyDto>? OtherSupplies { get; set; }
        public UserDto Author { get; set; }
        public bool IsShared { get; set; }

        public static void Mapping(Profile profile)
        {
            profile.CreateMap<Domain.Entities.Pattern, PatternDto>()
                .ForMember(d => d.Id, opt => opt.MapFrom(s => s.Id))
                .ForMember(d => d.Name, opt => opt.MapFrom(s => s.Name))
                .ForMember(d => d.Type, opt => opt.MapFrom(s => s.Type))
                .ForMember(d => d.IsAuthorial, opt => opt.MapFrom(s => s.IsAuthorial))
                .ForMember(d => d.Category, opt => opt.MapFrom(s => s.Category))
                .ForMember(d => d.Notes, opt => opt.MapFrom(s => s.Notes))
                .ForMember(d => d.StartDate, opt => opt.MapFrom(s => s.StartDate))
                .ForMember(d => d.EndDate, opt => opt.MapFrom(s => s.EndDate))
                .ForMember(d => d.Yarns, opt => opt.MapFrom(s => s.Yarns))
                .ForMember(d => d.Tools, opt => opt.MapFrom(s => s.Tools))
                .ForMember(d => d.OtherSupplies, opt => opt.MapFrom(s => s.OtherSupplies))
                .ForMember(d => d.Author, opt => opt.MapFrom(s => s.Author))
                .ForMember(d => d.IsShared, opt => opt.MapFrom(s => s.IsShared));

            profile.CreateMap<PatternDto, Domain.Entities.Pattern>().ReverseMap();
        }
    }
}
