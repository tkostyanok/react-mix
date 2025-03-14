import type { BasicButtonProps } from './BasicButtonProps';

import styles from './BasicButton.module.css';

/**
 * Basic Button with text.
 */
export const BasicButton = ({ props = {}, text }: BasicButtonProps) => {
  const { className, ...restProps } = props;

  return (
    <button
      className={`${className} ${styles.button}`}
      {...restProps}
    >
      {text}
    </button>
  );
};

export { BasicButton as default };
