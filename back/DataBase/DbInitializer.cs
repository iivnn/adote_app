using Adote.Library;
using Adote.Library.BusinessContexts;

namespace AdoteWebApplication
{
    public static class DbInitializer
    {
        public static void Initialize(AdoteContext context)
        {
            if(context.Users != null)
            {
                if (context.Users.Any())
                {
                    return;
                }

                var users = new User[]
                {
                new User{ Email = "email@email.com", Name = "email" },
                new User{ Email = "teste@teste.com", Name = "email" },
                new User{ Email = "www@www.com", Name = "email" }
                };

                context.Users.AddRange(users);
                context.SaveChanges();
            }
        }
    }
}
