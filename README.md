# 📈 stock-fetching-api


## API calls

### Get all stocks
> /stocks

### Get details for one stock
> /stocks/:id

## Websockets

Connect on port `3001`

### Subscribe to stock updates
`
{
"event": "STOCKS_SUBSCRIBE",
"payload": {
"stockIds": ["1", "2"]
}
}
`