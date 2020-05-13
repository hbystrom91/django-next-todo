import { TextField } from "@material-ui/core";
import React from "react";
import { FieldRenderProps } from "react-final-form";

interface FFInputProps
  extends FieldRenderProps<string | number, HTMLInputElement> {
  element?: React.ElementType;
}

export default function FFInput({
  element: Element = TextField,
  input,
  meta,
  ...restProps
}: FFInputProps) {
  return <Element {...input} {...restProps} />;
}
