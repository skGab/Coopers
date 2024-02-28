import "./footer.scss";
import greenBG from "/img/footer_bgGreen.png";

const Footer = () => {
  return (
    <footer className="footer__container">
      <h3>Need help?</h3>
      <p>coopers@coopers.pro</p>
      <p className="size">© 2021 Coopers. All rights reserved.</p>
      <img src={greenBG} alt="Green detail" loading="lazy"/>
    </footer>
  );
};

export default Footer;
