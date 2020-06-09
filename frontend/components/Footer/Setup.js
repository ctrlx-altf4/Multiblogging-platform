import { FaFacebookSquare } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import { FaInstagram } from "react-icons/fa";
import { MdPerson } from "react-icons/md";
import { FaReadme } from "react-icons/fa";

export default [
  {
    title: "Facebook",
    onClickHistoryPush: "/",
    logoIcon: FaFacebookSquare,
  },
  {
    title: "Instagram",
    onClickHistoryPush: "/orders",
    logoIcon: FaInstagram,
  },
  {
    title: "Add",
    onClickHistoryPush: "/add",
    logoIcon: IoMdAddCircle,
  },
  {
    title: "More",
    onClickHistoryPush: "/chats",
    logoIcon: FaReadme,
  },
  {
    title: "Account",
    onClickHistoryPush: "/account",
    logoIcon: MdPerson,
  },
];
