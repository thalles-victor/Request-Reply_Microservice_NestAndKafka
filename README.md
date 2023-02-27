# Micro Serviço usando NestJS, Kafka com os conceitos de request-reply.

## Iniciando o projeto
Esse projeto está contenerizado usando docker, para isso é nescessário que você tenha o docker engine e o docker compose instalado, dessa forma ele vai executar tudo o que a aplicação precisa.

Instale as dependências para que o vscode não reclame de erros.

api_gateway
```console
cd ./api_gateway ; npm install
```

user microservice
```console
cd "./microservices/user ; npm install
```

depois suba a aplicação rodando

```console
docker compose up --build
```

## Aviso
A conexão com o kafka pode demorar um tempo por isso tem que esperar até que ela já esteja estabelecida para testar o projeto.

```typescript
async onModuleInit() {
  ...
  // await this.client.connect();
}
```
no serviço da API_Gateway eu deixei a pré conexção comentada, porém, ela vai ser chamada na primeira requisição o que pode demorar um pouco, mas vocês podem descomentar para que, quando a api_gateway iniciar ela automaticamente conecte com o borker do kafka.

O projeto não ultiliza variáveis de ambiente, então não é nescessário configuração dessa parte.

## Acessando a documentação do projeto

Para acessar a documentação swagger basta entrar em http://localhost:3000/api/doc

![Swagger doc](./assets/Screenshot%20from%202023-02-26%2011-17-14.png)

## Acessando o Kafka UI.

O Kafka UI é um gerenciador do kafka com interface gráfica que está sendo executado através do docker compose.

Para usa-lo basta acessar http://localhost:8080

![Kafka UI](./assets/Screenshot%20from%202023-02-26%2011-14-24.png)