const mongoose = require('mongoose');
const fs = require('fs');

async function importBackup() {
  await mongoose.connect(process.env.MONGODB_URL);
  const db = mongoose.connection.db;

  const rawData = fs.readFileSync('dump.json');
  const backupData = JSON.parse(rawData);

  for (const colName in backupData) {
    if (backupData[colName].length > 0) {
      // Limpa a coleção antes de importar para não duplicar IDs
      await db.collection(colName).deleteMany({});

      // Insere os dados
      await db.collection(colName).insertMany(backupData[colName]);
      console.log(`🚀 Coleção [${colName}]: ${backupData[colName].length} documentos importados.`);
    }
  }

  console.log('✨ Restauração concluída com sucesso!');
  process.exit();
}

importBackup();

// node --env-file=.env src/database/backup/importBackup.js
