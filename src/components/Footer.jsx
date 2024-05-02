import { useStateContext } from '../contexts/ContextProvider';
const Footer = () => {
  const {backgroundColor} = useStateContext();
  return (
  <div style={{backgroundColor:backgroundColor}}>
    <p className="dark:text-gray-900 text-black text-center m-20">
      © 2024 All rights reserved by WanClouds Inc
    </p>
  </div>
  );
};

export default Footer;