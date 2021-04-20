import React from 'react';
import { Component as Link } from '.';

export default {
  component: Link,
  title: 'Styled Components/Link',
};

/**
 * Base example.
 */
export const PlainTextExample = () => <Link href="#">Hello World</Link>;

/**
 * Examples of <Link /> Using varying protocols and formats.
 */
export const VariousProtocols = () => (
  <>
    <ul>
      <li><Link href="https://google.com">Absolute Link</Link></li>
      <li><Link href="/about-us/">Relative Link</Link></li>
      <li><Link href="//google.com">No Protocol</Link></li>
      <li><Link href="https://google.com">Secure</Link></li>
      <li><Link href="http://google.com">Insecure</Link></li>
      <li><Link href="mailto:hello@irvingjs.com">Mailto:</Link></li>
      <li><Link href="tel:+18675309">Tel:</Link></li>
    </ul>
  </>
);