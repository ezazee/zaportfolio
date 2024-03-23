import AnimasiText from '@/components/AnimasiText';
import { GithubIcon } from '@/components/Icons';
import Layout from '@/components/Layout';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import TransitionEffect from '@/components/TransitionEffect';
// Import foto
import design1 from '../../public/images/projects/design/1.png';
import design2 from '../../public/images/projects/design/2.png';
import design3 from '../../public/images/projects/design/3.png';
import design4 from '../../public/images/projects/design/4.png';
import design5 from '../../public/images/projects/design/5.png';
import design6 from '../../public/images/projects/design/6.png';
import design7 from '../../public/images/projects/design/7.png';
import design8 from '../../public/images/projects/design/8.png';
import design9 from '../../public/images/projects/design/9.png';

// import UI Design
import ui1 from '../../public/images/projects/design/ui1.png';
import ui2 from '../../public/images/projects/design/ui2.png';
import ui3 from '../../public/images/projects/design/ui3.png';
import ui4 from '../../public/images/projects/design/ui4.png';
import ui5 from '../../public/images/projects/design/ui5.png';
import ui6 from '../../public/images/projects/design/ui6.png';
import ui7 from '../../public/images/projects/design/ui7.png';
import ui8 from '../../public/images/projects/design/ui8.png';
import ui9 from '../../public/images/projects/design/ui9.png';

const DesignProject = () => {
  return (
    <>
      <Head>
        <title>Zaportfolio | Design Project</title>
        <meta
          name="description"
          content="I am Mohamad Reza Reziyanto, I am a Freelancer from West Java, my expertise is in the digital field such as Design, Web Developer, Ui Ux Design, etc."
        />
      </Head>
      <TransitionEffect />
      <section
        className="pt-[100px] md:pt-[100px] pb-[90px] md:pb-[90px] relative"
        id="portfolio">
        <div className="container relative z-10">
          <div className="grid grid-cols-1">
            <div className="text-center max-w-[680px] mx-auto">
              <h4 className="md:text-[34px] text-[35px] leading-[1.25] mb-[23px] mt-1.5">
                Design Project
              </h4>
              <p className="text-muted text-lg leading-[30px]">
                A design project consisting of various aspects. Both in terms of
                clothing, printing design, merchandise, Instagram feeds etc.
                This design will continue to grow over time
              </p>
            </div>
          </div>
        </div>

        {/* Gallery Design */}
        <div className="container grid grid-cols-3 gap-2 px-10 pt-10 mx-auto ">
          <div className="w-full rounded">
            <Image src={design3} alt="Design" />
          </div>
          <div className="w-full rounded">
            <Image src={design2} alt="Design" />
          </div>
          <div className="w-full rounded">
            <Image src={design1} alt="Design" />
          </div>
          <div className="w-full rounded">
            <Image src={design4} alt="Design" />
          </div>
          <div className="w-full rounded">
            <Image src={design5} alt="Design" />
          </div>
          <div className="w-full rounded">
            <Image src={design6} alt="Design" />
          </div>
          <div className="w-full rounded">
            <Image src={design7} alt="Design" />
          </div>
          <div className="w-full rounded">
            <Image src={design8} alt="Design" />
          </div>
          <div className="w-full rounded">
            <Image src={design9} alt="Design" />
          </div>
        </div>
      </section>

      <section
        className="pt-[100px] md:pt-[100px] pb-[90px] md:pb-[90px] relative"
        id="portfolio">
        <div className="container relative z-10">
          <div className="grid grid-cols-1">
            <div className="text-center max-w-[680px] mx-auto">
              <h4 className="md:text-[34px] text-[35px] leading-[1.25] mb-[23px] mt-1.5">
                UI & UX Design Project
              </h4>
              <p className="text-muted text-lg leading-[30px]">
                UI & UX Design which consists of Web Design, Mobile Application
                Design and several Instagram feeds created by the UI UX Design
                software. This design will continue to grow over time
              </p>
            </div>
          </div>
        </div>

        {/* Gallery Design */}
        <div className="container grid grid-cols-3 gap-2 px-10 pt-10 mx-auto ">
          <div className="w-full rounded">
            <div className="w-full rounded">
              <Image src={ui1} alt="Design" />
            </div>
          </div>
          <div className="w-full rounded">
            <Image src={ui2} alt="Design" />
          </div>
          <div className="w-full rounded">
            <Image src={ui3} alt="Design" />
          </div>
          <div className="w-full rounded">
            <Image src={ui4} alt="Design" />
          </div>
          <div className="w-full rounded">
            <Image src={ui5} alt="Design" />
          </div>
          <div className="w-full rounded">
            <Image src={ui6} alt="Design" />
          </div>
          <div className="w-full rounded">
            <Image src={ui7} alt="Design" />
          </div>
          <div className="w-full rounded">
            <Image src={ui8} alt="Design" />
          </div>
          <div className="w-full rounded">
            <Image src={ui9} alt="Design" />
          </div>
        </div>
      </section>
    </>
  );
};

export default DesignProject;
