# adote_app
IMPORTANTE: Para execução da API é necessário instalar o ISS:
    1- Abra um prompt comand como administrador;
    2- Execute o comando abaixo:

        Enable-WindowsOptionalFeature -Online -FeatureName IIS-WebServerRole, IIS-WebServer, IIS-CommonHttpFeatures, IIS-ManagementConsole, IIS-HttpErrors, IIS-HttpRedirect, IIS-WindowsAuthentication, IIS-StaticContent, IIS-DefaultDocument, IIS-HttpCompressionStatic, IIS-DirectoryBrowsing

Banco de dados:
    1-        

API:
    1- No prompt execute o camando abaixo:
        ipconfig
    2- Coloque o endereço IPV4 na pasta "launchSettings.json":
        "profiles" > "AdoteWebApplication" > "applicationUrl"
    3- Abra o solução no visual studio;
    4- Execute.

APP:
    1- No prompt comando execute o comando npm i;
    2- Em global > Global.tsx altere a variavel "URL" para o mesmo da api em "launchSettings.json";
    3- Execute o comando "npx expo start" para inicar a aplicação;
    4- A API deve estar sendo executada para correta funcionalidade do aplicativo.




    

        
