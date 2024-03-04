import React from "react";
import PrivacyModal from "./PrivacyModal";
import { GitHub, Facebook, YouTube, LinkedIn } from "@mui/icons-material";
import XIcon from '@mui/icons-material/X';
const Footer = () => {
    return (
        <footer className="bg-gray-800 shadow-lg p-3 text-white">
            <div className="flex flex-row item-center justify-center gap-10 m-3">

            <a
                    href="https://github.com/Maxed-Store"
                    target="_blank"
                >
                    <GitHub
                        sx={{ fontSize: 31 }}
                        className="flex items-center justify-center text-[40px]  text-white  hover:text-black transition duration-400 rounded-lg"

                    />
                </a>

                <a
                    href="#"
                    target="_blank"
                >
                    <XIcon
                        sx={{ fontSize: 31 }}
                        className="flex items-center justify-center text-[40px]  text-white hover:text-black transition duration-400 rounded-lg"

                    />
                </a>
                <a
                    href="#"
                    target="_blank"
                >
                    <Facebook sx={{ fontSize: 31 }}
                        className="flex items-center justify-center text-[40px]  text-white hover:text-blue-700 transition duration-400 rounded-lg"
                    />  </a>
                <a
                    href="#"
                    target="_blank"
                >
                    <LinkedIn sx={{ fontSize: 31 }}
                        className="flex items-center justify-center text-[40px]  text-white hover:text-blue-700 transition duration-400 rounded-lg"
                    /></a> 
            </div>
            <div className=" mx-auto flex items-center justify-center">
                <div className="hover:text-blue-700 text-blue-500">  <PrivacyModal /></div>
                <div className="flex items-center justify-center">
                    <span className="pr-1"> &nbsp; &nbsp; &#169;</span>
                    <span className="pl-1">{new Date().getFullYear()} MaxStore. All Rights Reserved.</span>
                </div>

</div> </footer>
    );
};

export default Footer;
