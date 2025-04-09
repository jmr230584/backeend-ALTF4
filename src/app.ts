import { DatabaseModel } from "./model/DataBaseModel";
import { server } from "./server";

const port: number = 3333;

new DatabaseModel().testeConexao().then((resdb) => {
    if(resdb){
        console.log('Conexão com banco de dados realizada com sucesso.');
        // iniciando o servidor
        server.listen(port, ()  => {
            console.log(`Servidor iniciado no endereço http://localhost:${port}`);
        });
    } else{
        console.log('Erro ao conectar ao banco de dados.');
    }
});