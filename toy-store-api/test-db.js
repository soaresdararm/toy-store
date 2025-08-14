const sql = require("mssql");

const config = {
  server: "127.0.0.1",
  database: "ToyStore",
  port: 1433,
  options: {
    trustServerCertificate: true,
  },
  authentication: {
    type: "ntlm",
    options: {
      domain: "DARASOARES",
      userName: "soare",
      password: "", // pode deixar vazio para autenticação do Windows
    },
  },
};
sql
  .connect(config)
  .then((pool) => {
    console.log("Conexão bem-sucedida!");
    return pool.close();
  })
  .catch((err) => {
    console.error("Erro ao conectar:", err);
  });
