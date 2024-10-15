import './Footer.css';
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
    return (
        <div className="footer-footer">
            <div className='personal-div-links'>
                Chris Hubbard
                <a target='_blank' rel="noreferrer" href='https://github.com/chrishubbard62' ><FaGithub /></a>
                <a target='_blank' rel="noreferrer" href='https://www.linkedin.com/in/chris-hubbard-93409324/' ><FaLinkedin /></a>
            </div>
            <div className='personal-div-links'>
                Gerardo Bonilla Jr
                <a target='_blank' rel="noreferrer" href='https://github.com/Lalo-B' ><FaGithub /></a>
                <a target='_blank' rel="noreferrer" href='https://www.linkedin.com/in/gerardo-bonilla-jr-47453b1bb/' ><FaLinkedin /></a>
            </div>
            <div className='personal-div-links'>
                Yicheng Wang
                <a target='_blank' rel="noreferrer" href='https://github.com/lunaako' ><FaGithub /></a>
                <a target='_blank' rel="noreferrer" href='https://www.linkedin.com/in/yicheng-wang-b43604261/' ><FaLinkedin /></a>
            </div>
        </div>
    )
}
export default Footer;
