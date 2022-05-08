import React, { useState, useRef} from 'react';
import styled from 'styled-components';
import { Row, Col } from 'antd';


const RoadMap = ({className}) => {

    const LIST_ROADMAP = [
        {
            id: 1,
            date: '',
            title: 'Lorem ipsum',
            postion: 1,
            image: '/images/road_map_left.png',
            descs: [
                'Research  defi and exchange ✅',
            ]
        },
        {
            id: 2,
            date: '',
            title: 'Lorem ipsum',
            postion: 2,
            image: '/images/road_map_right.png',
            descs: [
                'Build and extend develop ✅',
                'Website & Social media Launch ✅',
            ]
        },
        {
            id: 3,
            date: '',
            title: 'Lorem ipsum',
            postion: 1,
            image: '/images/road_map_left.png',
            descs: [
                'Airdrop  May 8 👉 July 8, 2022',
                'Pre sale May 8 👉 July 8, 2022',
                'Staking earn FFT with APY height on July 15, 2022',
                'Add liquidity on Pancakeswap on July 26, 2022',
            ]
        },
        {
            id: 4,
            date: '',
            title: 'Lorem ipsum',
            postion: 2,
            image: '/images/road_map_right.png',
            descs: [
                'SmartContract Audit on August 2022',
                'Bounty & Marketing on August 2022',
                'Exchange v1 on August 10, 2022',
                'Defi 2.0(bonding) on August 20, 2022',
            ]
        },
        {
            id: 5,
            date: '',
            title: 'Lorem ipsum',
            postion: 1,
            image: '/images/road_map_left.png',
            descs: [
                'Building the NFT Platform on September 2022',
                'Artists and high-quality projects settled in the platform on September 2022',
                'Cross chain token bridge Q1 2023'
            ]
        },
    ]

    const renderImage = (item) => {
        const classNameImage = item?.postion == 2 ? 'image-road-map absolute -left-3': 'image-road-map absolute -right-3'
        const classDate = item?.postion == 2 ? 'absolute top-0 bottom-0 justify-center flex flex-col items-center lg:right-11 md:right-3' : 'absolute top-0 bottom-0 justify-center flex flex-col items-center lg:left-6 md:left-3'
        return (
            <div className='relative w-full'>
                <div className={classNameImage}>
                    <img src={item?.image} />
                    <div className={classDate}>
                        <div className='font-700 fs-24 text-white text-date'>{`Stage ${item?.id}`}</div>
                    </div>
                </div>

            </div>
        )
    }
    const renderImageXs = (item) => {
        const classNameImage = item?.postion == 2 ? 'image-road-map': 'image-road-map'
        const classDate = 'absolute top-0 bottom-0 justify-center flex flex-col items-center view-date'
        return (
            <div className='relative w-full'>
                <div className={classNameImage}>
                    <img src={"/images/road_map_left.png"} />
                    <div className={classDate}>
                        <div className='font-700 fs-24 text-white text-date'>{`Stage ${item?.id}`}</div>
                        {/* <div className='font-700 fs-32 text-white text-year'>{`Stage ${item?.id}`}</div> */}
                    </div>
                </div>

            </div>
        )
    }
    const renderText = (item) => {
        const classNameText = item?.postion === 1 ? "text-left pl-10 item-text" : "text-right pr-10 item-text "
        return(
            <div className={classNameText}>
                 {
                     item?.descs && item?.descs.map((desc, index) => (
                        <div key={index} className=" whitespace-pre-line color-xanh-nhat fs-20 roadmap-item-desc">• {desc}</div>
                     ))
                 }
            </div>
        )
    }
  return (
        <div className={className}>
            <div className='view-road-map-md relative'>
                 <img src={"/images/bg_road_map.png"} className="absolute w-full h-full"/>
                {
                    LIST_ROADMAP.map((item, index) => (
                        <Row key={index}>
                            {
                                item?.postion === 1 ? (
                                    <React.Fragment>
                                        <Col md={12} xs={24} data-aos={`fade-right`}>{renderImage(item)}</Col>
                                        <Col md={12} xs={24} data-aos={`fade-left`}>{renderText(item)}</Col>
                                    </React.Fragment>
                                ) : (
                                    <React.Fragment>
                                        <Col md={12} xs={24} data-aos={`fade-right`}>{renderText(item)}</Col>
                                        <Col md={12}  xs={24} data-aos={`fade-left`}>{renderImage(item)}</Col>
                                    </React.Fragment>
                                )
                            }
                        </Row>
                    ))
                }
            </div>
            <div className='view-road-xs md:hidden'>
                {
                    LIST_ROADMAP.map((item, index) => (
                        <React.Fragment key={index}>
                            <div  data-aos={`fade-right`}>{renderImageXs(item)}</div>
                            <div  data-aos={`fade-left`}>{renderText(item)}</div>
                        </React.Fragment>
                    ))
                }
            </div>
            <div className='buttress'/>
        </div>
  );
};

export default styled(RoadMap)`
    position: relative;
    padding: 30px 60px;
    margin-top: 70px;
    .item-text {
        margin-top: 20px;
        margin-bottom: 60px;
    }
    .buttress {
        height: 100%;
        width: 1px;
        background: #000;
        position: absolute;
        top: 0;
    
        right: 0;
        z-index: -1;
    }
    .image-road-map {
        width: 80%;
    }
    @media only screen and (min-width: 768px){  
        .buttress {
            margin: 0 auto;
            left: 0;
        }
      
    }
 
    @media only screen and (max-width: 768px){ 
        padding: 0px 10px;
        .image-road-map {
            width: 100%;
        }
        .buttress {
            right: 20px !important;
            margin: 0;
        }
        .view-road-map-md {
            display: none;
        }
        .view-date {
            left: 76px;
        }
        .item-text {
            padding: 0px 20px 0px 0px !important;
        }
        
    }
    @media only screen and (max-width: 620px){ 
        .view-date {
            left: 50px;
        }
    }
    @media only screen and (max-width: 520px){ 
        .view-date {
            left: 42px;
        }
    }
    @media only screen and (max-width: 430px){ 
        .view-road-map-md {
            display: none;
        }
    }
`;
