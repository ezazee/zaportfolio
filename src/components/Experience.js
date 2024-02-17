import React, { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import Lilcon from "./Lilcon";

const Details = ({ position, company, time, address, work }) => {
  const ref = useRef(null);
  return (
    <li
      ref={ref}
      className="my-8 first:mt-8 last:mb-0 w-[60%] mx-auto flex flex-col items-center justify-between md:w-[80%]"
    >
      <Lilcon reference={ref} />
      <motion.div
        initial={{ y: 50 }}
        whileInView={{ y: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        <h3 className="text-2xl font-bold capitalize sm:text-xl xs:text-lg">
          {position}&nbsp;
          <span className="capitalize text-primary">@{company}</span>
        </h3>
        <span className="font-medium capitalize text-dark/75 xs:text-sm">
          {time} | {address}
        </span>
        <p className="w-full font-medium md:text-sm">{work}</p>
      </motion.div>
    </li>
  );
};

const Experience = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center start"],
  });
  return (
    <div className="my-64">
      <h2 className="w-full font-bold text-center text-8xl mb-22 md:text-6xl xs:text-4xl md:mb-16">
        Experience
      </h2>

      <div className="w-[75%] mx-auto relative lg:w-[90%] md:w-full">
        <motion.div
          style={{ scaleY: scrollYProgress }}
          ref={ref}
          className="absolute left-9 top-0 w-[4px] h-full bg-dark origin-top md:w-[2px] md:left-[30px] xs:left-[20px]"
        />
        <ul className="flex flex-col items-start justify-between w-full ml-4 xs:ml-2">
          <Details
            position="Photographer Studio"
            company="Fotohokkie"
            time="March 2019 - May 2019"
            address="Jl. Muhammadiyah No.14, Regol, Kec. Garut Kota, Kabupaten Garut, Jawa Barat"
            work="Intern as a studio photographer. Serving customers who want group photos, engagement, family, graduation, etc. for 3 months"
          />
          <Details
            position="Graphic Design"
            company="PT. Graha Kara Digital"
            time="September 2020 - November 2020"
            address="Jl. Pembangunan No.250, Sukagalih, Kec. Tarogong Kidul, Kabupaten Garut, Jawa Barat"
            work="Become a Basic Designer. Like making poster designs, shirt designs, logo designs, banner designs, etc"
          />
          <Details
            position="UI & UX Designer"
            company="PT. Graha Kara Digital"
            time="November 2020 - Mei 2021"
            address="Jl. Pembangunan No.250, Sukagalih, Kec. Tarogong Kidul, Kabupaten Garut, Jawa Barat"
            work="Create UI & UX mobile app designs for company products"
          />
          <Details
            position="IT Support Technician"
            company="PT. Graha Kara Digital"
            time="June 2021 - April 2022"
            address="Jl. Pembangunan No.250, Sukagalih, Kec. Tarogong Kidul, Kabupaten Garut, Jawa Barat"
            work="Become an IT Support for the company. Such as internet cable installation, printer repair, laptop and office computers"
          />
          <Details
            position="Junior Web Developer"
            company="PT. Graha Kara Digital"
            time="June 2021 - April 2022"
            address="Jl. Pembangunan No.250, Sukagalih, Kec. Tarogong Kidul, Kabupaten Garut, Jawa Barat"
            work="For the first time touching the world of coding, along with being an IT support. I became a Junior Web Developer by creating several product profile websites for companies"
          />
          <Details
            position="Junior Web Developer"
            company="PT. Eka Mandiri Asa Sejati"
            time="April 2022 - January 2023"
            address="Nifarro Park, ITS Tower, Jl. Raya Pasar Minggu No.18, RT.1/RW.1, Pejaten Timur, Ps. Minggu, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta"
            work="Become a web developer for companies by creating several website profiles, creating CMS for products, etc"
          />
          <Details
            position="Internship Design"
            company="PT. Hamengku Karya"
            time="August 2023 - September 2023"
            address="Jl. Pasung Grigis No.3, Padangsambian Kaja, Kec. Denpasar Bar., Kota Denpasar, Bali"
            work="Create UI designs for company Applications, Create print designs for promotions and others"
          />
        </ul>
      </div>
    </div>
  );
};

export default Experience;
