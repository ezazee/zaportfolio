import React, { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import Lilcon from './Lilcon';

const Details = ({ name, time, info }) => {
  const ref = useRef(null);
  return (
    <li
      ref={ref}
      className="my-8 first:mt-8 last:mb-0 w-[60%] mx-auto flex flex-col items-center justify-between d:w-[80%]"
    >
      <Lilcon reference={ref} />
      <motion.div
        initial={{ y: 50 }}
        whileInView={{ y: 0 }}
        transition={{ duration: 0.5, type: 'spring' }}
      >
        <h3 className="text-2xl font-bold capitalize sm:text-xl xs:text-lg">
          {name}
        </h3>
        <span className="font-medium capitalize text-dark/75 xs:text-sm">
          {time}
        </span>
        <p className="w-full font-medium md:text-sm">{info}</p>
      </motion.div>
    </li>
  );
};

const Education = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center start'],
  });
  return (
    <div className="my-64">
      <h2 className="w-full font-bold text-center text-8xl mb-22 md:text-6xl xs:text-4xl md:mb-16">
        Education
      </h2>

      <div className="w-[75%] mx-auto relative lg:w-[90%] md:w-full">
        <motion.div
          style={{ scaleY: scrollYProgress }}
          ref={ref}
          className="absolute left-9 top-0 w-[4px] h-full bg-dark origin-top md:w-[2px] md:left-[30px] xs:left-[20px]"
        />
        <ul className="flex flex-col items-start justify-between w-full ml-4 xs:ml-2">
          <Details
            name="SDN Sukajaya 5"
            time="Unknown | Forgot :)"
            info="Like elementary schools in general...don't have any expertise in the world of IT and don't have any interest in IT"
          />
          <Details
            name="SMPN 3 Tarogong Kidul"
            time="Unknown | Forgot :)"
            info="Like junior high schools in general...don't have any expertise in the world of IT and don't have any interest in IT"
          />
          <Details
            name="SMKN 12 Garut"
            time="June 2017 - June 2020"
            info="attended high school by entering the Multimedia major, learning JavaScript logic, styling WordPress websites, etc. and joined the Cinematography club by making short films."
          />
        </ul>
      </div>
    </div>
  );
};

export default Education;
