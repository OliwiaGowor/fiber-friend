using Application.Mapping;
using AutoMapper;
using Domain.Enums;

namespace Application.DTO.Resource;
public class ResourceDto : IMapFrom<Domain.Entities.Resource>
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public ResourceType Type { get; set; }
    public int Quantity { get; set; }
    public string? Gauge { get; set; }
    public string ToolSize { get; set; }

    public static void Mapping(Profile profile)
    {
        profile.CreateMap<Domain.Entities.Resource, ResourceDto>()
            .ForMember(d => d.Id, opt => opt.MapFrom(s => s.Id))
            .ForMember(d => d.Name, opt => opt.MapFrom(s => s.Name))
            .ForMember(d => d.Type, opt => opt.MapFrom(s => s.Type))
            .ForMember(d => d.Quantity, opt => opt.MapFrom(s => s.Quantity))
            .ForMember(d => d.Gauge, opt => opt.MapFrom(s => s.Gauge))
            .ForMember(d => d.ToolSize, opt => opt.MapFrom(s => s.ToolSize));

        profile.CreateMap<ResourceDto, Domain.Entities.Resource>().ReverseMap();
    }
}
