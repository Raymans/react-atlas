import React, { PropTypes } from 'react';
import classNames from 'classnames/bind';
import style from './card.css';

/**
 * Simple Card component that wraps a div around content with card styling.
 */
const Card = ({children, className,...props}) => {
  const cx = classNames.bind(style);
  const classes = cx( className, {
    "card": true
  });

  return <div {...props} className={classes}>{children}</div>;
};

Card.propTypes = {
	/**
   * Any HTML element or React Component.
   * @examples <p>Some Text.</p>
   */
  children: PropTypes.node.isRequired
};

Card.defaultProps = {
  children: <p>Some card text.</p>
};

Card.styleguide = {
  category: 'Layout',
  index: '4.1'
};

export default Card;
