import React from 'react';
import { Flex } from 'antd-mobile';

import styles from './not-found.module.scss';


class NotFound extends React.Component {
  render() {
    return (
      <div className="page-container all-center">
        <Flex direction="column" justify="center" align="center">
          <h1 className={styles.title}>404</h1>
          <span className={styles.description}>Not Found</span>  
        </Flex>
      </div>
    );
  }
}

export default NotFound;
