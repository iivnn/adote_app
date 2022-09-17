namespace Adote.Library
{
    public class User : UserModel
    {
        public Guid Id { get; set; } = new Guid();
    }

    public class UserModel
    {
        public string? Email { get; set; } = string.Empty;
        public string? Name { get; set; } = string.Empty;

        public User Cast()
        {
            return new User 
            { 
                Email = Email, 
                Name = Name 
            };
        }
    }
}