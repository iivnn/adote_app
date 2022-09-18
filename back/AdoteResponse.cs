﻿using System.ComponentModel;

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

        private MessageType _type = MessageType.Success;

        public MessageType Type
        {
            set
            {
                _type = value;
            }
        }
        public string TypeString { get => _type.ToString(); }

        public static Message DefaultInternarlErroMessage
        {
            get
            {
                return new Message()
                {
                    Title = "Erro",
                    Text = "Erro interno no servidor.",
                    Type = MessageType.Error
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