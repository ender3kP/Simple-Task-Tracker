require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const taskController = require('./controllers/taskController');

const { DefaultAzureCredential } = require("@azure/identity");
const { SecretClient } = require("@azure/keyvault-secrets");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8081;

async function connectToDatabase() {
  try {
    const keyVaultName = process.env.KEY_VAULT_NAME;
    
    if (!keyVaultName) {
      throw new Error("Brak zmiennej KEY_VAULT_NAME w pliku .env!");
    }

    const KVUri = "https://" + keyVaultName + ".vault.azure.net";
    console.log("Pobieranie hasła z Key Vault: " + KVUri + " ...");

    const credential = new DefaultAzureCredential();
    const client = new SecretClient(KVUri, credential);
    
    const secret = await client.getSecret("DbConnectionString");
    const dbUrl = secret.value;

    await mongoose.connect(dbUrl);
    console.log('✅ Połączono z bazą MongoDB przez Key Vault!');

  } catch (err) {
    console.error('❌ Błąd połączenia z bazą przez Key Vault:', err);
  }
}

connectToDatabase();

app.get('/api/tasks', taskController.getTasks);
app.get('/api/tasks/:id', taskController.getTask);
app.post('/api/tasks', taskController.createTask);
app.put('/api/tasks/:id', taskController.updateTask);
app.delete('/api/tasks/:id', taskController.deleteTask);

app.listen(PORT, () => console.log(`🚀 Backend działa na porcie ${PORT}`));