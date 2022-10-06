import Link from "next/link";
import React from "react";
import { useAppSelector } from "../../app/store";
import Socials from "../Socials";

const Divider = () => {
    return <hr className="bg-gray-100 opacity-50 mb-4 mt-2" />;
};

const aboutUs = ['About Us', 'Careers', 'Subscribe','Feedback'];
const help = ['Contact Us','Cookie Policy','FAQ', 'Privacy Policy', 'T&C'];

const Footer = () => {
    const categories = useAppSelector((state) => state.category.category);
    return (
        <footer className="bg-primary text-white pt-2">
            <section className="px-6 py-4">
                {/* socials  */}
                <Socials />
                <Divider />
                {/* all categories */}
                <div className="">
                    <h3 className="text-2xl text-white font-semibold opacity-90">
                        Categories
                    </h3>
                    <div className="flex space-x-3 py-3">
                        {categories?.map(({ name }, i) => (
                            <Link key={i} href={`/${name}`}>
                                <a className="text-gray-200 hover:opacity-80 tracking-wider text-small capitalize">
                                    {name}
                                </a>
                            </Link>
                        ))}
                    </div>
                </div>
                <Divider />
                {/* useful links  */}
                {/* out content  */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* logo  */}
                    <div className="space-y-2 px-4">
                        <Link href="/">
                            <a className="text-white">
                                <h1 className="text-3xl font-semibold">
                                    StateFlix
                                </h1>
                            </a>
                        </Link>
                        <p className="text-sm">Stateflix is a short news app which provide latest news in 70 words in Hindi or English Language. Read Breaking News on our Mobile App which is available on Google Play Store & Apple App Store.</p>
                    </div>
                    {/* about us  */}
                    <div className="px-4">
                      <h3 className="my-2">About Us</h3>
                          <ul className="space-y-2">
                              {aboutUs.map((item, i) => (
                                  <li key={i}>
                                      <Link href={`/${item}`}>
                                          <a className="text-gray-200 hover:opacity-80 tracking-wider text-sm capitalize">
                                              {item}
                                          </a>
                                      </Link>
                                  </li>
                              ))}
                          </ul>
                    </div>
                    {/* subscribe to our newsletter  */}
                </div>
            </section>
            {/* copyright and policies  */}
            <div className="bg-primary-dark grid grid-cols-1 md:grid-cols-2 gap-2 py-3">
                <div className="">
                    <h3 className="text-sm font-extralight text-white opacity-90 text-center">
                        Copyright © 2022 Stateflix. All Rights Reserved
                    </h3>
                </div>
                <div className="">
                  <ul className="flex justify-around">
                      {help.map((item, i) => (
                          <li key={i}>
                              <Link href={`/${item}`}>
                                  <a className="text-gray-200 hover:opacity-80 tracking-wider text-sm capitalize">
                                      {item}
                                  </a>
                              </Link>
                          </li>
                      ))}
                  </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
