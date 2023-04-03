import React from 'react';
import Layout from './Layout';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="w-full text-lg font-medium border-t-2 border-solid border-dark dark:text-light dark:border-light sm:text-base">
      <Layout className="flex items-center justify-between py-8 lg:flex-col lg:py-6">
        <span>{new Date().getFullYear()} &copy; All Rights Served </span>
        <div className="flex items-center lg:py-2">
          Build With{' '}
          <span className="px-1 text-2xl dark:text-primaryDark text-primary">
            {' '}
            &#9825;{' '}
          </span>
          by&nbsp;
          <Link
            href="https://www.instagram.com/mrzsaa/?hl=id"
            className="underline underline-offset-2"
          >
            {' '}
            Reza
          </Link>
        </div>
        <Link href="https://wa.me/6281313711180">Say Hi</Link>
      </Layout>
    </footer>
  );
};

export default Footer;
