import "./Header.css"
import { BiSearch } from "react-icons/bi"
import { FiChevronLeft, FiMessageSquare } from "react-icons/fi";
import { TbAnalyze, TbDashboard, TbFileUpload, TbMessage } from "react-icons/tb";
import { VscGraphLine } from "react-icons/vsc";
import { AiOutlineUsergroupAdd, AiOutlineDollarCircle, AiOutlineUserSwitch, AiOutlineUser,} from "react-icons/ai";
import { MdOutlineNotificationsActive, MdSwapHoriz,} from "react-icons/md";
import { RiAccountCircleLine, RiSettings6Line, RiSettingsLine } from "react-icons/ri";
import { BiMessageAltAdd, BiDotsHorizontalRounded,} from "react-icons/bi";
import { HiOutlineLogout, HiOutlineMoon } from "react-icons/hi";
import { IoAnalytics } from "react-icons/io5";


const Header = () => {

    return (
    <header className={`header`}>
        <div className="search-bar">
            <input type="text" placeholder="search..." />
            <BiSearch className="icon"/>
        </div>

        <div className="tools">
            <AiOutlineUser className="icon"/>
            <TbMessage className="icon"/>
            <IoAnalytics className="icon"/>

            <div className="divider"></div>

            <HiOutlineMoon className="icon"/>
            <RiSettingsLine className="icon"/>
            <HiOutlineLogout className="icon"/>

            <div className="divider"></div>

            <div className="user">
            <img src="https://plus.unsplash.com/premium_photo-1678197937465-bdbc4ed95815?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGVyc29ufGVufDB8fDB8fHww" alt="user-img" className="profile-img" />
            </div>
        </div>
    </header>
  )
}

export default Header