using Adote.Library;
using Adote.Library.BusinessContexts;
using Microsoft.AspNetCore.Mvc;

namespace AdoteWebApplication.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly ILogger<UserController> _logger;

        private readonly AdoteContext _context;

        public UserController(ILogger<UserController> logger, AdoteContext adoteContext)
        {
            _logger = logger;
            _context = adoteContext;
        }

        [HttpGet("IsEmailAvailable")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public AdoteResponse<bool> IsEmailAvailable(string email)
        {
            try
            {
                Message message = null;
                bool emailAvailable = false;
                List<User> users = _context.Users.Where(u => u.Email == email).ToList();
                if(users.Count == 0)
                    emailAvailable = true;
                else
                {
                    message = new Message();
                    message.Title = "E-mail indisponível";
                    message.Text = "Este e-mail ja foi utilizado.";
                    message.Type = MessageType.Error;
                }

                Response.StatusCode = 200;
                return new AdoteResponse<bool>()
                {
                    Data = emailAvailable,
                    Success = true,
                    Message = message
                };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, ex.Message);
                Response.StatusCode = 500;
                return new AdoteResponse<bool>() { Success = false, Message = Message.DefaultInternarlErroMessage };
            }                    
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]      
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public AdoteResponse<User> Add(UserModel userModel)
        {
            try
            {
                User user = userModel.Cast();
                _context.Users.Add(user);
                _context.SaveChanges();

                Response.StatusCode = 201;
                return new AdoteResponse<User>()
                {
                    Data = user,
                    Success = true,
                    Message = new Message()
                    {
                        Title = "Sucesso",
                        Text = "Usuário criado com sucesso",
                        Type = MessageType.Success,
                    }
                };
            }
            catch (Exception ex)
            {
                Response.StatusCode = 500;
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

    }
}