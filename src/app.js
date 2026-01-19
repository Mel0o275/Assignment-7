import express from 'express'
import { port } from '../config/config.service.js'
import collection from './modules/collectionBooks/collectionBooks.controllers.js'
import books from './modules/Books/Books.controllers.js'
import logs from './modules/logs/logs.controllers.js'
function bootstrap() {
    const app = express()
    app.use(express.json())
    app.get('/', (req, res) => res.send('Hello World!'))
    app.use('/collection', collection)
    app.use('/books', books)
    app.use('/logs', logs)
    

    // //invalid routing
    // app.use('{/*dummy}', (req, res) => {
    //     return res.status(404).json({ message: "Invalid application routing" })
    // })

    // //error-handling
    // app.use((error, req, res, next) => {
    //     const status = error.cause?.status ?? 500
    //     return res.status(status).json({
    //         error_message:
    //             status == 500 ? 'something went wrong' : error.message ?? 'something went wrong',
    //         stack: NODE_ENV == "development" ? error.stack : undefined
    //     })
    // })
    
    app.listen(port, () => console.log(`Example app listening on port ${port}!`))
}
export default bootstrap