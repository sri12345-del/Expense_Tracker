import Mainheader from "./Mainheader";
import classes from "./layout.module.css"
import { useSelector } from "react-redux";

const Layout = (props) => {

  const theme=useSelector(state=>state.theme.theme)
  
  return (
    <div className={theme ? classes.light : classes.dark}>
      <Mainheader></Mainheader>
        <main>{props.children}</main>
        </div>
  );
};

export default Layout;
