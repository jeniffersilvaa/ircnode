Comandos úteis - Operações com Canais

Com o intuito de facilitar ao usuário o uso do IRC, este arquivo se restringe a comandos realizados nas Operações de Canais.
Os Canais são grupos formados por um ou mais clientes que irão receber mensagens endereçadas. O canal é criado implicitamente quando o primeiro cliente junta-se ao mesmo (comando join). De forma análoga o canal deixa de existir quando o último cliente o deixa (comando part).
Comandos utilizados:

JOIN
Comando usado por um cliente para começar a escutar um canal específico.
/join #Canal (Com este comando, entra no canal pretendido)
/join 0,#CANAL (Sai de todos os canais, reentrando apenas no canal especificado)

PART
Remove um cliente de um canal.
/part #canal [mensagem] (Faz sair do canal determinado (a mensagem é opcional))
/partall (Sai de todos os canais)

MODE
Altera o modo de usuários e canais.
/mode #canal | nick [[+ | - ] modos [parametros]] (Muda o modo de canais ou usuários)

TOPIC
Altera o tópico de um canal.
/topic #canal novotopic (Altera o tópico do canal específico)

NAMES
Lista todos os nicknames em um determinado canal.
/names #canal (Mostra os nicks de quem está num determinado canal)

LIST
Informa todos os canais e seus tópicos.
/list [#string] [- min #] [- max #] (Lista os canais, você pode pegar apenas os que têm um trecho(string) no seu nome, ou os que têm no máximo n pessoas e/ou no mínimo n. Em alguns servidores este comando pode desliga-lo devido ao lag que cria)

INVITE
Comando utilizado para convidar usuários para entrar em um canal.
/invite nick #canal (Convida o nick para o canal)

KICK
Remove um usuário de um canal.
/kick #canal nick (Retira uma pessoa do canal)