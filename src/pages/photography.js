import TransitionEffect from '@/components/TransitionEffect';
import Head from 'next/head';
import React from 'react';
// Import foto
import foto1 from '../../public/images/projects/photography/1.jpg';
import foto2 from '../../public/images/projects/photography/2.jpg';
import foto3 from '../../public/images/projects/photography/3.jpg';
import foto4 from '../../public/images/projects/photography/4.jpg';
import foto5 from '../../public/images/projects/photography/5.jpg';
import foto6 from '../../public/images/projects/photography/6.jpg';
import foto7 from '../../public/images/projects/photography/7.jpg';
import foto8 from '../../public/images/projects/photography/8.jpg';
import foto9 from '../../public/images/projects/photography/9.jpg';
import foto10 from '../../public/images/projects/photography/10.jpg';
import Image from 'next/image';

const Photography = () => {
  return (
    <>
      <Head>
        <title>Zaportfolio | Photography</title>
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
                Photography
              </h4>
              <p className="text-muted text-lg leading-[30px]">
                The results of my photo during my internship at Fotohokkie{' '}
                <br />
                and maybe it will increase along with my hobby in photography
              </p>
            </div>
          </div>
        </div>

        {/* Gallery Design */}
        <div className=" px-10 pt-10 container grid grid-cols-3 gap-2 mx-auto">
          <div className="w-full rounded">
            <Image src={foto3} alt="fotography" />
          </div>
          <div className="w-full rounded">
            <Image src={foto5} alt="fotography" />
          </div>
          <div className="w-full rounded">
            <Image src={foto8} alt="fotography" />
          </div>
          <div className="w-full rounded">
            <Image src={foto2} alt="fotography" />
          </div>
          <div className="w-full rounded">
            <Image src={foto4} alt="fotography" />
          </div>
          <div className="w-full rounded">
            <Image src={foto7} alt="fotography" />
          </div>
          <div className="w-full rounded">
            <Image src={foto6} alt="fotography" />
          </div>
          <div className="w-full rounded">
            <Image src={foto9} alt="fotography" />
          </div>
          <div className="w-full rounded">
            <Image src={foto10} alt="fotography" />
          </div>
          <div className="w-full rounded">
            <Image src={foto5} alt="fotography" />
          </div>
          <div className="w-full rounded">
            <Image src={foto8} alt="fotography" />
          </div>
          <div className="w-full rounded">
            <Image src={foto1} alt="fotography" />
          </div>
        </div>
      </section>
    </>
  );
};

export default Photography;
