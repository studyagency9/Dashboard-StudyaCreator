import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

interface FloatingLabelInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  icon?: React.ReactNode;
  containerClassName?: string;
}

const FloatingLabelInput = React.forwardRef<HTMLInputElement, FloatingLabelInputProps>(
  ({ label, id, type = 'text', icon, containerClassName, ...props }, ref) => {
    const hasValue = props.value && String(props.value).length > 0;

    return (
      <div className={cn("relative", containerClassName)}>
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 peer-focus:text-primary-600 transition-colors">
            {icon}
          </div>
        )}
        
        <input
          ref={ref}
          id={id}
          type={type}
          className={cn(
            "w-full pt-5 pb-2 bg-transparent border-b-2 border-gray-200 text-gray-900 placeholder-transparent focus:outline-none focus:border-primary-500 transition-colors peer",
            icon ? "pl-10" : "pl-4",
          )}
          placeholder={label}
          {...props}
        />
        
        <label
          htmlFor={id}
          className={cn(
            "absolute top-1/2 -translate-y-1/2 text-gray-500 transition-all duration-300 ease-in-out pointer-events-none",
            icon ? "left-10" : "left-4",
            "peer-placeholder-shown:text-base peer-placeholder-shown:top-1/2",
            "peer-focus:text-xs peer-focus:top-2 peer-focus:text-primary-600",
            hasValue && "text-xs top-2"
          )}
        >
          {label}
        </label>
      </div>
    );
  }
);

export default FloatingLabelInput;
