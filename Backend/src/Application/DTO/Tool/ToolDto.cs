using Application.Mapping;
using AutoMapper;

namespace Application.DTO.Tool;

public class ToolDto : IMapFrom<Domain.Entities.Tool>
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public int Quantity { get; set; }
    public string Size { get; set; }
    public Guid? PatternId { get; set; }

    public static void Mapping(Profile profile)
    {
        profile.CreateMap<Domain.Entities.Tool, ToolDto>()
            .ForMember(d => d.Id, opt => opt.MapFrom(s => s.Id))
            .ForMember(d => d.Name, opt => opt.MapFrom(s => s.Name))
            .ForMember(d => d.Quantity, opt => opt.MapFrom(s => s.Quantity))
            .ForMember(d => d.Size, opt => opt.MapFrom(s => s.Size))
            .ForMember(d => d.PatternId, opt => opt.MapFrom(s => s.PatternId));
    }
}
