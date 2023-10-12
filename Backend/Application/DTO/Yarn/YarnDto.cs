using Application.Mapping;
using AutoMapper;

namespace Application.DTO.Yarn;

public class YarnDto : IMapFrom<Domain.Entities.Yarn>
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public int Quantity { get; set; }
    public string Gauge { get; set; }
    public string Stitch { get; set; }
    public string ToolSize { get; set; }

    public static void Mapping(Profile profile)
    {
        profile.CreateMap<Domain.Entities.Yarn, YarnDto>()
            .ForMember(d => d.Id, opt => opt.MapFrom(s => s.Id))
            .ForMember(d => d.Name, opt => opt.MapFrom(s => s.Name))
            .ForMember(d => d.Quantity, opt => opt.MapFrom(s => s.Quantity))
            .ForMember(d => d.Gauge, opt => opt.MapFrom(s => s.Gauge))
            .ForMember(d => d.Stitch, opt => opt.MapFrom(s => s.Stitch))
            .ForMember(d => d.ToolSize, opt => opt.MapFrom(s => s.ToolSize));
    }
}
