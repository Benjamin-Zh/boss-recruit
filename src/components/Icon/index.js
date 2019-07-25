import React from 'react';
import cn from 'classnames';
import styles from './icon.module.scss';


const Icon = ({ picName, background, size, className, dropShadow }) => (
  <div
    className={cn(styles.container, className, { [styles.shadow]: dropShadow })}
    style={{ width: size, height: size, background }}
  >
    <div className={cn(styles.icon, styles[`pic-${picName}`])} />
  </div>
);

Icon.defaultProps = {
  background: 'transparent',
  size: 128,
  className: '',
  dropShadow: false,
};

export default Icon;
