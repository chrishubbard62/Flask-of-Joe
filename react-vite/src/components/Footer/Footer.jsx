import './Footer.css';
import { FaGithub, FaLinkedin } from "react-icons/fa";
import '/lalo.jpg';
import '/yicheng.jpg';
import '/chris.jpg';

const Footer = () => {
    return (
        <div className="footer-footer">
            <div className='inner-footer-box'>
                <div className='personal-div-individual'>
                    <img className='personal-images' src='chris.jpg' />
                    <div className='personal-div-inner-text'>
                        Chris Hubbard
                        <div className='icons-for-individual'>
                            <a target='_blank' rel="noreferrer" href='https://github.com/chrishubbard62' ><FaGithub /></a>
                            <a target='_blank' rel="noreferrer" href='https://www.linkedin.com/in/chris-hubbard-93409324/' ><FaLinkedin /></a>
                        </div>
                    </div>
                </div>
                <div className='personal-div-individual'>
                    <img className='personal-images' src='lalo.jpg' />
                    <div className='personal-div-inner-text'>
                        Gerardo Bonilla Jr
                        <div className='icons-for-individual'>
                            <a target='_blank' rel="noreferrer" href='https://github.com/Lalo-B' ><FaGithub /></a>
                            <a target='_blank' rel="noreferrer" href='https://www.linkedin.com/in/gerardo-bonilla-jr-47453b1bb/' ><FaLinkedin /></a>
                        </div>
                    </div>
                </div>
                <div className='personal-div-individual'>
                    <img className='personal-images' src='yicheng.jpg' />
                    <div className='personal-div-inner-text'>
                        Yicheng Wang
                        <div className='icons-for-individual'>
                            <a target='_blank' rel="noreferrer" href='https://github.com/lunaako' ><FaGithub /></a>
                            <a target='_blank' rel="noreferrer" href='https://www.linkedin.com/in/yicheng-wang-b43604261/' ><FaLinkedin /></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Footer;
