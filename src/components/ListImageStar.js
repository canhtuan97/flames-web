import React from "react";
import styled from "styled-components";

const ListImageStar = ({className, }) => {
  return (
    <div className={className}>
      <section>
          <div className="star star1"></div>
          <div className="star star2"></div>
          <div className="star star3"></div>
          <div className="star star4"></div>
      </section>
    </div>
  );
};
export default styled(ListImageStar)`
    position: absolute;
    width: 100%;
    height: 100%;
    section {
        position: absolute;
        width: 100%;
        height: 100%;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    section .star{
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        animation: animate 8s ease-in-out infinite;
     
    }
    section .star.star1{
        animation-delay: -0.2s;
        background: url('images/stars/star1.png')
    }
    section .star.star2{
        animation-delay: -1s;
        background: url('images/stars/star2.png')
    }
    section .star.star3{
        animation-delay: -2s;
        background: url('images/stars/star3.png')
    }
    section .star.star4{
        animation-delay: -2.2s;
        background: url('images/stars/star4.png')
    }
    @keyframes animate
    {
        0%, 20%, 40%, 60%, 80%, 100% 
        {
            opacity: 0;
        }

        10%, 30%, 50%, 60%, 80%, 100% 
        {
            opacity: 1;
        }
    }
`
