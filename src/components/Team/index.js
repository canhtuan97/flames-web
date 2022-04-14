import React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'antd';


const Team = ({className}) => {

    const LIST_TEAM = [
        {
            id: 1,
            name: 'Peter',
            image: '/images/image_team1.png',
            position : "CEO",
            listIcon: [
                {
                    id: 11,
                    icon: '/images/icon_team_1.png',
                    link: '/',
                },
                {
                    id: 12,
                    icon: '/images/icon_team_2.png',
                    link: '/',
                },
                {
                    id: 13,
                    icon: '/images/icon_team_3.png',
                    link: '/',
                },
                {
                    id: 14,
                    icon: '/images/icon_team_4.png',
                    link: '/',
                },
            ]
        },
        {
            id: 2,
            name: 'Isolde',
            image: '/images/image_team2.png',
            position : "CFO",
            listIcon: [
                {
                    id: 21,
                    icon: '/images/icon_team_1.png',
                    link: '/',
                },
                {
                    id: 22,
                    icon: '/images/icon_team_2.png',
                    link: '/',
                },
                {
                    id: 23,
                    icon: '/images/icon_team_3.png',
                    link: '/',
                },
                {
                    id: 24,
                    icon: '/images/icon_team_4.png',
                    link: '/',
                },
            ]
        },
        {
            id: 3,
            name: 'Bernard',
            image: '/images/image_team3.png',
            position : "CGO",
            listIcon: [
                {
                    id: 31,
                    icon: '/images/icon_team_1.png',
                    link: '/',
                },
                {
                    id: 32,
                    icon: '/images/icon_team_2.png',
                    link: '/',
                },
                {
                    id: 33,
                    icon: '/images/icon_team_3.png',
                    link: '/',
                },
                {
                    id: 34,
                    icon: '/images/icon_team_4.png',
                    link: '/',
                },
            ]
        },
        {
            id: 4,
            name: 'Mortimer',
            image: '/images/image_team4.png',
            position : "Advisor",
            listIcon: [
                {
                    id: 41,
                    icon: '/images/icon_team_1.png',
                    link: '/',
                },
                {
                    id: 42,
                    icon: '/images/icon_team_2.png',
                    link: '/',
                },
                {
                    id: 43,
                    icon: '/images/icon_team_3.png',
                    link: '/',
                },
                {
                    id: 44,
                    icon: '/images/icon_team_4.png',
                    link: '/',
                },
            ]
        },
    ]



  return (
        <div className={className}>
            <Row>
                {
                    LIST_TEAM.map((item, index) => (
                        <Col align={"center"} lg={6} md={12} xs={24} key={index}>
                            <div className='mx-4 my-10 relative item-team cursor-pointer overflow-hidden'>
                                <img src={item?.image} className="w-full"/>
                                <div className='absolute bottom-0 item-content w-full py-3'>
                                   <div className='relative'>
                                        <div className='font-700 fs-36 text-center text-white team-name'>{item?.name}</div>
                                        <div className='font-500 fs-24 text-white item-title'>{item?.position}</div>
                                        <div className='flex items-center justify-center item-icon absolute'>
                                            {
                                                item?.listIcon.map((itemIcon, index) => (
                                                    <div
                                                        key={index}
                                                        onClick={() => {
                                                            window.open(itemIcon?.link, "_blank");
                                                        }}
                                                        className='cursor-pointer'>
                                                        <img src={itemIcon?.icon} className="w-5 h-5 mx-2 bg-contain img-icon-social"/>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                   </div>
                                </div>
                            </div>
                        </Col>
                    ))
                }
            </Row>
        </div>
  );
};

export default styled(Team)`
    margin: 0px 20px;
    .item-team {
        border-radius: 20px;
        transition:.5s;
        &:hover {
          transform: scale(1.2); 
          transition: transform .5s ease;
          .item-icon {
            opacity: 1;
            -webkit-transform: translateY(-100%);
            -ms-transform: translateY(-100%);
            transform: translateY(-100%);
            transition:.5s;
          }
          .item-title {
                opacity: 0;
                transition:.5s;
                -webkit-transform: translateY(-100%);
                -ms-transform: translateY(-100%);
                transform: translateY(-100%);
          }
        }
        .item-content {
            margin: 0 auto;
            background: linear-gradient(90deg, #01D1FF 0%, #0276FE 100%);
        }
        .item-icon {
            margin: 0 auto;
            left: 0;
            right: 0;
            bottom: -3px;
            opacity: 0;
        }
    }
   
`;
