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
    /* Margins for most elements. */
    margin-bottom: 1rem;
  }

  input,
  select,
  button {
    /* Set body font family and some finicky elements. */
    font-family: ${htmlVars['--nc-font-sans']};
  }

  ::selection {
    /* Set background color for selected text. */
    background: ${htmlVars['--nc-ac-1']};
    color: ${htmlVars['--nc-ac-tx']};
  }

  p {
    color: ${htmlVars['--nc-tx-2']};
    font-family: ${htmlVars['--nc-font-sans']};
    font-size: 1.2rem;
    line-height: 1.4;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: ${htmlVars['--nc-tx-1']};
    line-height: 1;
    padding-top: 0.875rem;
  }

  h1,
  h2,
  h3 {
    border-bottom: 1px solid ${htmlVars['--nc-bg-2']};
    color: ${htmlVars['--nc-tx-1']};
    margin-bottom: 8px;
    padding-bottom: 2px;
  }

  h4,
  h5,
  h6 {
    margin-bottom: 0.3rem;
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
    font-size: 0.875rem;
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
    font-weight: 700;
  }

  abbr:hover {
    /* Set the '?' cursor while hovering an abbreviation. */
    cursor: help;
  }

  blockquote {
    background: ${htmlVars['--nc-bg-2']};
    border-left: 5px solid ${htmlVars['--nc-bg-3']};
    padding: 1.5rem;
  }

  abbr {
    cursor: help;
  }

  blockquote *:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
  }

  a button,
  button,
  input[type="submit"],
  input[type="reset"],
  input[type="button"] {
    background: ${htmlVars['--nc-lk-1']};
    border-radius: 4px;
    border: 0;
    box-sizing: border-box;
    color: ${htmlVars['--nc-lk-tx']};
    cursor: pointer;
    display: inline-block;
    font-size: 1rem;
    padding: 6px 12px;
    text-align: center;
    text-decoration: none;
    white-space: nowrap;
  }

  a button[disabled],
  button[disabled],
  input[type="submit"][disabled],
  input[type="reset"][disabled],
  input[type="button"][disabled] {
    cursor: default;
    /* Set the [X] cursor while hovering a disabled link. */
    cursor: not-allowed;
    opacity: 0.5;

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
    /* Set the font family for monospaced elements. */
    font-family: ${htmlVars['--nc-font-mono']};
  }

  code,
  samp,
  kbd,
  pre {
    /* The main preformatted style. This is changed slightly across different cases.. */
    background: ${htmlVars['--nc-bg-2']};
    border-radius: 4px;
    border: 1px solid ${htmlVars['--nc-bg-3']};
    font-size: 0.9rem;
    padding: 3px 6px;
  }

  kbd {
    /* Makes the kbd element look like a keyboard key. */
    border-bottom: 3px solid ${htmlVars['--nc-bg-3']};
  }

  pre {
    max-width: 100%;
    overflow: auto;
    padding: 1rem 1.4rem;
  }

  pre code {
    /* When <code> is in a <pre>, reset it's formatting to blend in. */
    background: inherit;
    border: 0;
    color: inherit;
    font-size: inherit;
    margin: 0;
    padding: 0;
  }

  code pre {
    /* When <pre> is in a <code>, reset it's formatting to blend in. */
    background: inherit;
    border: 0;
    color: inherit;
    display: inline;
    font-size: inherit;
    margin: 0;
    padding: 0;
  }

  details {
    /* Make the <details> look more "clickable". */
    background: ${htmlVars['--nc-bg-2']};
    border-radius: 4px;
    border: 1px solid ${htmlVars['--nc-bg-3']};
    padding: 0.6rem 1rem;
  }

  summary {
    /* Makes the <summary> look more like a "clickable" link with the pointer cursor. */
    cursor: pointer;
    font-weight: 700;
  }

  details[open] {
    /* Adjust the <details> padding while open. */
    padding-bottom: 0.75rem;
  }

  details[open] summary {
    /* Adjust the <details> padding while open. */
    margin-bottom: 6px;
  }

  details[open] > *:last-child {
    /* Resets the bottom margin of the last element in the <details> while <details> is opened. This prevents double margins/paddings.. */
    margin-bottom: 0;
  }

  dt {
    font-weight: 700;
  }

  dd::before {
    /* Add an arrow to data table definitions. */
    content: '→ ';
  }

  hr {
    /* Reset the border of the <hr> separator, then set a better line. */
    border-bottom: 1px solid ${htmlVars['--nc-bg-3']};
    border: 0;
    margin: 1rem auto;
  }

  fieldset {
    border-radius: 4px;
    border: 1px solid ${htmlVars['--nc-bg-3']};
    margin-top: 1rem;
    padding: 2rem;
  }

  legend {
    padding: auto 0.5rem;
  }

  table {
    /* border-collapse sets the table's elements to share borders, rather than floating as separate "boxes".. */
    border-collapse: collapse;
    width: 100%;
  }

  td,
  th {
    border: 1px solid ${htmlVars['--nc-bg-3']};
    padding: 0.5rem;
    text-align: left;
  }

  th {
    background: ${htmlVars['--nc-bg-2']};
  }

  tr:nth-child(even) {
    /* Set every other cell slightly darker. Improves readability.. */
    background: ${htmlVars['--nc-bg-2']};
  }

  table caption {
    font-weight: 700;
    margin-bottom: 0.5rem;
  }

  textarea {
    /* Don't let the <textarea> extend off the screen naturally or when dragged by the user. */
    max-width: 100%;
  }

  ol,
  ul {
    /* Replace the browser default padding. */
    padding-left: 2rem;
  }

  ul {
    list-style: disc outside none;
  }

  ol {
    list-style: upper-roman outside none;
  }

  li {
    margin-top: 0.4rem;
  }

  ul ul,
  ol ul,
  ul ol,
  ol ol {
    margin-bottom: 0;
  }

  mark {
    background: ${htmlVars['--nc-ac-1']};
    color: ${htmlVars['--nc-ac-tx']};
    padding: 3px 6px;
  }

  textarea,
  select,
  input {
    background: ${htmlVars['--nc-bg-2']};
    border-radius: 4px;
    border: 1px solid ${htmlVars['--nc-bg-3']};
    box-shadow: none;
    box-sizing: border-box;
    color: ${htmlVars['--nc-tx-2']};
    margin-bottom: 0.5rem;
    padding: 6px 12px;
  }

  img,
  figure {
    max-width: 100%;
  }
`;
// eslint-enable.
