import Link from 'next/link';
import React, { useState } from 'react';
import Logo from './Logo';
import { useRouter } from 'next/router';
import { InstagramIcon, GithubIcon, LinkedInIcon } from './Icons';
import { motion } from 'framer-motion';

const CustomLink = ({ href, title, className = '' }) => {
  const router = useRouter();
  return (
    <Link href={href} className={`${className} relative group`}>
      {title}

      <span
        className={` h-[1px] inline-block bg-dark absolute left-0 -bottom-0.5 group-hover:w-full transition-[width] ease-in-out duration-300 ${
          router.asPath === href ? 'w-full' : 'w-0'
        }`}>
        &nbsp;
      </span>
    </Link>
  );
};

const CustomMobileLink = ({ href, title, className = '', toggle }) => {
  const router = useRouter();
  const handleClick = () => {
    toggle();
    router.push(href);
  };
  return (
    <button
      href={href}
      className={`${className} relative group text-light my-2`}
      onClick={handleClick}>
      {title}

      <span
        className={` h-[1px] inline-block bg-light absolute left-0 -bottom-0.5 group-hover:w-full transition-[width] ease-in-out duration-300 ${
          router.asPath === href ? 'w-full' : 'w-0'
        }`}>
        &nbsp;
      </span>
    </button>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="relative flex items-center justify-between w-full px-32 py-8 font-medium lg:px-16 md:px-12 sm:px-8">
      <button
        className="flex-col items-center justify-center hidden lg:flex"
        onClick={handleClick}>
        <span
          className={`bg-dark block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
            isOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5 '
          }`}></span>
        <span
          className={`bg-dark block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${
            isOpen ? 'opacity-0' : 'opacity-100'
          }`}></span>
        <span
          className={`bg-dark block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
            isOpen ? '-rotate-45 -translate-y-1' : '-translate-y-0.5 '
          }`}></span>
      </button>

      {/* Dekstop */}
      <div className="flex items-center justify-between w-full lg:hidden">
        <nav>
          <CustomLink href="/" title="Home" className="mr-4" />
          <CustomLink href="/tentang" title="About Me" className="mx-4" />
          <CustomLink
            href="/code-project"
            title="Code Project"
            className="ml-4"
          />
          <CustomLink
            href="/design-project"
            title="Design Project"
            className="ml-4"
          />
          <CustomLink
            href="/photography"
            title="Photography"
            className="ml-4"
          />
        </nav>
        <nav className="flex flex-wrap items-center justify-center">
          <motion.a
            href="https://www.instagram.com/mrzsaa/?hl=id"
            target={'_blank'}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="w-6 mx-3">
            <InstagramIcon />
          </motion.a>
          <motion.a
            href="https://github.com/ezazee"
            target={'_blank'}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="w-6 mx-3">
            <GithubIcon />
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/mohamad-reza-65879b220/"
            target={'_blank'}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="w-6 ml-3">
            <LinkedInIcon />
          </motion.a>

          {/* <button
          onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
          className={`flex items-center justify-center p-1 ml-3 rounded-full ${
            mode === 'light' ? 'bg-dark text-light' : 'bg-light text-dark'
          }`}
        >
          {mode === 'dark' ? (
            <SunIcon className={'fill-dark'} />
          ) : (
            <MoonIcon className={'fill-dark'} />
          )}
        </button> */}
        </nav>
      </div>

      {/* Mobile */}
      {isOpen ? (
        <motion.div
          initial={{ scale: 0, opacity: 0, x: '-50%', y: '-50%' }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex items-center justify-between min-w-[70vw] flex-col fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 bg-dark/90 rounded-lg backdrop-blur-md py-32">
          <nav className="flex flex-col items-center justify-center">
            <CustomMobileLink href="/" title="Home" toggle={handleClick} />
            <CustomMobileLink
              href="/tentang"
              title="About Me"
              toggle={handleClick}
            />
            <CustomMobileLink
              href="/code-project"
              title="Code Project"
              toggle={handleClick}
            />
            <CustomMobileLink
              href="/design-project"
              title="Design Project"
              toggle={handleClick}
            />
            <CustomMobileLink
              href="/photography"
              title="Photography"
              toggle={handleClick}
            />
          </nav>
          <nav className="flex flex-wrap items-center justify-center">
            <motion.a
              href="https://www.instagram.com/mrzsaa/?hl=id"
              target={'_blank'}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="w-6 mx-3 sm:mx-1">
              <InstagramIcon />
            </motion.a>
            <motion.a
              href="https://github.com/ezazee"
              target={'_blank'}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="w-6 mx-3 rounded-full bg-light sm:mx-1">
              <GithubIcon />
            </motion.a>
            <motion.a
              href="https://www.linkedin.com/in/mohamad-reza-65879b220/"
              target={'_blank'}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.9 }}
              className="w-6 ml-3 sm:mx-1">
              <LinkedInIcon />
            </motion.a>

            {/* <button
          onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
          className={`flex items-center justify-center p-1 ml-3 rounded-full ${
            mode === 'light' ? 'bg-dark text-light' : 'bg-light text-dark'
          }`}
        >
          {mode === 'dark' ? (
            <SunIcon className={'fill-dark'} />
          ) : (
            <MoonIcon className={'fill-dark'} />
          )}
        </button> */}
          </nav>
        </motion.div>
      ) : null}

      {/* <div className="absolute left-[50%] top-2 translate-x-[-50%]"> */}
        {/* <Logo /> */}
      {/* </div> */}
    </header>
  );
};

export default Navbar;
