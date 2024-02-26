"use client";

import React, { RefAttributes } from "react";
import ReactSelect, { GroupBase, MultiValue } from "react-select";

interface SelectProps {
  label: string;
  onChange: (value: string[]) => void;
  value?: string[] | undefined;
  disabled?: boolean;
  options?: Record<string, any>[];
}

const Select = ({ disabled, options, onChange, value, label }: SelectProps) => {
  return (
    <div className="z-[100]">
      <label className="block text-sm font-medium leading-6 text-gray-900">
        {label}
      </label>
      <ReactSelect
        isDisabled={disabled}
        isMulti
        onChange={onChange as (value: MultiValue<string>) => void}
        value={value}
        options={options as GroupBase<string>[]}
        menuPortalTarget={document.body}
        styles={{
          menuPortal: (base) => ({
            ...base,
            zIndex: 9999,
          }),
        }}
        classNames={{
          control: () => "text-sm",
        }}
      />
    </div>
  );
};

export default Select;
