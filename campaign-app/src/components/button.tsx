import React, { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
}

const Button = ({
  children,
  onClick,
  disabled,
  variant = "primary",
}: Props) => {
  return (
    <div>
      <button
        className={`w-full pt-1 pb-1.5 px-4 rounded-sm mt-3 font-bold ${
          variant == "primary"
            ? ` bg-slate-600 text-white`
            : `bg-slate-300 text-slate-900`
        }`}
        disabled={disabled}
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
