using Application.Mapping;
using AutoMapper;

namespace Application.DTO.Counter
{
    public class CounterDto : IMapFrom<Domain.Entities.Counter>
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public int Value { get; set; }
        public Guid CountersGroupId { get; set; }
        public Guid? ProjectId { get; set; }
        public Guid? PatternId { get; set; }

        public static void Mapping(Profile profile)
        {
            profile.CreateMap<Domain.Entities.Counter, CounterDto>()
                .ForMember(d => d.Id, opt => opt.MapFrom(s => s.Id))
                .ForMember(d => d.Name, opt => opt.MapFrom(s => s.Name))
                .ForMember(d => d.Value, opt => opt.MapFrom(s => s.Value))
                .ForMember(d => d.CountersGroupId, opt => opt.MapFrom(s => s.CountersGroupId));
        }
    }
}
