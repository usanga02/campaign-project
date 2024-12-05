import React, { InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  value?: string;
  placeholder?: string;
}

const Input = ({ label, name, value, placeholder, ...rest }: Props) => {
  return (
    <div className="flex flex-col space-y-1">
      <label>{label}</label>
      <input
        className="border border-slate-700 rounded-sm w-full text-slate-800 font-bold px-4 py-2"
        name={name}
        value={value}
        placeholder={placeholder}
        {...rest}
      />
    </div>
  );
};

export default Input;
