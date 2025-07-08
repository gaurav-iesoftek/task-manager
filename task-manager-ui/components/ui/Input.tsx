import React from 'react';

type InputProps = {
  label: string;
  type: string;
} & React.ComponentProps<'input'>;

const Input = ({ label, type, ...props }: InputProps) => {
  return (
    <div>
      <label htmlFor="" className="block text-sm font-medium text-gray-900 text-left">
        {label}
      </label>
      <div className="mt-2">
        <input
          className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          type={type}
          {...props}
        />
      </div>
    </div>
  );
};
export default Input;
