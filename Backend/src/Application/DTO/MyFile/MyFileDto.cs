using Application.Mapping;
using AutoMapper;

namespace Application.DTO.File
{
    public class MyFileDto : IMapFrom<Domain.Entities.MyFile>
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Content { get; set; }
        public string Type { get; set; }
        public Guid ParentId { get; set; }

         public static void Mapping(Profile profile)
        {
            profile.CreateMap<Domain.Entities.MyFile, MyFileDto>()
                .ForMember(d => d.Id, opt => opt.MapFrom(s => s.Id))
                .ForMember(d => d.Name, opt => opt.MapFrom(s => s.Name))
                .ForMember(d => d.Content, opt => opt.MapFrom(s => s.Content))
                .ForMember(d => d.Type, opt => opt.MapFrom(s => s.Type))
                .ForMember(d => d.ParentId, opt => opt.MapFrom(s => s.ParentId));
        }
    }
}