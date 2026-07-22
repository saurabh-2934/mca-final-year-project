import { Link } from "react-router-dom";
function Footer() {
  return (
    <footer className="w-full footer bg-stone-900 text-white py-6 px-4 md:px-32">
      <div className="flex flex-col md:flex-row justify-between mb-4">
        <ul className="flex flex-col items-start mb-4 md:mb-0 ">
          <li className="mb-2 text-gray-400">About</li>
          <Link to="/contact_us">
            <li>Contact Us</li>
          </Link>
          <Link to="/about_us">
            <li>About Us</li>
          </Link>
          <Link to="/our_stories">
            <li>Our Stories</li>
          </Link>
        </ul>
        <ul className="flex flex-col items-start mb-4 md:mb-0 ">
          <li className="mb-2 text-gray-400">Help</li>
          <Link to="/payment">
            <li>Payment</li>
          </Link>
          <Link to="/shipping">
            <li>Shipping</li>
          </Link>
          <Link to="/cancellation_returns">
            <li>Cancellations & Returns</li>
          </Link>
          <Link to="/FAQ's">
            <li>FAQ</li>
          </Link>
        </ul>
        <ul className="flex flex-col items-start mb-4 md:mb-0 ">
          <li className="mb-2 text-gray-400">Consumer Policy</li>
          <Link to="/terms_of_use">
            <li>Terms of Use</li>
          </Link>
          <Link to="/privacy">
            <li>Privacy</li>
          </Link>
          <Link to="/security">
            <li>Security</li>
          </Link>
        </ul>
      </div>
      <hr className="w-full" />
      <p>&copy; 2023 My Store. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
