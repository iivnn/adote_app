using Adote.Library;
using Adote.Library.BusinessContexts;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Net.Mail;
using System.Security.Claims;
using System.Text;
using System.Text.RegularExpressions;

namespace AdoteWebApplication.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;

        private readonly AdoteContext _context;

        private readonly IOptions<AppSettings> _appSettings;

        public UserController(ILogger<UserController> logger, AdoteContext adoteContext, IOptions<AppSettings> appSettings)
        {
            _logger = logger;
            _context = adoteContext;
            _appSettings = appSettings;
        }

        [HttpGet("IsEmailAvailable")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public AdoteResponse<bool> IsEmailAvailable(string? email)
        {
            try
            {
                Message message = null;

                if(!IsEmailValid(email, out message))
                {
                    Response.StatusCode = StatusCodes.Status400BadRequest;
                    return new AdoteResponse<bool>()
                    {
                        Data = false,
                        Success = false,
                        Message = message
                    };
                }

                if(!IsEmailAvailable(email, out message))
                {
                    Response.StatusCode = StatusCodes.Status200OK;
                    return new AdoteResponse<bool>()
                    {
                        Data = false,
                        Success = true,
                        Message = message
                    };
                }

                Response.StatusCode = StatusCodes.Status200OK;
                return new AdoteResponse<bool>()
                {
                    Data = true,
                    Success = true,
                    Message = message
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                Response.StatusCode = StatusCodes.Status500InternalServerError;
                return new AdoteResponse<bool>() { Success = false, Message = Message.DefaultInternarlErroMessage };
            }                    
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]      
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public AdoteResponse<User> Add(UserModel? userModel)
        {
            try
            {
                Message message = null;

                if(userModel == null)
                {
                    Response.StatusCode = StatusCodes.Status400BadRequest;
                    return new AdoteResponse<User>()
                    {
                        Data = null,
                        Success = false,
                        Message = new Message()
                        {
                            Title = "Erro",
                            Text = "Requisição com corpo vazio.",
                            MessageType = MessageType.Success,
                        }
                    };
                }

                if (!IsEmailAvailable(userModel.Email, out message))
                {
                    Response.StatusCode = StatusCodes.Status200OK;
                    return new AdoteResponse<User>()
                    {
                        Data = null,
                        Success = false,
                        Message = message
                    };
                }

                User user = userModel.Cast();
                user.EncryptPassword();
                _context.Users.Add(user);
                _context.SaveChanges();

                user.Password = null;

                Response.StatusCode = StatusCodes.Status201Created;
                return new AdoteResponse<User>()
                {
                    Data = user,
                    Success = true,
                    Message = new Message()
                    {
                        Title = "Sucesso",
                        Text = "Usuário criado com sucesso.",
                        MessageType = MessageType.Success,
                    }
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                Response.StatusCode = StatusCodes.Status500InternalServerError;
                return new AdoteResponse<User>() { Success = false, Message = Message.DefaultInternarlErroMessage };
            }
        }

        //[HttpDelete]
        //[ProducesResponseType(StatusCodes.Status200OK)]
        //[ProducesResponseType(StatusCodes.Status400BadRequest)]
        //[ProducesResponseType(StatusCodes.Status500InternalServerError)]
        //public AdoteResponse Delete(Guid userId)
        //{
        //    try
        //    {
        //        List<User> users = _context.Users.Where(u => u.Id == userId).ToList();
        //        if(users.Count == 0)
        //        {
        //            Response.StatusCode = 200;
        //            return new AdoteResponse()
        //            {
        //                Data = false,
        //                Sucess = false,
        //                Message = new Message()
        //                {
        //                    Title = "Error",
        //                    Text = "O usuário não existe.",
        //                    Type = MessageTypeEnum.Error
        //                }
        //            };
        //        }

        //        _context.Users.Remove(users[0]);
        //        _context.SaveChanges();

        //        Response.StatusCode = 200;
        //        return new AdoteResponse()
        //        {
        //            Data = true,
        //            Sucess = true,
        //            Message = new Message()
        //            {
        //                Title = "Sucesso",
        //                Text = "Usuário excluido com sucesso.",
        //                Type = MessageTypeEnum.Success
        //            }
        //        };
        //    }
        //    catch (Exception ex)
        //    {
        //        Response.StatusCode = 500;
        //        return new AdoteResponse() { Sucess = false, Message = Message.DefaultInternarlErroMessage };
        //    }
        //}

        //[HttpPut]
        //[ProducesResponseType(StatusCodes.Status200OK)]
        //[ProducesResponseType(StatusCodes.Status400BadRequest)]
        //[ProducesResponseType(StatusCodes.Status500InternalServerError)]
        //public AdoteResponse Update(User user)
        //{
        //    try
        //    {
        //        List<User> users = _context.Users.Where(u => u.Id == user.Id).ToList();
        //        if (users.Count == 0)
        //        {
        //            Response.StatusCode = 200;
        //            return new AdoteResponse()
        //            {
        //                Data = null,
        //                Sucess = false,
        //                Message = new Message()
        //                {
        //                    Title = "Error",
        //                    Text = "O usuário não existe.",
        //                    Type = MessageTypeEnum.Error
        //                }
        //            };
        //        }

        //        _context.Users.Update(user);
        //        _context.SaveChanges();

        //        Response.StatusCode = 200;
        //        return new AdoteResponse()
        //        {
        //            Data = user,
        //            Sucess = true,
        //            Message = new Message()
        //            {
        //                Title = "Sucesso",
        //                Text = "Usuário Alterado com sucesso.",
        //                Type = MessageTypeEnum.Success
        //            }
        //        };
        //    }
        //    catch (Exception ex)
        //    {
        //        Response.StatusCode = 500;
        //        return new AdoteResponse() { Sucess = false, Message = Message.DefaultInternarlErroMessage };
        //    }
        //}


        [HttpPost("Authenticate")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public AdoteResponse<User> Authenticate(string email, string password)
        {
            try
            {
                var user = _context.Users.Where(u => u.Email == email).ToList();
                if(user == null || user.Count == 0)
                {
                    return new AdoteResponse<User>()
                    {
                        Data = null,
                        Success = false,
                        Message = new Message()
                        {
                            Title = "Erro",
                            Text = "Usuário não existe.",
                            MessageType = MessageType.Error,
                        }
                    };
                }

                var encryptedPassword = UserModel.EncryptPassword(password);

                if (user[0].Password != encryptedPassword)
                {
                    return new AdoteResponse<User>()
                    {
                        Data = null,
                        Success = false,
                        Message = new Message()
                        {
                            Title = "Erro",
                            Text = "Senha inválida.",
                            MessageType = MessageType.Error,
                        }
                    };
                }



                var token = GenerateJwtToken(user[0]);

                user[0].Password = null;
                user[0].Token = token;

                return new AdoteResponse<User>()
                {
                    Data = user[0],
                    Success = true,
                    Message = new Message()
                    {
                        Title = "Sucesso",
                        Text = "Usuário autenticado com sucesso.",
                        MessageType = MessageType.Success,
                    }
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                Response.StatusCode = StatusCodes.Status500InternalServerError;
                return new AdoteResponse<User>() { Success = false, Message = Message.DefaultInternarlErroMessage };
            }
        }


        [HttpGet("teste")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [Helpers.Authorize]
        public string teste(string email)
        {
            return "kkkkk";
        }

        private string GenerateJwtToken(User user)
        {
            // generate token that is valid for 7 days
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Value.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("id", user.Id.ToString()) }),
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        private bool IsEmailAvailable(string email, out Message? message)
        {
            message = null;
            bool emailAvailable = false;
            List<User> users = _context.Users.Where(u => u.Email == email).ToList();
            if (users.Count == 0)
                emailAvailable = true;
            else
            {
                message = new Message();
                message.Title = "E-mail indisponível";
                message.Text = "Este e-mail ja foi utilizado.";
                message.MessageType = MessageType.Error;
            }
            return emailAvailable;
        }

        private bool IsEmailValid(string emailaddress, out Message? message)
        {
            message = null;
            if (string.IsNullOrEmpty(emailaddress))
            {
                message = new Message();
                message.Title = "Email requerido";
                message.Text = "E-mail deve ser informado.";
                message.MessageType = MessageType.Error;
                return false;
            }

            try
            {
                MailAddress m = new MailAddress(emailaddress);
                return true;
            }
            catch (FormatException)
            {
                message = new Message();
                message.Title = "Formato incorreto";
                message.Text = "E-mail informado em um formato incorreto.";
                message.MessageType = MessageType.Error;
                return false;
            }
        }
    }
}