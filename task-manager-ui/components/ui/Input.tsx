import React from 'react';
import cn from 'classnames';

type InputProps = {
  label?: string;
  type: string;
} & React.ComponentProps<'input'>;

const Input = ({ label, type, ...props }: InputProps) => {
  return (
    <>
      <label
        htmlFor=""
        className="block text-sm font-semibold text-blue-800 w-full"
      >
        {label}
      </label>
      <div className="mt-2 w-full">
        <input
          className={cn(
            'block rounded-md w-full bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm',
            props.className
          )}
          type={type}
          {...props}
        />
      </div>
    </>
  );
};
export default Input;
