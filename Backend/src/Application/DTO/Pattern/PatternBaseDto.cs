using Application.DTO.OtherSupply;
using Application.DTO.Tool;
using Application.DTO.User;
using Application.DTO.Yarn;
using AutoMapper;
using Common.Enums;

namespace Domain.Entities
{
    public abstract class PatternBaseDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = "";
        public NeedleworkType Type { get; set; }
        public string Category { get; set; } = "";
        public string Notes { get; set; }
        //public ??? List<Photo> Photos { get; set; }
        //public ??? List<File> Files { get; set; }
        public List<YarnDto> Yarns { get; set; }
        public List<ToolDto> Tools { get; set; }
        public List<OtherSupplyDto>? OtherSupplies { get; set; }
        public UserDto Author { get; set; }
        public bool IsShared { get; set; }

        public static void Mapping(Profile profile)
        {
            profile.CreateMap<Domain.Entities.PatternBase, PatternBaseDto>()
                .ForMember(d => d.Id, opt => opt.MapFrom(s => s.Id))
                .ForMember(d => d.Name, opt => opt.MapFrom(s => s.Name))
                .ForMember(d => d.Type, opt => opt.MapFrom(s => s.Type))
                .ForMember(d => d.Category, opt => opt.MapFrom(s => s.Category))
                .ForMember(d => d.Notes, opt => opt.MapFrom(s => s.Notes))
                .ForMember(d => d.Yarns, opt => opt.MapFrom(s => s.Yarns))
                .ForMember(d => d.Tools, opt => opt.MapFrom(s => s.Tools))
                .ForMember(d => d.OtherSupplies, opt => opt.MapFrom(s => s.OtherSupplies))
                .ForMember(d => d.Author, opt => opt.MapFrom(s => s.Author))
                .ForMember(d => d.IsShared, opt => opt.MapFrom(s => s.IsShared));
        }
    }


}
