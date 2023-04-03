import AnimasiText from '@/components/AnimasiText';
import { GithubIcon } from '@/components/Icons';
import Layout from '@/components/Layout';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import TransitionEffect from '@/components/TransitionEffect';
// Import Image Web Repo
import portoweb1 from '../../public/images/projects/web/porto1.png';
import portoweb2 from '../../public/images/projects/web/porto2.png';
import portoweb3 from '../../public/images/projects/web/porto3.png';
import portoweb4 from '../../public/images/projects/web/porto4.png';
import portoweb5 from '../../public/images/projects/web/porto5.png';
import portoweb6 from '../../public/images/projects/web/porto6.png';
import portoweb7 from '../../public/images/projects/web/porto7.png';
import portoweb8 from '../../public/images/projects/web/porto8.png';
import portoweb9 from '../../public/images/projects/web/porto9.png';

// Import Image Flutter Native APP
import flutter1 from '../../public/images/projects/flutter/flutter1.png';
import { FlatTree } from 'framer-motion';

const FeaturedProject = ({ type, title, summary, img, link, github }) => {
  return (
    <article className="relative flex items-center justify-between w-full p-12 border border-solid shadow-2xl rounded-br-2xl rounded-3xl border-dark bg-light lg:flex-col lg:p-8 xs:rounded-2xl xs:rounded-br-3xl xs:p-4">
      <div className="absolute top-0 -right-3 -z-10 w-[100%] h-[103%] rounded-[2.5rem] bg-dark rounded-br-3xl xs:-right-2 sm:h-[102%] xs:w-full xs:rounded-[1.5rem]" />
      <Link
        href={link}
        target="_blank"
        className="w-1/2 overflow-hidden rounded-lg cursor-pointer lg:w-full"
      >
        <Image
          src={img}
          alt={title}
          className="w-full h-auto"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </Link>

      <div className="flex flex-col items-start justify-between w-1/2 pl-6 lg:w-full lg:pl-0 lg:pt-6">
        <span className="text-xl font-medium text-primary xs:text-base">
          {type}
        </span>
        <Link
          href={link}
          target="_blank"
          className="hover:underline underline-offset-3"
        >
          <h2 className="w-full my-2 text-4xl font-bold text-left sm:text-sm">
            {title}
          </h2>
        </Link>
        <p className="my-2 font-medium text-dark sm:text-sm">{summary}</p>
        <div className="flex items-center mt-2">
          <Link href={github} target="_blank" className="w-10">
            {' '}
            <GithubIcon />{' '}
          </Link>
          <Link
            href={link}
            target="_blank"
            className="p-2 px-6 ml-4 text-lg font-semibold rounded-lg bg-dark text-light sm:px-4 sm:text-base"
          >
            {' '}
            Visit Project
          </Link>
        </div>
      </div>
    </article>
  );
};

const Project = ({ title, type, img, link, github }) => {
  return (
    <article className="relative flex flex-col items-center justify-center w-full p-6 border border-solid rounded-2xl border-dark bg-light xs:p-4">
      <div className="absolute top-0 -right-3 -z-10 w-[100%] h-[103%] rounded-[2rem] bg-dark rounded-br-3xl md:-right-2 md:w-[101%] xs:h-[102%]xs:rounded-[1.5rem]" />
      <Link
        href={link}
        target="_blank"
        className="w-full overflow-hidden rounded-lg cursor-pointer"
      >
        <Image
          src={img}
          alt={title}
          className="w-full h-auto"
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </Link>

      <div className="flex flex-col items-start justify-between w-full mt-4">
        <span className="text-xl font-medium text-primary lg:text-lg md:text-base">
          {type}
        </span>
        <Link
          href={link}
          target="_blank"
          className="hover:underline underline-offset-3"
        >
          <h2 className="w-full my-2 text-3xl font-bold text-left lg:text-2xl">
            {title}
          </h2>
        </Link>
        <div className="flex items-center justify-between w-full mt-2">
          <Link
            href={link}
            target="_blank"
            className="text-lg font-semibold underline md:text-base"
          >
            {' '}
            Visit
          </Link>
          <Link href={github} target="_blank" className="w-8 md:w-6">
            {' '}
            <GithubIcon />{' '}
          </Link>
        </div>
      </div>
    </article>
  );
};

const project = () => {
  return (
    <>
      <Head>
        <title>Zaportfolio | Project</title>
        <meta
          name="description"
          content="I am Mohamad Reza Reziyanto, I am a Freelancer from West Java, my expertise is in the digital field such as Design, Web Developer, Ui Ux Design, etc."
        />
      </Head>
      <TransitionEffect />
      <main className="flex flex-col items-center justify-center w-full mb-16">
        {/* Coding Repo */}
        <Layout className="pt-16">
          <AnimasiText
            text="Coding Repo."
            className="mb-16 lg:!text-7xl sm:mb-8 sm:!text-6xl xs:!text-4xl"
          />
          <div className="grid grid-cols-12 gap-24 gap-y-32 xl:gap-x-16 lg:gap-x-8 md:gap-y-24 sm:gap-x-0">
            <div className="col-span-12">
              <FeaturedProject
                title="Website Profile Product"
                summary="Create a website profile for e-commerce products"
                link="https://nikila.id/"
                img={portoweb1}
                type="Website Profile"
                github="https://github.com/ezazee/nikilapol_laravel"
              />
            </div>
            <div className="col-span-6 sm:col-span-12">
              <Project
                title="Store GG Website TopUp (Front-End)"
                summary="Website for topup games with the Midtrans payment method"
                link="https://store-theta-seven.vercel.app/"
                img={portoweb2}
                type="Website TopUp Game"
                github="https://github.com/ezazee/-portfolio-store.git"
              />
            </div>
            <div className="col-span-6 sm:col-span-12">
              <Project
                title="Website Profile Mechine Product"
                summary="Create a website profile for Mechine E-Commerse products"
                link="https://nuku-sistem.id/"
                img={portoweb3}
                type="Website Profile"
                github="https://github.com/ezazee/NuKu.git"
              />
            </div>
            <div className="col-span-12">
              <FeaturedProject
                title="Website TikTok Clone App"
                summary="The tiktok website app clone website with google auth and sanity.io database"
                link="https://tiktak-weld.vercel.app/"
                img={portoweb4}
                type="Web App"
                github="https://github.com/ezazee/-portfolio-tiktak.git"
              />
            </div>
            <div className="col-span-6 sm:col-span-12">
              <Project
                title="Website Profile Product"
                summary="Create a website profile for e-commerce products"
                link="https://nyakubitung.com/"
                img={portoweb5}
                type="Website Profile"
                github="https://github.com/ezazee/nyakubitung"
              />
            </div>
            <div className="col-span-6 sm:col-span-12">
              <Project
                title="Website Personal Branding"
                summary="Website for personal branding and get some client"
                link="https://portonew.vercel.app/"
                img={portoweb6}
                type="Website Personal"
                github="https://github.com/ezazee/portfolio.git"
              />
            </div>
            <div className="col-span-12">
              <FeaturedProject
                title="Website Porfile Laundry"
                summary="Website for Branding Service Laundry"
                link="https://bcleanlaundry.vercel.app/"
                img={portoweb7}
                type="Web Profile"
                github="https://github.com/ezazee/-portfolio-laundry"
              />
            </div>
            <div className="col-span-6 sm:col-span-12">
              <Project
                title="Website Profile IT Company"
                summary="Website Profile for IT Company"
                link="https://mkd.nikila.id/"
                img={portoweb8}
                type="Website Profile"
                github="https://github.com/ezazee/-portfolio_company1.git"
              />
            </div>
            <div className="col-span-6 sm:col-span-12">
              <Project
                title="Website Product Barber App"
                summary="Website for Branding app Barber"
                link="https://pang-ling.vercel.app/"
                img={portoweb9}
                type="Website Personal"
                github="https://github.com/ezazee/-portfolio-product1"
              />
            </div>
          </div>
        </Layout>

        {/* Flutter App Repo */}
        <Layout className="pt-16">
          <AnimasiText
            text="Flutter & React Native App Repo."
            className="mb-16 lg:!text-7xl sm:mb-8 sm:!text-6xl xs:!text-4xl"
          />
          <div className="grid grid-cols-12 gap-24 gap-y-32 xl:gap-x-16 lg:gap-x-8 md:gap-y-24 sm:gap-x-0">
            <div className="col-span-12">
              <FeaturedProject
                title="Shamo Marketplace (Front-End)"
                summary="Marketplace App With Flutter"
                link="https://github.com/ezazee/-portfolio-flutter1"
                img={flutter1}
                type="Flutter App"
                github="https://github.com/ezazee/-portfolio-flutter1"
              />
            </div>
            <div className="col-span-6 sm:col-span-12">
              <Project
                title="NFT Store With React Native App"
                summary="NFT Store With React Native App"
                link="https://github.com/ezazee/-portfolio-react-native1"
                img={flutter1}
                type="React Native App"
                github="https://github.com/ezazee/-portfolio-react-native1"
              />
            </div>
            <div className="col-span-6 sm:col-span-12">
              <Project
                title="Indojek (Duplicate Gojek App)"
                summary="Duplicating Gojek App With Flutter"
                link="https://github.com/ezazee/-portfolio-flutter2"
                img={flutter1}
                type="Flutter App"
                github="https://github.com/ezazee/-portfolio-flutter2"
              />
            </div>
            <div className="col-span-6 sm:col-span-12">
              <Project
                title="Absence application from flutter"
                summary="Absence application from flutter"
                link="https://github.com/ezazee/-portfolio---AbsensiApp"
                img={flutter1}
                type="Flutter App"
                github="https://github.com/ezazee/-portfolio---AbsensiApp"
              />
            </div>
            <div className="col-span-6 sm:col-span-12">
              <Project
                title="Flutter UI Game Store"
                summary="Flutter UI Game Store"
                link="https://github.com/ezazee/-portfolio-flutter3"
                img={flutter1}
                type="Flutter App"
                github="https://github.com/ezazee/-portfolio-flutter3"
              />
            </div>
          </div>
        </Layout>
      </main>
    </>
  );
};

export default project;
