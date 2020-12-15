// importa o servidor
import app from './app'

const port = process.env.PORT || 3000

// inicia o server iniciando ele para ouvir na porta 3000
app.listen(port, () => {
    console.log(`🌈 listening on ${port}`)
})