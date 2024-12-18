import React from "react";
import classNames from "classnames";

const Input = React.forwardRef(
  (
    {
      defaultValue,
      id,
      placeholder,
      type,
      className,
      size,
      maxLength,
      max,
      min,
      disabled,
      onChange,
      start,
      end,
      ...rest
    },
    ref
  ) => {
    const compClass = classNames({
      "z-10 w-full rounded-md text-sm/[1.125rem] bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-200 placeholder:text-slate-400 placeholder:dark:text-slate-500 border-slate-200 dark:border-slate-800 disabled:bg-slate-100 disabled:text-slate-400 focus:border-slate-200 focus:shadow-none focus:outline-none": true,
      ["py-2 text-sm"]: !size,
      ["rounded-s-none"]: start,
      ["rounded-e-none"]: end,
      [`${className}`]: className,
    });
    return (
      <div className="relative isolate flex w-full">
        {start && (
          <div className="inline-flex items-center rounded-s-md border border-e-0 border-slate-200 bg-slate-100 px-3 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
            {start}
          </div>
        )}
        <input
          ref={ref}
          className={compClass}
          type={type ? type : "text"}
          placeholder={placeholder && placeholder}
          id={id && id}
          maxLength={maxLength && maxLength}
          max={max && max}
          min={min && min}
          defaultValue={defaultValue && defaultValue}
          disabled={disabled && "disabled"}
          onChange={onChange}
          {...rest}
        />
        {end && (
          <div className="inline-flex items-center rounded-e-md border border-s-0 border-slate-200 bg-slate-100 px-3 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
            {end}
          </div>
        )}
      </div>
    );
  }
);

export default Input;
