using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json.Serialization;

namespace Adote.Library
{
    public class User : UserModel
    {
        public Guid Id { get; set; } = new Guid();

        [NotMapped]
        public string Token { get; set; } = string.Empty;
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
        [MinLength(6)]
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string Password { get; set; } = string.Empty;

        public void EncryptPassword()
        {
            if (string.IsNullOrEmpty(Password))
                return;
            else
            {
                byte[] bytes;
                using (SHA256 mySHA256 = SHA256.Create())
                {
                    var encoding = new UTF8Encoding();
                    bytes = encoding.GetBytes(Password);
                    bytes = mySHA256.ComputeHash(bytes);
                }
                Password = Convert.ToBase64String(bytes);
            }
        }

        public static string EncryptPassword(string value)
        {
            if (string.IsNullOrEmpty(value))
                return value;
            else
            {
                byte[] bytes;
                using (SHA256 mySHA256 = SHA256.Create())
                {
                    var encoding = new UTF8Encoding();
                    bytes = encoding.GetBytes(value);
                    bytes = mySHA256.ComputeHash(bytes);
                }
                value = Convert.ToBase64String(bytes);
                return value;
            }
        }

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