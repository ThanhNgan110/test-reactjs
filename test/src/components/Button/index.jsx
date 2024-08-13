import clsx from 'clsx';

import './index.css';

const Button = ({
  className,
  variant,
  type,
  disabled,
  style,
  onClick,
  children
}) => {
  return (
    <button
      className={clsx('btn', {
        'btn-primary': variant === 'primary',
        'btn-secondary': variant === 'secondary',
        [className]: !!className
      })}
      style={style}
      type={type}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
