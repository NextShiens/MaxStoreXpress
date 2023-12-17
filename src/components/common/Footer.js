
import React from "react";
import "./footer.css";
import PrivacyModal from "./PrivacyModal";
import YouTubeIcon from '@mui/icons-material/YouTube';
import GitHubIcon from '@mui/icons-material/GitHub';
import CopyrightIcon from '@mui/icons-material/Copyright';
import FacebookIcon from '@mui/icons-material/Facebook';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="item1">
                    <PrivacyModal />
                </div>

                <div className="item2">
                    <span style={{ paddingRight: 5 }}>Copyright </span>
                    <CopyrightIcon />{" "}
                    <span style={{ paddingLeft: 5 }}>
                        {new Date().getFullYear()} YourCompany. All Rights
                        Reserved.
                    </span>
                </div>
                <a
                    href="https://github.com/sudiptob2/simple-react-footer"
                    target="_blank"
                    className="item3"
                >
                    <GitHubIcon/>
                </a>
                <a
                    href="http://fb.com/sudiptob2"
                    target="_blank"
                    className="item4"
                >
                    <FacebookIcon />
                </a>
                <a
                    href="https://www.youtube.com/"
                    target="_blank"
                    className="item5"
                >
                    <YouTubeIcon />
                </a>

                {false && <PrivacyModal click={true} />}
            </div>
        </footer>
    );
};

export default Footer;