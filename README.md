Repositório do primeiro projeto da disciplina de Aplicações distribuídas do curso de Sistemas de Informação da UFG

--

Para rodar o cliente base, primeiramente atualize o node.js com os comando abaixo.
npm cache clean -f
npm install -g n
n stable

Feito isso basta configurar os dados no arquivo cliente.js.

Para conectar:
node cliente.js

Para entrar em um canal:
/join #nome_do_canal

Depois de ter acessado um canal, para mandar uma mensagem:
/msg #nome_do_canal sua mensagem