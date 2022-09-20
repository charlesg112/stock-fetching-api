import express from "express";
import {MongoStockRepository} from "./persistence/mongo/mongo-stock-repository";
import {StockRepository} from "./persistence/stock-repository";
const app = express()
const port = 3000
const persistence: StockRepository = new MongoStockRepository("stocks",
    "stockUpdates",
    "watchedStocks",
    process.env.DATABASEURL);

app.get('/stocks/:id', async (req: any, res) => {
    const stock = await persistence.getStockById(req.params.id);

    res.send(JSON.stringify(stock));
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
