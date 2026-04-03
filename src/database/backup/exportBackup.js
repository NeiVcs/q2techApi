const mongoose = require('mongoose');
const fs = require('fs');

async function exportBackup() {
  await mongoose.connect(process.env.MONGODB_URL);
  const db = mongoose.connection.db;

  const collections = await db.listCollections().toArray();
  const backupData = {};

  for (const col of collections) {
    const data = await db.collection(col.name).find({}).toArray();
    backupData[col.name] = data;
    console.log(`📦 Coleção [${col.name}]: ${data.length} documentos exportados.`);
  }

  fs.writeFileSync('dump.json', JSON.stringify(backupData, null, 2));
  console.log('✅ Backup concluído: dump.json');
  process.exit();
}

exportBackup();

// node --env-file=.env src/database/backup/exportBackup.js