Caros,

Esse é um simples projeto web, para controle de funcionários embarcados.

O presente projeto é foi desenvolvido usando Angular 9, ASP Net, entity framework e sqlite. A validação dos usuários é feita usando JWT. Adicionei algumas rotas protegidas, como é o caso da edição dos usuários, onde somente o próprio usuário consegue se editar. 

Filtrando os usuários de acordo com as datas de embarque e desembarque é possível gerar um gráfico, informando quantos usuários de cada empresa estavam embarcados no suposto período.

O backend está num servidor na Azure, então é possível utilizar a pasta cliente usando o angular cli. Para mudar é só editar o arquivo Client\src\app\models\app-settings.ts.

Obs: fiz alguns testes unitários no angular e no C#, mas infelizmente não deu tempo de fazer todos os testes que eu queria. Existem pequenos bugs no sistema, porém ele é utilizável. Também Não houve tempo de sesenvolver um componente de loading para esperar os dados virem do servidor.

Att.,

Rodrigo
