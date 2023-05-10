import React from 'react';
// import image
import legal1 from '../../public/images/legal/legal1.jpg';
import legal2 from '../../public/images/legal/legal2.jpg';
import legal3 from '../../public/images/legal/legal3.jpg';
import legal4 from '../../public/images/legal/legal4.jpg';
import legal5 from '../../public/images/legal/legal5.jpg';
import legal6 from '../../public/images/legal/legal6.jpg';
import legal7 from '../../public/images/legal/legal7.jpg';

import Image from 'next/image';

const Certification = () => {
  return (
    <>
      <section
        className="pt-[100px] md:pt-[100px] pb-[90px] md:pb-[90px] relative"
        id="portfolio">
        <div className="container relative z-10">
          <div className="grid grid-cols-1">
            <div className="text-center max-w-[680px] mx-auto">
              <h4 className="md:text-[34px] text-[35px] leading-[1.25] mb-[23px] mt-1.5">
                Certification
              </h4>
              <p className="text-muted text-lg leading-[30px]">
                Certificates that are based on experience and are taken from
                free & paid online classes and then also take part in bootcamps
              </p>
            </div>
          </div>
        </div>

        {/* Gallery Design */}
        <div className=" px-10 pt-10 container grid grid-cols-3 gap-2 mx-auto">
          <div className="w-full rounded">
            <Image src={legal1} alt="Design" />
          </div>
          <div className="w-full rounded">
            <Image src={legal2} alt="Design" />
          </div>
          <div className="w-full rounded">
            <Image src={legal3} alt="Design" />
          </div>
          <div className="w-full rounded">
            <Image src={legal4} alt="Design" />
          </div>
          <div className="w-full rounded">
            <Image src={legal5} alt="Design" />
          </div>
          <div className="w-full rounded">
            <Image src={legal6} alt="Design" />
          </div>
          <div className="w-full rounded">
            <Image src={legal7} alt="Design" />
          </div>
        </div>
      </section>
    </>
  );
};

export default Certification;
