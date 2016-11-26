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

| Property        | Type           | Default  | Description |
| -------------- |:--------------:| --------:| :------------|
| formatter | String / Boolean | "thousands" | Formatter apply to the rendered amount value |
| amount | Integer |  10000 | Amount to reach |
| amountPerSecond | Integer | 150 | Number to increase the amount per second |
| continuous | Boolean | true | If true will keep counting after amount reach using amountPerSecond value |
| increment | Boolean | true | If true will increment from 0 to the amount. If false the amount will be rendered |
| interval | Integer | 500 | Interval in ms of the tick |
| speed | Integer | 5 | Increase to speed up the reach time of the amount. |
| cssClass | String | "" | CSS class name to inject into the tile root element |
| top | String | "" | Content to inject into the top element of the tile |
| center | String | "" | Content to inject into the center element of the tile |
| bottom | String | "" | Content to inject into the bottom element of the tile | 