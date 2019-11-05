CSS Grid Cell helper component. Accepts props based on the [CSS Grid spec](https://developer.mozilla.org/en-US/docs/Web/CSS/grid) and maps those props to CSS styles with basic flexbox fallbacks for IE11. Uses the `columnSpan()` and `rowSpan()` utility functions located in `styles/utils/cssGrid.js` to output the CSS.

`<GridCell>` must be a child of the `<GridContainer>` component.

If no props are passed to a `<GridCell>` component it will be auto placed, spanning 1 column and 1 row.

The example below uses both the `<GridContainer>` component and the `<GridCell>` component, since they should be used together.
```js
import GridContainer from './container';

// Demo CSS to show grid cells and tracks, not needed for actual use
const cellStyles = {
	alignItems: 'center',
	backgroundColor: '#eee',
	border: 'solid 1px #ccc',
	boxSizing: 'border-box',
	color: '#555',
	fontFamily: 'sans-serif',
	fontSize: '12px',
	display: 'flex',
	height: '100%',
	justifyContent: 'center',
	padding: '10px',
};

<GridContainer>
	<GridCell
		columns={[1, 4]}
		rows={[1, 2]}
		responsiveStyles={[
			{
				breakpoint: 'mdMin',
				columns: [1, 4],
				rows: [1, 4],
			}
		]}
		style={cellStyles}
	>
		Grid cell 1
	</GridCell>
	<GridCell
		responsiveStyles={[
			{
				breakpoint: 'mdMin',
				columns: [4, 6],
				rows: [1, 3],
			}
		]}
		style={cellStyles}
	>
		Grid cell 2
	</GridCell>
	<GridCell style={cellStyles}>Grid cell 3</GridCell>
	<GridCell style={cellStyles}>Grid cell 4</GridCell>
	<GridCell style={cellStyles}>Grid cell 5</GridCell>
	<GridCell style={cellStyles}>Grid cell 6</GridCell>
	<GridCell style={cellStyles}>Grid cell 7</GridCell>
	<GridCell style={cellStyles}>Grid cell 8</GridCell>
	<GridCell style={cellStyles}>Grid cell 9</GridCell>
	<GridCell style={cellStyles}>Grid cell 10</GridCell>
	<GridCell style={cellStyles}>Grid cell 11</GridCell>
	<GridCell style={cellStyles}>Grid cell 12</GridCell>
	<GridCell style={cellStyles}>Grid cell 13</GridCell>
	<GridCell style={cellStyles}>Grid cell 14</GridCell>
	<GridCell style={cellStyles}>Grid cell 15</GridCell>
	<GridCell style={cellStyles}>Grid cell 16</GridCell>
	<GridCell style={cellStyles}>Grid cell 17</GridCell>
	<GridCell style={cellStyles}>Grid cell 18</GridCell>
	<GridCell style={cellStyles}>Grid cell 19</GridCell>
	<GridCell style={cellStyles}>Grid cell 20</GridCell>
</GridContainer>
```
