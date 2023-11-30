﻿using Common.Enums;

namespace Domain.Entities
{
    public class PatternBase
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public NeedleworkType Type { get; set; }
        public string Category { get; set; }
        public string Notes { get; set; }
        //public ??? List<Photo> Photos { get; set; }
        //public ??? List<File> Files { get; set; }
        public Guid AuthorId { get; set; }
        public User Author { get; set; }
        public ICollection<Yarn> Yarns { get; set; }
        public ICollection<Tool> Tools { get; set; }
        public ICollection<OtherSupply>? OtherSupplies { get; set; }
        public bool IsShared { get; set; }
        public ICollection<CountersGroup>? Counters { get; set; }

    }
}