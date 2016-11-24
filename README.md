# IncrementingTile

A simple class that generate a basic tile UI with a counter that can increase over time.

Build in ES6 and transpiled to ES5 via babel.

## Usage

The second argument is optional. If not passed the tile will not be rendered.

Returns the tile Element generated.

```javascript
new IncrementingTile({
    top: "Money wasted",
    center: "£ ",
    bottom: "What a shame"
}, document.getElementById("tiles"));
```


## Options

| Property        | Type           | Default  |
| -------------- |:--------------:| --------:|
| formatter | String / Boolean | "thousands" |
| amount | Integer |  10000 |
| amountPerSecond | Integer | 150 |
| continuous | Boolean | true |
| static | Boolean | false |
| interval | Integer | 500 |
| speed | Integer | 5 |
| cssClass | String | "" |
| top | String | "" |
| center | String | "" |
| bottom | String | "" |