import React, { useState, useRef} from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
const LIST_ON = [
    {
        id: 1,
        image: "/images/list_on_1.png"
    },
    {
        id: 2,
        image: "/images/list_on_2.png"
    },
    {
        id: 3,
        image: "/images/list_on_3.png"
    },
    {
        id: 4,
        image: "/images/list_on_4.png"
    },
    {
        id: 5,
        image: "/images/list_on_5.png"
    },
]



const ListOn = ({className}) => {
  const settings = {
    speed: 3000,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 1000,
    centerMode: true,
    arrows: false,
    infinite: true,
    centerPadding: 100,
    responsive: [
        {
          breakpoint: 320,
          settings: { slidesToShow: 1, slidesToScroll: 1 }
        },
        {
          breakpoint: 768,
          settings: { slidesToShow: 1, slidesToScroll: 1 }
        },
        {
          breakpoint: 1024,
          settings: { slidesToShow: 3, slidesToScroll: 3 }
        }
      ]
  };

  return (
        <div className={className}>
            <Slider {...settings}>
            {
                LIST_ON.map((item, index) => (
                    <div key={index} className="item_list_on w-full h-full  items-center justify-center">
                        <img src={item?.image} className="image-slider"/>
                    </div>
                ))
            }
        </Slider>
        </div>
  );
};

export default styled(ListOn)`
    margin-top: 10px;
    .item_list_on {
        display: flex !important;
    }
    .image-slider {
        background-size: contain ;
    }
    .slick-slide {
        padding: 0 15px;
        height: 126px;
        display: flex;
    }

    .slick-list {
        margin: 0 2em;
    }
    .slick-track {

    }
`;


// import React, { useState, useRef} from 'react';
// import Slider from 'react-slick';
// const Parent = () => {
//     const settings = {
//         dots: false,
//         infinite: false,
//         speed: 500,
//         slidesToShow: 3,
//         slidesToScroll: 4,
//         arrows: false,
//     }
//     return (
//         <SimpleSlider settings={settings} />
//     )
// }
// export default Parent;

// const SimpleSlider = ({settings}) => {
//     const LIST_ON = [
//     {
//         id: 1,
//         image: "/images/list_on_1.png"
//     },
//     {
//         id: 2,
//         image: "/images/list_on_2.png"
//     },
//     {
//         id: 3,
//         image: "/images/list_on_3.png"
//     },
//     {
//         id: 4,
//         image: "/images/list_on_4.png"
//     },
//     {
//         id: 5,
//         image: "/images/list_on_3.png"
//     },
// ]
//     return (
//         <Slider {...settings}>
//             {
//                 LIST_ON.map((item, index) => (
//                     <div key={index} className="item_list_on w-full">
//                         <img src={item?.image}/>
//                     </div>
//                 ))
//             }
     
        
//       </Slider>
//     )
// }
