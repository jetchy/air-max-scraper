import React, { PropsWithChildren } from "react";
import classes from "./Container.module.css";

const Container: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  return (
    <div className={classes.container}>
      {children}
    </div>
  )
}

export default Container;