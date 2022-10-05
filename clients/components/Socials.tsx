import Link from "next/link";
import {
    FaFacebook,
    FaFacebookSquare,
    FaInstagram,
    FaInstagramSquare,
    FaTwitter,
    FaTwitterSquare,
} from "react-icons/fa";
export function SocialsLogos(){
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


export default function Socials() {
  return (
    <div className="flex space-x-24 py-3">
    {/* all social links for connection and contact */}
    {/* facebook handle */}
    <Link href="/">
        <a className="socials">
            <FaFacebook className="" />
            <span className="">Facebook</span>
        </a>
    </Link>
    {/* twitter handle */}
    <Link href="/">
        <a className="socials">
            <FaTwitter className="" />
            <span className="">Twitter</span>
        </a>
    </Link>
    {/* instagram handle  */}
    <Link href="/">
        <a className="socials">
            <FaInstagram className="" />
            <span className="">Instagram</span>
        </a>
    </Link>
</div>
  )
}

