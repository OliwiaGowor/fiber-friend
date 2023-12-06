﻿using Common.Enums;

namespace Domain.Entities
{
    public abstract class PatternBase
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public NeedleworkType Type { get; set; }
        public string Category { get; set; }
        public string Notes { get; set; }
        public ICollection<Photo>? Photos { get; set; }
        public Guid AuthorId { get; set; }
        public User Author { get; set; }
        public ICollection<Yarn>? Yarns { get; set; }
        public ICollection<Tool>? Tools { get; set; }
        public ICollection<OtherSupply>? OtherSupplies { get; set; }
        public bool IsShared { get; set; }
        public ICollection<CountersGroup>? Counters { get; set; }

    }
}
