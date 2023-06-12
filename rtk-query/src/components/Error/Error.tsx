import React, { FC } from 'react';

import styles from './Error.module.scss';

const Error: FC = () => {
  return (
    <p className={styles.error}>
      Oops! Something went wrong.
    </p>
  );
};

export default Error;
