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

## Markup generated

```html

<div class="inc-tile ${cssClass}">
    <div class="inc-tile-top">${top}</div>
    <div class="inc-tile-center">
        <span>${centerPrefix}</span>
        <span class="inc-tile-amount">
            ${increment ? 0 : IncrementingTile.format(amount, this.settings.formatter)}
        </span>
        <span>${centerSuffix}</span>
    </div>
    <div class="inc-tile-bottom">${bottom}</div>
</div>

```

## Options

| Property        | Type           | Default  | Description |
| -------------- |:--------------:| --------:| :------------|
| formatter | String / Boolean | "thousands" | Formatter apply to the rendered amount value. Available thousands or short (K,M,B) |
| amount | Integer |  10000 | Amount to reach |
| amountAtStart | Integer |  0 | Amount to start incrementing from |
| amountPerSecond | Integer | 150 | Number to increase the amount per second |
| continuous | Boolean | true | If true will keep counting after amount reach using amountPerSecond value |
| increment | Boolean | true | If true will increment from 0 to the amount. If false the amount will be rendered |
| interval | Integer | 500 | Interval in ms of the tick |
| speed | Integer | 5 | Increase to speed up the reach time of the amount. |
| cssClass | String | "" | CSS class name to inject into the tile root element |
| top | String | "" | Content to inject into the top element of the tile |
| centerPrefix | String | "" | Text/HTML to inject into the center element in front of the number |
| centerSuffix | String | "" | Text/HTML to inject into the center element after the number |
| bottom | String | "" | Content to inject into the bottom element of the tile |