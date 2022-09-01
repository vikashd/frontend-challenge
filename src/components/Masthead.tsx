import Logo from "../img/Mortal-Kombat-Logo.png";

const Masthead: React.FC = () => (
  <div className="masthead">
    <img className="masthead__logo" src={Logo} alt="Mortal Kombat logo" />
  </div>
);

export { Masthead };
