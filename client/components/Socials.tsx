import Link from "next/link";
import {
    FaFacebookSquare,
    FaInstagramSquare,
    FaTwitterSquare,
} from "react-icons/fa";
const Socials = () => {
    return (
        <div className="flex space-x-2">
            {/* all social links for connection and contact */}
            {/* facebook handle */}
            <Link href="/">
                <a>
                    <FaFacebookSquare className="social_icon facebook_color" />
                </a>
            </Link>
            {/* twitter handle */}
            <Link href="/">
                <a>
                    <FaTwitterSquare className="social_icon twitter_color" />
                </a>
            </Link>
            {/* instagram handle  */}
            <Link href="/">
                <a>
                    <FaInstagramSquare className="social_icon instagram_color" />
                </a>
            </Link>
        </div>
    );
};

export default Socials;
