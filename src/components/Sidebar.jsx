import { Link } from 'react-router-dom';
import { CloudOutlined, CloudUploadOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useStateContext } from '../contexts/ContextProvider';
const Sidebar = () => {
    const { activeMenu, setActiveMenu, screenSize, currentColor,sideBarColor } = useStateContext();
    const handleCloseSideBar = () => {
        if (activeMenu !== undefined && screenSize <= 900) {
            setActiveMenu(false);
        }
    };
    return (
        <div>
            <div className='flex justify-between items-center h-full' >
                <Menu
                    style={{backgroundColor:sideBarColor}}
                    mode="vertical"
                    onClick={handleCloseSideBar}
                    className="flex-grow h-full sidebar-menu">
                    <Menu.Item icon={<CloudOutlined />} title="Show Weather" style={{ backgroundColor: currentColor, color: 'white', fontWeight: 700 }}>
                        <Link to="/show-weather" >Show Weather</Link>
                    </Menu.Item>
                    <Menu.Item icon={<CloudUploadOutlined />} title="Search Weather" style={{ backgroundColor: currentColor, color: 'white', fontWeight: 700 }}>
                        <Link to="/search-weather">Search Weather</Link>
                    </Menu.Item>
                </Menu>
            </div>
        </div>
    );
};

export default Sidebar;
