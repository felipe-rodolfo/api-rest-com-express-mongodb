import app from './src/app.js';
const port = process.env.PORT || 3000;

const rotas = {
    '/': 'Curso de Node',
    '/livros': 'Entrei na pag de livros',
    '/autores': 'Listagem de autores'
}

app.listen(port, () => {
    console.log(`Servidor escutando em http:://localhost:${port}`);
});