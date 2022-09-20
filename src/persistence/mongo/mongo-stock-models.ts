import {Schema} from "mongoose";

export const watchedStockSchema = new Schema({
    id: { type: String },
    symbol: { type: String },
    exchange: { type: String },
    currency: { type: String },
    lastUpdate: { type: Date },
    nextUpdate: { type: Date },
    lastValue: { type: Number }
})

export const stockUpdateSchema = new Schema({
    id: { type: String },
    updatedOn: { type: Date },
    value: { type: Number }
})
