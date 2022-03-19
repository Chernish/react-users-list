import React, {FunctionComponent} from 'react';
import classNames from 'classnames';

import './Button.scss';

export type ButtonProps = {
  className?: string,
  children?: JSX.IntrinsicElements['button']['children'],
  green?: boolean,
  primary?: boolean,
  success?: boolean,
  onClickSort?: ({type, order}: { type: string, order: string }) => void,
  onClickReadOnly?: () => void,
  type?: any,
  order?: any,
  disabled?: boolean,
}

const Button: FunctionComponent<ButtonProps> = (
  {
    children,
    className,
    primary,
    onClickSort,
    type,
    order,
    onClickReadOnly,
    disabled,
    success
  }
) => {
  const buttonClick = () => {
    if (onClickSort) {
      onClickSort({type, order});
    }
    if (onClickReadOnly) {
      onClickReadOnly();
    }
  }
  return (
    <button disabled={disabled} className={classNames('button', className, {
      'button--primary': primary,
      'button--success': success,
    })}
            onClick={buttonClick}
    >
      {children}
    </button>
  );
};

export default Button;