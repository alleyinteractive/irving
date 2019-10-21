CSS Grid Container helper component. See GridCell for a visual example.

The example below uses both the `<GridContainer>` component and the `<GridCell>` component, since they should be used together.

Accepts a `responsiveStyles` prop to allow different `grid-column`, `grid-row`, and `grid-gap` settings at different breakpoints.

Uses the `display`, `columnsEqual()`, `columnsCustom()`, `rowsEqual()`, and `rowsCustom()` utility functions located in `styles/utils/cssGrid.js` to output the CSS.
```js
import GridCell from './cell';

// Demo CSS to show grid cells and tracks, not needed for actual use
const cellStyles = {
	alignItems: 'center',
	backgroundColor: '#fefefe',
	boxSizing: 'border-box',
	color: '#999',
	fontFamily: 'sans-serif',
	fontSize: '12px',
	display: 'flex',
	height: '100%',
	justifyContent: 'center',
	padding: '10px',
	textAlign: 'center',
};

const containerStyles = {
	border: 'solid 1px #ccc',
	backgroundColor: '#eee',
	padding: '15px',
};

<GridContainer
	columns={8}
	rows={4}
	gap={40}
	responsiveStyles={[
		{
			breakpoint: 'lgMin',
			columns: 10,
			rows: 3,
		}
	]}
	style={containerStyles}
>
	<GridCell
		columns={[1, 4]}
		rows={[1, 2]}
		style={cellStyles}
	>
		Grid cell 1
	</GridCell>
	<GridCell style={cellStyles}>Grid cell 2</GridCell>
	<GridCell style={cellStyles}>Grid cell 3</GridCell>
	<GridCell style={cellStyles}>Grid cell 4</GridCell>
	<GridCell
		columns={[7, 9]}
		rows={[1, 4]}
		style={cellStyles}
	>
		Grid cell 5
	</GridCell>
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
