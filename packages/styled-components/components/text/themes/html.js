/* eslint max-len: 0 */
import styled from 'styled-components';

const htmlVars = {
  '--nc-font-sans': '\'Inter\',-apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Oxygen, Ubuntu, Cantarell, \'Open Sans\', \'Helvetica Neue\', sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  '--nc-font-mono': 'Consolas, monaco, \'Ubuntu Mono\', \'Liberation Mono\', \'Courier New\', Courier, monospace',
  '--nc-tx-1': '#000000',
  '--nc-tx-2': '#1A1A1A',
  '--nc-bg-1': '#FFFFFF',
  '--nc-bg-2': '#F6F8FA',
  '--nc-bg-3': '#E5E7EB',
  '--nc-lk-1': '#0070F3',
  '--nc-lk-2': '#0366D6',
  '--nc-lk-tx': '#FFFFFF',
  '--nc-ac-1': '#79FFE1',
  '--nc-ac-tx': '#0C4047',
};

// eslint-disable import/prefer-default-export.
export const TextWrapper = styled.div`
  address,
  area,
  article,
  aside,
  audio,
  blockquote,
  datalist,
  details,
  dl,
  fieldset,
  figure,
  form,
  input,
  iframe,
  img,
  meter,
  nav,
  ol,
  optgroup,
  option,
  output,
  p,
  pre,
  progress,
  ruby,
  section,
  table,
  textarea,
  ul,
  video {
    // Margins for most elements.
    margin-bottom: 1rem;
  }

  input,select,button {
    // Set body font family and some finicky elements.
    font-family: ${htmlVars['--nc-font-sans']};
  }

  ::selection {
    // Set background color for selected text.
    background: ${htmlVars['--nc-ac-1']};
    color: ${htmlVars['--nc-ac-tx']};
  }

  p {
    color: ${htmlVars['--nc-tx-2']};
    font-family: ${htmlVars['--nc-font-sans']};
    font-size: 1.2rem;
    line-height: 1.4;
  }

  h1,h2,h3,h4,h5,h6 {
    line-height: 1;
    color: ${htmlVars['--nc-tx-1']};
    padding-top: .875rem;
  }

  h1,
  h2,
  h3 {
    color: ${htmlVars['--nc-tx-1']};
    padding-bottom: 2px;
    margin-bottom: 8px;
    border-bottom: 1px solid ${htmlVars['--nc-bg-2']};
  }

  h4,
  h5,
  h6 {
    margin-bottom: .3rem;
  }

  h1 {
    font-size: 2.25rem;
  }

  h2 {
    font-size: 1.85rem;
  }

  h3 {
    font-size: 1.55rem;
  }

  h4 {
    font-size: 1.25rem;
  }

  h5 {
    font-size: 1rem;
  }

  h6 {
    font-size: .875rem;
  }

  a {
    color: ${htmlVars['--nc-lk-1']};
  }

  a:hover {
    color: ${htmlVars['--nc-lk-2']};
  }

  i,
  em {
    font-style: italic;
  }

  b,
  strong {
    font-weight: bold;
  }

  abbr:hover {
    // Set the '?' cursor while hovering an abbreviation.
    cursor: help;
  }

  blockquote {
    padding: 1.5rem;
    background: ${htmlVars['--nc-bg-2']};
    border-left: 5px solid ${htmlVars['--nc-bg-3']};
  }

  abbr {
    cursor: help;
  }

  blockquote *:last-child {
    padding-bottom: 0;
    margin-bottom: 0;
  }

  a button,
  button,
  input[type="submit"],
  input[type="reset"],
  input[type="button"] {
    font-size: 1rem;
    display: inline-block;
    padding: 6px 12px;
    text-align: center;
    text-decoration: none;
    white-space: nowrap;
    background: ${htmlVars['--nc-lk-1']};
    color: ${htmlVars['--nc-lk-tx']};
    border: 0;
    border-radius: 4px;
    box-sizing: border-box;
    cursor: pointer;
    color: ${htmlVars['--nc-lk-tx']};
  }

  a button[disabled],
  button[disabled],
  input[type="submit"][disabled],
  input[type="reset"][disabled],
  input[type="button"][disabled] {
    cursor: default;
    opacity: .5;

    // Set the [X] cursor while hovering a disabled link.
    cursor: not-allowed;
  }

  .button:focus,
  .button:hover,
  button:focus,
  button:hover,
  input[type="submit"]:focus,
  input[type="submit"]:hover,
  input[type="reset"]:focus,
  input[type="reset"]:hover,
  input[type="button"]:focus,
  input[type="button"]:hover {
    background: ${htmlVars['--nc-lk-2']};
  }

  code,
  pre,
  kbd,
  samp {
    // Set the font family for monospaced elements.
    font-family: ${htmlVars['--nc-font-mono']};
  }

  code,
  samp,
  kbd,
  pre {
    // The main preformatted style. This is changed slightly across different cases..
    background: ${htmlVars['--nc-bg-2']};
    border: 1px solid ${htmlVars['--nc-bg-3']};
    border-radius: 4px;
    padding: 3px 6px;
    font-size: 0.9rem;
  }

  kbd {
    // Makes the kbd element look like a keyboard key.
    border-bottom: 3px solid ${htmlVars['--nc-bg-3']};
  }

  pre {
    padding: 1rem 1.4rem;
    max-width: 100%;
    overflow: auto;
  }

  pre code {
    // When <code> is in a <pre>, reset it's formatting to blend in.
    background: inherit;
    font-size: inherit;
    color: inherit;
    border: 0;
    padding: 0;
    margin: 0;
  }

  code pre {
    // When <pre> is in a <code>, reset it's formatting to blend in.
    display: inline;
    background: inherit;
    font-size: inherit;
    color: inherit;
    border: 0;
    padding: 0;
    margin: 0;
  }

  details {
    // Make the <details> look more "clickable".
    padding: .6rem 1rem;
    background: ${htmlVars['--nc-bg-2']};
    border: 1px solid ${htmlVars['--nc-bg-3']};
    border-radius: 4px;
  }

  summary {
    // Makes the <summary> look more like a "clickable" link with the pointer cursor.
    cursor: pointer;
    font-weight: bold;
  }

  details[open] {
    // Adjust the <details> padding while open.
    padding-bottom: .75rem;
  }

  details[open] summary {
    // Adjust the <details> padding while open.
    margin-bottom: 6px;
  }

  details[open]>*:last-child {
    // Resets the bottom margin of the last element in the <details> while <details> is opened. This prevents double margins/paddings..
    margin-bottom: 0;
  }

  dt {
    font-weight: bold;
  }

  dd::before {
    // Add an arrow to data table definitions.
    content: '→ ';
  }

  hr {
    // Reset the border of the <hr> separator, then set a better line.
    border: 0;
    border-bottom: 1px solid ${htmlVars['--nc-bg-3']};
    margin: 1rem auto;
  }

  fieldset {
    margin-top: 1rem;
    padding: 2rem;
    border: 1px solid ${htmlVars['--nc-bg-3']};
    border-radius: 4px;
  }

  legend {
    padding: auto .5rem;
  }

  table {
    // border-collapse sets the table's elements to share borders, rather than floating as separate "boxes"..
    border-collapse: collapse;
    width: 100%
  }

  td,
  th {
    border: 1px solid ${htmlVars['--nc-bg-3']};
    text-align: left;
    padding: .5rem;
  }

  th {
    background: ${htmlVars['--nc-bg-2']};
  }

  tr:nth-child(even) {
    // Set every other cell slightly darker. Improves readability..
    background: ${htmlVars['--nc-bg-2']};
  }

  table caption {
    font-weight: bold;
    margin-bottom: .5rem;
  }

  textarea {
    // Don't let the <textarea> extend off the screen naturally or when dragged by the user.
    max-width: 100%;
  }

  ol,
  ul {
    // Replace the browser default padding.
    padding-left: 2rem;
  }

  ul {
    list-style: disc outside none;
  }

  ol {
    list-style: upper-roman outside none;
  }

  li {
    margin-top: .4rem;
  }

  ul ul,
  ol ul,
  ul ol,
  ol ol {
    margin-bottom: 0;
  }

  mark {
    padding: 3px 6px;
    background: ${htmlVars['--nc-ac-1']};
    color: ${htmlVars['--nc-ac-tx']};
  }

  textarea,
  select,
  input {
    padding: 6px 12px;
    margin-bottom: .5rem;
    background: ${htmlVars['--nc-bg-2']};
    color: ${htmlVars['--nc-tx-2']};
    border: 1px solid ${htmlVars['--nc-bg-3']};
    border-radius: 4px;
    box-shadow: none;
    box-sizing: border-box;
  }

  img,
  figure {
    max-width: 100%;
  }
`;
// eslint-enable.
