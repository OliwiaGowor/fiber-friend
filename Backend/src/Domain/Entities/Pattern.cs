namespace Domain.Entities
{
    public class Pattern : PatternBase
    {
        public bool IsAuthorial { get; set; }
        public bool IsPlanned { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public bool IsFinished { get; set; }
    }
}
