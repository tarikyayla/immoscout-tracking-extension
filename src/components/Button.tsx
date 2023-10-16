import { type FunctionalComponent } from "preact";
import cx from "classnames";
import { type JSXInternal } from "preact/src/jsx";

interface ButtonProps {
  isDisabled?: boolean;
  isLoading?: boolean;
  className?: string | string[];
  onClick?: JSXInternal.MouseEventHandler<HTMLButtonElement>;
}

export const Button: FunctionalComponent<ButtonProps> = ({
  className,
  isDisabled = false,
  isLoading = false,
  children,
  onClick
}) => {
  return (
    <button
      className={cx("button", className, {
        "loading-button": isLoading
      })}
      onClick={onClick}
      disabled={isLoading || isDisabled}
    >
      {!isLoading && children}
    </button>
  );
};
