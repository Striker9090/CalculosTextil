type InputsProps = React.InputHTMLAttributes<HTMLInputElement> & {
  children: React.ReactNode;
};

export function Inputs({ children, type, id, name, className = "", ...rest }: InputsProps) {
  const baseClass =
    type === "checkbox" || type === "radio"
      ? "appearance-none w-3 h-3 border-1 border-gray-400 rounded-full checked:bg-blue-500 checked:border-blue-500 focus:outline-none hover:curs"
      : "";

  return type === "checkbox" || type === "radio"? (
     <div className="items-center">
      <input
        name={name}
        id={id}
        type={type}
        {...rest}
        className={`${baseClass} ${className}`}
      />
      <label htmlFor={id}>{children}</label>
    </div>
):(<div className="flex items-center">
      <label htmlFor={id}>{children}</label>
           <input
        name={name}
        id={id}
        type={type}
        {...rest}
        className={`${baseClass} ${className}`}
      />
 
    </div>
)

}