using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Adote.Library
{
    public class Animal : AnimalModel
    {
        public Guid Id { get; set; } = new Guid();

        [NotMapped]
        public string Token { get; set; } = string.Empty;
    }


    public class AnimalModel
    {
        [Required]
        [MinLength(2)]
        [MaxLength(255)]
        public string Name { get; set; } = string.Empty;

        [Required]
        public Especie EspecieAnimal { get; set; }

        [Required]
        public List<string> Fotos { get; set;} = new List<string>();

        [Required]
        public string Localizacao { get; set; } = string.Empty;

        [Required]
        [MinLength(6)]
        [MaxLength(255)]
        public string Descricao { get; set; } = string.Empty;

        [Required]
        public Sexo SexoAnimal { get; set; }

        [Required]
        public DateTime Nascimento { get; set; }

        public List<User> Interessados { get; set; } = new List<User>();

        [Required]
        public User Criador { get; set; } = null!;

        public Animal Cast()
        {
            return new Animal
            {
                Name = Name,
                EspecieAnimal = EspecieAnimal,
                Fotos = Fotos,
                Localizacao = Localizacao,
                Descricao = Descricao,
                SexoAnimal = SexoAnimal,
                Nascimento = Nascimento,
                Interessados = Interessados,
                Criador = Criador
            };
        }
    }
    public enum Especie
    {
        PEIXES,
        RÉPTEIS,
        ANFÍBIOS,
        AVES,
        MAMÍFEROS
    }

    public enum Sexo
    {
        Masculino,
        Feminino,
        Outro
    }
}
