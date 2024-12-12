import { ReactNode, forwardRef } from "react";

interface ContainerProps {
  className?: string;
  children: ReactNode;
}

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`flex flex-col gap-8 max-w-7xl mx-auto ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = "Container";

export default Container;