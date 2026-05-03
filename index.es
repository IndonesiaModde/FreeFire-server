const express = require('express');
const app = express();
const port = process.env.PORT || 8000;

// Middleware para logs de requisições
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Rota inicial
app.get('/', (req, res) => {
    res.send('Free Fire Private Server - Node.js on Render');
});

// --- FLUXO DE ATUALIZAÇÃO (ABHotUpdates) ---

// ver.php - Retorna a versão do jogo
app.get('/live/ver.php', (res) => {
    res.send('1.17.1');
});

// versioninfo - Retorna a versão pura
app.get('/live/versioninfo', (res) => {
    res.send('1.17.1');
});

// fileinfo - Bypass de download de assets (vazio)
app.get('/sbt/fileinfo', (res) => {
    res.send('');
});

// --- FLUXO DE LOGIN (MSDK / Garena) ---

// Informações do App
app.all('/info/app/info/get', (req, res) => {
    res.json({ status: 200, message: "success" });
});

// Login/Connect principal
app.all(['/conn/', '/conn/*'], (req, res) => {
    res.json({
        error: 0,
        session_key: "node_session_js_999",
        account_id: "2000002"
    });
});

// SSO (Single Sign-On)
app.all(['/sso/', '/sso/*'], (req, res) => {
    res.json({
        error: 0,
        access_token: "node_token_js_999"
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
