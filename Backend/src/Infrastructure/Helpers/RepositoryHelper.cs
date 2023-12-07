using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Helpers
{
    public class RepositoryHelper
    {
        public static void UpdateCollection<T>(DbSet<T> dbSet, ICollection<T> existingCollection, List<T> newCollection) where T : class
        {
            // Remove existing items not present in the new collection
            dbSet.RemoveRange(existingCollection.Except(newCollection));

            // Add new items not present in the existing collection
            dbSet.AddRange(newCollection.Except(existingCollection));
        }
    }
}
