// src/components/Flutuante.tsx
import React from 'react';

const Flutuante = () => {
  return (
    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 md:fixed md:left-0 md:top-1/2 md:-translate-y-1/2 md:translate-x-0 animate-flutuar">
  <img
    src="/images/hatsune.png" 
    alt="Hatsune Miku Flutuante"
    className="md:mx-28 max-w-[7rem] md:max-w-[150px] xl:max-w-[300px] h-auto" // Grande normal e menor em 'xl'
  />
      <style jsx>{`
        @keyframes flutuar {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0);
          }
        }

        .animate-flutuar {
          animation: flutuar 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Flutuante;
