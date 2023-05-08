import Layout from '@/components/Layout';
import Head from 'next/head';
import Image from 'next/image';
import profile from '../../public/images/profile/developer-pic-1.png';
import AnimasiText from '@/components/AnimasiText';
import Link from 'next/link';
import { LinkArrow } from '@/components/Icons';
import HireMe from '@/components/HireMe';
import TransitionEffect from '@/components/TransitionEffect';

export default function Home() {
  return (
    <>
      <Head>
        <title>Zaportfolio</title>
        <meta
          name="description"
          content="I am Mohamad Reza Reziyanto, I am a Freelancer from West Java, my expertise is in the digital field such as Design, Web Developer, Ui Ux Design, etc."
        />
      </Head>
      <TransitionEffect />
      <main className="flex items-center w-full min-h-screen text-dark">
        <Layout className="pt-0 md:p-16 sm:pt-8">
          <div className="flex items-center justify-between w-full lg:flex-col">
            <div className="w-1/2 md:w-full">
              <Image
                src={profile}
                alt="Zaportfolio"
                className="w-full h-auto lg:hidden md:inline-block md:w-full"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="flex flex-col items-center self-center w-1/2 lg:w-full lg:text-center">
              <AnimasiText
                text="Turning Dreams Into Reality With Code And Design."
                className="!text-6xl !text-left xl:!text-5xl lg:!text-center lg:!text-6xl md:!text-5xl sm:!text-3xl"
              />
              <p className="my-4 text-base font-medium dark:text-light md:text-sm sm:text-xs">
                Hi!, Im Reza ... As a Web Developer, I want to change my future
                with technology that is developing very fast
              </p>
              <div className="flex items-center self-start mt-2 lg:self-center">
                <Link
                  href="/CV.pdf"
                  target={'_blank'}
                  download={true}
                  className="flex items-center bg-dark text-light p-2.5 px-6 rounded-lg text-lg font-semibold hover:bg-light hover:text-dark border-2 border-solid border-transparent hover:border-dark dark:bg-light dark:text-dark hover:dark:bg-dark hover:dark:text-light hover:dark:border-light md:p-2 md:px-4 md:text-base">
                  Resume <LinkArrow className="w-6 ml-3" />
                </Link>
                <Link
                  href="https://wa.me/6281313711180"
                  className="ml-4 text-lg font-medium underline capitalize text-dark dark:text-light md:text-base"
                  target={'_blank'}>
                  Whatsapp
                </Link>
              </div>
            </div>
          </div>
        </Layout>

        <HireMe />
      </main>
    </>
  );
}
