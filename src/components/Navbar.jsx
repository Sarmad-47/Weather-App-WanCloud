import { useEffect } from 'react';
import { MenuOutlined} from '@ant-design/icons';
import { Tooltip } from 'antd';
import avatar from '../assets/user.jpg'
import { useStateContext } from '../contexts/ContextProvider';
const NavButton = ({ title, customFunc, icon, color,activeMenu }) => (
    <Tooltip title={title}>
        <button
            type="button"
            onClick={() => customFunc()}
            style={{ color }}
            className={`relative text-xl rounded-full p-3 hover:bg-light-gray transition-all duration-300 ${activeMenu ? 'md:ml-40' : ''}`}
        >
            {icon}
        </button>
    </Tooltip>
);

const Navbar = () => {
    const { activeMenu, setActiveMenu,screenSize, setScreenSize,currentColor,backgroundColor} = useStateContext();
    const handleActiveMenu = () => setActiveMenu(!activeMenu);
    useEffect(() => {
        const handleResize = () => setScreenSize(window.innerWidth);
    
        window.addEventListener('resize', handleResize);
    
        handleResize();
    
        return () => window.removeEventListener('resize', handleResize);
      }, []);
    
      useEffect(() => {
        if (screenSize <= 900) {
          setActiveMenu(false);
        } else {
          setActiveMenu(true);
        }
      }, [screenSize]);

    return (
        <div className="flex justify-between p-2 relative" style={{backgroundColor:backgroundColor}}>
            <NavButton title="Menu" customFunc={handleActiveMenu} color={currentColor} icon={<MenuOutlined />} activeMenu={activeMenu} />
            <div className='flex items-center'>
                <p className="text-black font-bold ml-1 mt-5 text-lg md:text-xl lg:text-2xl xl:text-3xl">Weather App</p>
            </div>
            <div className='flex'>
                <Tooltip title="Profile">
                    <div className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg">
                        <img
                            className="rounded-full w-12 h-12"
                            src={avatar}
                            alt="user-profile"
                        />
                        <p>
                            <span className="text-gray-400 text-14">Hi,</span>
                            <span className="text-gray-400 font-bold ml-1 text-14">
                                Sarmad Ahmad
                            </span>
                        </p>
                    </div>
                </Tooltip>

            </div>
        </div>
    );
};

export default Navbar;
