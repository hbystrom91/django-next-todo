import { createStyles, makeStyles, useTheme } from "@material-ui/core";
import classnames from "classnames";
import React from "react";

interface SpacedProps {
  className?: string;
  spacing?: number;
  children?: React.ReactNode;
  component?: React.ElementType;
}

const useStyles = (marginTop: number) =>
  makeStyles(() => {
    return createStyles({
      root: {
        "& > * + *": {
          marginTop,
        },
      },
    });
  });

export default function Spaced({
  className = "",
  spacing: spacingUnit = 1,
  children,
  component: Component = "div",
  ...restProps
}: SpacedProps) {
  if (typeof spacingUnit !== "number") {
    throw new Error("<Spaced>: The prop spacing must be a number.");
  }

  const theme = useTheme();
  const spacing = theme.spacing(spacingUnit);

  const classes = useStyles(spacing)();

  return (
    <Component className={classnames(classes.root, className)} {...restProps}>
      {children}
    </Component>
  );
}
