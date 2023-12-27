using Application.Mapping;
using AutoMapper;

namespace Application.DTO.Photo
{
    public class PhotoDto : IMapFrom<Domain.Entities.Photo>
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Content { get; set; }
        public string Type { get; set; }
        public Guid ParentId { get; set; }

        public static void Mapping(Profile profile)
        {
            profile.CreateMap<Domain.Entities.Photo, PhotoDto>()
                .ForMember(d => d.Id, opt => opt.MapFrom(s => s.Id))
                .ForMember(d => d.Name, opt => opt.MapFrom(s => s.Name))
                .ForMember(d => d.Content, opt => opt.MapFrom(s => s.Content))
                .ForMember(d => d.Type, opt => opt.MapFrom(s => s.Type))
                .ForMember(d => d.ParentId, opt => opt.MapFrom(s => s.PatternId ?? s.ProjectId ?? s.ResourceId));
        }
    }
}