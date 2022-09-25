using System.ComponentModel;

namespace AdoteWebApplication
{
    public class AdoteResponse<T>
    {
        public Message Message { get; set; }

        public T Data { get; set; }

        public bool Success { get; set; }
    }

    public class Message
    {
        public string Title { get; set; }

        public string Text { get; set; }

        private MessageType _messageType = MessageType.Success;

        public MessageType MessageType
        {
            set
            {
                _messageType = value;
            }
        }
        public string Type { get => _messageType.ToString(); }

        public static Message DefaultInternarlErroMessage
        {
            get
            {
                return new Message()
                {
                    Title = "Erro",
                    Text = "Erro interno no servidor.",
                    MessageType = MessageType.Error
                };
            }
        }

        public static Message DefaultUnauthorizedMessage
        {
            get
            {
                return new Message()
                {
                    Title = "Erro",
                    Text = "Usuário não autenticado.",
                    MessageType = MessageType.Error
                };
            }
        }
    }

    public class MessageType
    {
        private string _value = string.Empty;
        private MessageType(string value)
        {
            _value = value; 
        }

        public static MessageType Success => new("success");

        public static MessageType Error => new("error");

        public static MessageType Information => new("info");

        public override string ToString()
        {
            return _value;
        }
    }
}
