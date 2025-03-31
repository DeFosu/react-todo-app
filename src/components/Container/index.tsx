import React, { ReactHTMLElement } from "react";

type ContainerProps = React.ComponentPropsWithoutRef<"div">;

const Container: React.FC<ContainerProps> = ({
  children,
  className = "",
  ...props
}) => {
  const combinedClassName = `container mx-auto ${className}`.trim();

  return (
    <div className={combinedClassName} {...props}>
      {children}
    </div>
  );
};

export default Container;
