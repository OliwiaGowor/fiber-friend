using Application.DTO.Counter;
using Application.DTO.Pattern;
using Application.DTO.Project;
using Application.Mapping;
using AutoMapper;

namespace Application.DTO.CountersGroup
{
    public class CountersGroupDto : IMapFrom<Domain.Entities.CountersGroup>
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public List<CounterDto> Counters { get; set; }
        public Guid UserId { get; set; }
        public Guid? PatternId { get; set; }
        public string? PatternName { get; set; }
        public Guid? ProjectId { get; set; }
        public string? ProjectName { get; set; }

        public static void Mapping(Profile profile)
        {
            profile.CreateMap<Domain.Entities.CountersGroup, CountersGroupDto>()
                .ForMember(d => d.Id, opt => opt.MapFrom(s => s.Id))
                .ForMember(d => d.Name, opt => opt.MapFrom(s => s.Name))
                .ForMember(d => d.Counters, opt => opt.MapFrom(s => s.Counters))
                .ForMember(d => d.UserId, opt => opt.MapFrom(s => s.UserId))
                .ForMember(d => d.PatternId, opt => opt.MapFrom(s => s.PatternId))
                .ForMember(d => d.PatternName, opt => opt.MapFrom(s => s.Pattern.Name))
                .ForMember(d => d.ProjectId, opt => opt.MapFrom(s => s.ProjectId))
                .ForMember(d => d.ProjectName, opt => opt.MapFrom(s => s.Project.Name));
        }
    }
}
