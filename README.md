# invControl

## ATENÇÃO: Projeto ainda em desenvolvimento!

## Descrição
Este projeto é um sistema de controle de estoque desenvolvido com Next.js, Material-UI, Prisma e PostgreSQL. Ele permite que os usuários realizem operações de CRUD em produtos, gerem relatórios de entrada e saída, e façam o controle de estoque de maneira simples e eficiente.

## Tecnologias Utilizadas
- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/) (usando JSX)
- [Material-UI](https://material-ui.com/)
- [Prisma](https://www.prisma.io/)
- [MySQL](https://hub.docker.com/_/mysql) (Usando Docker local)

## Pré-requisitos
- Node.js: Certifique-se de ter o Node.js instalado na sua máquina.
- PostgreSQL: Você precisa de um banco de dados PostgreSQL para armazenar seus dados. Certifique-se de tê-lo instalado e configurado, para uso local recomendo utilizar docker.

## Instalação
1. Clone o repositório: `git clone https://github.com/Luaxlz/inventory-management`
2. Navegue até a pasta do projeto: `inventory-management`
3. Instale as dependências: `npm install`

## Configuração
1. Crie um container MySQL localmente em sua maquina utilizando docker (link na seção tecnologias).
2. Crie um arquivo `.env.local` na raiz do projeto para armazenar suas variáveis de ambiente. Você pode seguir um modelo como este:
   `DATABASE_URL="sua-url-de-conexão-com-o-MySQL"`
3. Execute as migrações do Prisma para criar as tabelas no banco de dados: `npx prisma migrate dev`

## Uso
Para iniciar o projeto localmente, use o seguinte comando: `npm run dev`

Acesse a aplicação no seu navegador em: `http://localhost:3000`

## Contribuições
Por enquanto não estarei aceitando contribuições, assim que o projeto estiver finalizado irei abrir para receber contribuições.

## Licença
Este projeto é licenciado sob a licença MIT. Consulte o arquivo [LICENSE](LICENSE) para obter mais detalhes.


