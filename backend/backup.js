const { exec } = require('child_process');
const path = require('path');
const router = require('express').Router();

// Database credentials
const dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.MYSQL_DB,
};

// Excluded tables
const excludedTables = ['medical_condition'];

// Backup settings
const backupFolder = path.join(__dirname, 'backups');

router.post('/create-backup', async (req, res) => {
  // Generate the backup command excluding specific tables
  const excludedTableArgs = excludedTables.map(table => `--ignore-table=${dbConfig.database}.${table}`).join(' ');
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString().replace(/[-T:.]/g, '_').slice(0, -5);
  const backupFileName = `backup_${formattedDate}.sql`;
  const backupCommand = `docker exec mysql_database mysqldump -h${dbConfig.host} -P${dbConfig.port} -u${dbConfig.user} -p${dbConfig.password} ${excludedTableArgs} ${dbConfig.database} > ${backupFolder}/${backupFileName}`;

  exec(backupCommand, (error, stdout, stderr) => {
    if (error) {
      res.json({ success: 0, message: 'Backup Error!' });
      console.error('Backup Error:', error);
    } else {
      res.json({ success: 1, message: 'Backup Successful' });
      console.log('Backup Successful');
    }
  });
});

module.exports = router;
