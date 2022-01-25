import React from "react";
import { Route } from "../../react-router.native";

const renderRouter = (routers: any) => {
  const checkRoleRouter = routers.filter((item: any) => !item.isHide);

  return (
    <>
      {checkRoleRouter.map(({ exact, strict, path, title = "", params = {}, Component }, index) => (
        <Route
          key={index}
          exact={exact}
          strict={strict}
          path={path}
          render={(props) => <Component id={props.match.params.id} title={title} {...params} />}
        />
      ))}
    </>
  );
};

export default renderRouter;
