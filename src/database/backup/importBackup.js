const mongoose = require('mongoose');
const fs = require('fs');
const { Types } = mongoose;

async function importBackup() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    const db = mongoose.connection.db;

    const rawData = fs.readFileSync('dump.json');
    const backupData = JSON.parse(rawData);

    for (const colName in backupData) {
      if (backupData[colName].length > 0) {
        const processedData = backupData[colName].map(doc => {
          const newDoc = { ...doc };

          if (newDoc._id && typeof newDoc._id === 'string') {
            newDoc._id = new Types.ObjectId(newDoc._id);
          }

          return newDoc;
        });

        await db.collection(colName).deleteMany({});

        await db.collection(colName).insertMany(processedData);
        console.log(`🚀 Coleção [${colName}]: ${processedData.length} documentos restaurados com ObjectIds.`);
      }
    }

    console.log('✨ Restauração concluída com sucesso!');
  } catch (error) {
    console.error('❌ Erro na importação:', error);
  } finally {
    process.exit();
  }
}

importBackup();

// node --env-file=.env src/database/backup/importBackup.js
