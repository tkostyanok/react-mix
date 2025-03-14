import type { BasicInputProps } from './BasicInputProps';

import styles from './BasicInput.module.css';

/**
 * Basic text input.
 */
export const BasicInput = ({ props = {} }: BasicInputProps) => {
  const { className, ...restProps } = props;

  return (
    <input
      className={`${className} ${styles.input}`}
      type='text'
      {...restProps}
    />
  );
};

export { BasicInput as default };
