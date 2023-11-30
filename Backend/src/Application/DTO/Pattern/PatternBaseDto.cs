using Application.DTO.OtherSupply;
using Application.DTO.Tool;
using Application.DTO.User;
using Application.DTO.Yarn;
using Common.Enums;

namespace Domain.Entities
{
    public class PatternBaseDto
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
    }
}
