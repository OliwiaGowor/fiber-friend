using Application.DTO.Counter;
using AutoMapper;

namespace Application.DTO.CountersGroup
{
    public class CountersGroupDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public List<CounterDto> Counters { get; set; }
        public Guid? ProjectId { get; set; }
        public Guid? PatternId { get; set; }

        public static void Mapping(Profile profile)
        {
            profile.CreateMap<Domain.Entities.CountersGroup, CountersGroupDto>()
                .ForMember(d => d.Id, opt => opt.MapFrom(s => s.Id))
                .ForMember(d => d.Name, opt => opt.MapFrom(s => s.Name))
                .ForMember(d => d.Counters, opt => opt.MapFrom(s => s.Counters))
                .ForMember(d => d.ProjectId, opt => opt.MapFrom(s => s.ProjectId))
                .ForMember(d => d.PatternId, opt => opt.MapFrom(s => s.PatternId));

            profile.CreateMap<CountersGroupDto, Domain.Entities.CountersGroup>().ReverseMap();
        }
    }
}
