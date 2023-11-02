﻿
namespace Domain.Entities
{
    public class Pattern
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public bool Finished { get; set; }
        public string Category { get; set; }
    public string Notes { get; set; }
        public List<Yarn> Yarns { get; set; }
    }
}
