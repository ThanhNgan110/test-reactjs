import clsx from 'clsx';

const Input = ({ className, type, value, onChange }) => {
  return (
    <input
      className={clsx('input', {
        [className]: !!className
      })}
      type={type}
      value={value}
      onChange={e => onChange(e)}
    />
  );
};

export default Input;
