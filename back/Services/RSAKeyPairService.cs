namespace AdoteWebApplication.Services
{
    public interface IRSAKeyPairService
    {
        public void PushRsaKeyPair(RsaKeyPair rsaKeyPair);

        public void GetRsaKeyPair(Guid id);
    }

    public class RSAKeyPairService : IRSAKeyPairService
    {
        private readonly Stack<RsaKeyPair> rsaKeyPairs = new();

        public void GetRsaKeyPair(Guid id)
        {
            if (rsaKeyPairs.Count > 1000)
                rsaKeyPairs.Where(x => x.Id == id).FirstOrDefault( defaultValue: null);
        }

        public void PushRsaKeyPair(RsaKeyPair rsaKeyPair)
        {
            if (rsaKeyPairs.Count > 1000)
                rsaKeyPairs.Pop();
            rsaKeyPairs.Push(rsaKeyPair);
        }
    }

    public class RsaKeyPair
    {
        public Guid Id { get; set; }
        public string PublicKey { get; set; }
        public string PrivateKey { get; set; }
    }
}
