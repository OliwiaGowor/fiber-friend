using Domain.Entities;
using Domain.Interfaces.Repository;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _dbContext;

        public UserRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public User GetUserById(Guid userId)
        {
            var user = _dbContext.Users.FirstOrDefault(i => i.Id == userId);
            return user;
        }

        public User GetUserByEmail(string email)
        {
            var user = _dbContext.Users.FirstOrDefault(i => i.Email == email);
            return user;
        }

        public Guid AddUser(User user)
        {
            _dbContext.Users.Add(user);
            _dbContext.SaveChanges();

            return user.Id;
        }

        public void DeleteUser(Guid userId)
        {
            var user = _dbContext.Users.Find(userId);
            if (user is not null)
            {
                _dbContext.Users.Remove(user);
                _dbContext.SaveChanges();
            }
        }

        public void UpdateUser(User user)
        {
            _dbContext.Entry(user).State = EntityState.Modified;
            _dbContext.SaveChanges();
        }

        public User UpdateUserData(User user)
        {
            var dbUser = _dbContext.Users.FirstOrDefault(y => y.Id == user.Id);

            if (dbUser != null)
            {
                dbUser.Username = user.Username;
                dbUser.Email = user.Email;
                _dbContext.SaveChanges();

                return dbUser;
            }
            else
            {
                throw new Exception("User not found");
            }
        }

        public void ChangeUserPassword(Guid userId, string password)
        {
            var user = _dbContext.Users.FirstOrDefault(y => y.Id == userId);

            if (user != null)
            {
                user.HashedPassword = password;
                _dbContext.SaveChanges();
            }
            else
            {
                throw new Exception("User not found");
            }
        }
    }
}
