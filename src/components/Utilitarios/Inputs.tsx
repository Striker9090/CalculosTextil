type InputsProps = {
  children: React.ReactNode;
  id: string;
} & React.HTMLAttributes<HTMLLabelElement> &
  React.InputHTMLAttributes<HTMLInputElement>;

export function Inputs({ children, type, id, name, ...rest }: InputsProps) {
  if (type === "checkbox" || type === "radio") {
    return (
      <>
        <div>
          <input name={name} id={id} type={type} {...rest} />
          <label htmlFor={id}>{children}</label>
        </div>
      </>
    );
  }

  return (
    <>
      <div>
        <label htmlFor={id}>{children}</label>
        <input name={name} id={id} type={type} {...rest} />
      </div>
    </>
  );
}
