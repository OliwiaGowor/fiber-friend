using Application.Mapping;
using AutoMapper;

namespace Application.DTO.OtherSupply;

public class OtherSupplyDto : IMapFrom<Domain.Entities.OtherSupply>
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public int Quantity { get; set; }
    public string Note { get; set; }
    public Guid PatternId { get; set; }

    public static void Mapping(Profile profile)
    {
        profile.CreateMap<Domain.Entities.OtherSupply, OtherSupplyDto>()
            .ForMember(d => d.Id, opt => opt.MapFrom(s => s.Id))
            .ForMember(d => d.Name, opt => opt.MapFrom(s => s.Name))
            .ForMember(d => d.Quantity, opt => opt.MapFrom(s => s.Quantity))
            .ForMember(d => d.Note, opt => opt.MapFrom(s => s.Note))
            .ForMember(d => d.PatternId, opt => opt.MapFrom(s => s.PatternId));
    }
}
