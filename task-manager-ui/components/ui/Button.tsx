import cn from 'classnames';
const Button = ({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={cn(
        'cursor-pointer w-full rounded-md bg-indigo-600 px-3 py-1.5 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:text-sm',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
export default Button;
