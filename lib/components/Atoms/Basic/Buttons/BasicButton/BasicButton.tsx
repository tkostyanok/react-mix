import type { BasicButtonProps } from './BasicButtonProps';

/**
 * Basic Button with text.
 */
export const BasicButton = ({ text, ...props }: BasicButtonProps) => {
  text = text || 'Save';

  return <button {...props}>{text}</button>;
};
