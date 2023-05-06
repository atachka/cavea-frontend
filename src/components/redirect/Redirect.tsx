import { useContext, useEffect } from "react";
import { NavigateContext } from "../../context";

export const Redirect = () => {
  const { navigate } = useContext(NavigateContext);

  useEffect(() => {
    navigate("/table?page=0");
  }, [navigate]);

  return <div></div>;
};
