using System.ComponentModel.DataAnnotations;

namespace Adote.Library
{
    public class User : UserModel
    {
        public Guid Id { get; set; } = new Guid();
    }

    public class UserModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string Name { get; set; } = string.Empty;
      
        [RegularExpression("^(?:(?:\\+|00)?(55)\\s?)?(?:\\(?([1-9][0-9])\\)?\\s?)?(?:((?:9\\d|[2-9])\\d{3})\\-?(\\d{4}))$", ErrorMessage = "The PhoneNumber field is not valid.")]
        public string PhoneNumber { get; set; } = string.Empty;

        [Required]
        public string Password { get; set; } = string.Empty;

        public User Cast()
        {
            return new User 
            { 
                Email = Email, 
                Name = Name,
                PhoneNumber = PhoneNumber,
                Password = Password,
            };
        }
    }
}