import React, { forwardRef } from "react";

// eslint-disable-next-line react/display-name
export const Photo = forwardRef(
  ({ url, index, faded, style, ...props }, ref) => {
    const inlineStyles = {
      opacity: faded ? "0.2" : "1",
      transformOrigin: "0 0",
      height: index === 0 ? 410 : 200,
      gridRowStart: index === 0 ? "span 2" : null,
      gridColumnStart: index === 0 ? "span 2" : null,
      backgroundImage: `url("${url}")`,
      ...style,
    };

    return (
      <div ref={ref} style={inlineStyles} {...props}>
        {index}
      </div>
    );
  }
);
