import Brain from "./assets/brain.svg";
import Laptop from "./assets/dhakira-laptop.png";
import Mobile from "./assets/dhakira-mobile.png";
import Phone from "./assets/dhakira-phone.png";
import Notif from "./assets/notif.png";
import Qrcode from "./assets/qrcode.png";
import Rectangle from "./assets/Rectangle 120.svg";
import { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <>
      <Navbar />
      <Landing />
      <AboutUs />
      <App />
    </>
  );
}

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navItems = [
    { link: "AUTISM", path: "autism" },
    { link: "ALZHEIMER", path: "alzheimer" },
    { link: "ABOUT", path: "#about" },
    { link: "APP", path: "#app" },
  ];

  return (
    <header
      className={`w-full bg-[#00E5BD] rounded-b-[30px] fixed top-0 left-0 right-0 ${
        isSticky ? "hidden duration-300" : ""
      }`}
    >
      <nav className="py-4 lg:px-4">
        <div className="flex justify-between items-center text-base gap-8">
          <Link
            to="/"
            className="text-2xl font-semibold flex items-center space-x-3"
          >
            <img
              src={Brain}
              alt=""
              className="w-10 inline-block items-center"
            />
            <span className="text-white">DHAKIRA</span>
          </Link>

          <ul className="lg:flex space-x-12 hidden items-center">
            {navItems.map(({ link, path }) => (
              <li key={path}>
                <a
                  href={`${path}`}
                  className="block cursor-pointer lg:flex items-center text-base text-white hover:text-white first:font-medium"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>

          <div className="space-x-12 hidden lg:flex items-center">
            <Link
              to="/dashboard"
              className="hidden text-Poppins lg:flex items-center text-white hover:text-black"
            >
              DASHBOARD
            </Link>
            <Button as={Link} to="login">
              SIGN IN
            </Button>
          </div>

          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="focus:outline-none focus:text-black"
            >
              {isMenuOpen ? (
                <FaTimes className="h-6 w-6 mx-2 text-black" />
              ) : (
                <FaBars className="h-6 w-6 mx-2 text-black" />
              )}
            </button>
          </div>
        </div>

        <div
          className={`space-y-4 px-4 mt-16 py-7 bg-[#00E5BD] ${
            isMenuOpen
              ? "block fixed rounded-[30px] top-3 right-0 left-0"
              : "hidden"
          }`}
        >
          {navItems.map(({ link, path }) => (
            <Link
              to={path}
              spy={true}
              offset={-100}
              key={path}
              className="block text-base text-black"
            >
              {link}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
};

// eslint-disable-next-line react/prop-types
const Button = ({ as: Component = "button", ...rest }) => {
  return <Component className="button" {...rest} />;
};

const Landing = () => {
  return (
    <div className="md:px-14 px-4 py-16 max-w-screen-2xl mx-auto">
      <div className="text-center my-8">
        <h2 className="text-6xl text-black font-bold mb-2">DHAKIRA</h2>
        <p className="text-black ">OUR SOLUTION TO YOUR PROBLEM</p>
      </div>

      <div className="my-12 flex justify-center">
        <img src={Phone} alt="" />
      </div>
    </div>
  );
};

const AboutUs = () => {
  return (
    <div id="about">
      <div className="mx-auto flex flex-row md:flex-row justify-between items-center gap-12">
        <div className="md:w-3/5 mx-auto px-10">
          <h2 className="text-4xl text-[#00E5BD] drop-shadow-lg font-bold mb-4">
            gratuit. efficace.
          </h2>
          <h2 className="text-4xl text-[#00E5BD] drop-shadow-lg font-bold mb-4">
            efficace.
          </h2>
          <p>
            lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
            lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
            lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
            lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
            lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
            lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
            lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
            lorem lorem lorem lorem
          </p>
        </div>
        <div>
          <img src={Laptop} alt="" className="w-100 object-right" />
        </div>
      </div>
      <div className="mx-auto flex flex-row md:flex-row justify-between items-center gap-12">
        <div className="md:w-3/5 mx-auto px-10">
          <h2 className="text-4xl text-[#00E5BD] drop-shadow-lg font-bold mb-4">
            gratuit. efficace.
          </h2>
          <h2 className="text-4xl text-[#00E5BD] drop-shadow-lg font-bold mb-4">
            efficace.
          </h2>
          <p>
            lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
            lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
            lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
            lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
            lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
            lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
            lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem lorem
            lorem lorem lorem lorem
          </p>
        </div>
        <div>
          <img src={Notif} alt="" className="w-90" />
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div id="app">
      <div className="md:w-3/5 px-10 flex-col">
        <h2 className="text-4xl text-[#00E5BD] drop-shadow-lg font-bold mb-4">
          CONNECT,
        </h2>
        <h2 className="text-4xl text-[#00E5BD] drop-shadow-lg font-bold mb-4">
          ASSIST,
        </h2>
        <h2 className="text-4xl text-[#00E5BD] drop-shadow-lg font-bold mb-4">
          REMEMBER.
        </h2>
        <p className="font-bold">
          Improving Social Skills Together: Your Trusted Dhakira !
        </p>
      </div>
      <div className="flex">
        <div className="md:w-3/5 p-10 flex-col">
          <img src={Qrcode} alt="" className="w-60" />
          <p className="text-wrap w-40 py-4">
            Scannez le code pour telecherger l’app sur votre telephone
          </p>
        </div>
        <div className="flex">
          <img src={Mobile} alt="" className="w-80 absolute z-10 right-20" />
          <img src={Rectangle} alt="" className="z-0" />
        </div>
      </div>
      <footer className="bg-[#4CFF69] h-20 flex justify-start">
        <div className="flex flex-row ">
          <p className="p-5">phone: +213xxxxxx</p>
          <p className="p-5">email: rn.mkanch@metsqsonach.dz </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
