

import LogoOttopia from "/src/assets/images/logos/logo_ottopia.png";
import { Link } from "react-router";

interface FullLogoProps {
  theme?: 'light' | 'dark';
}

const FullLogo = ({ theme = 'dark' }: FullLogoProps) => {
  return (
    <Link to={"/"} className="logo-link !bg-transparent !p-0 !rounded-none !shadow-none">
      <img src={LogoOttopia} alt="logo" className="block max-h-[36px] w-auto" />
    </Link>
  );
};

export default FullLogo;
