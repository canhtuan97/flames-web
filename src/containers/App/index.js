import React, {useState, useRef, useEffect} from "react";
import queryString from 'query-string';
import {toast} from 'react-toastify';
import dayjs from 'dayjs';
import {useLocation} from 'react-router-dom';
import AOS from "aos";
import {Row, Col, Drawer} from 'antd';
import moment from 'moment';
import {useWeb3React} from "@web3-react/core";
import {useEagerConnect, useInactiveListener} from "src/utils/hooks";
import {connectorsByName} from "src/consts/connectors";
import {BSC_CHAIN_ID} from "src/consts/blockchain";
import web3 from "web3";
import {read, write} from "src/services/web3";
import REFERRAL_ABI from "src/utils/abi/Referral.json";
import PRE_SALE_ABI from "src/utils/abi/Presale.json";
import TOKEN_ABI from "src/utils/abi/Token.json";
import Modal from 'react-modal';
import {WAR_REFERRAL} from "src/consts/address";
import {PRE_SALE} from "src/consts/address";
import {BSC_APP_TOKEN} from "src/consts/address";
import {FEE_CLAIM_REFERRAL} from "src/consts/fee";
import {BSC_blockExplorerUrls} from "src/consts/blockchain";
// components
import CountdownTimer from 'src/components/CountdownTimer/CountdownTimer';
import Chart from 'src/components/Chart';
import RoadMap from 'src/components/RoadMap';
import ListOn from 'src/components/ListOn';
import Burger from 'src/components/Burger';
import ListImageStar from 'src/components/ListImageStar';
import Team from 'src/components/Team';

// constants
import {
    LIST_MENU,
    LIST_STEP,
    PARTNER_LIST_2,
    PARTNER_LIST_1,
    PARTNER_LIST_3,
    FOLLOW_LIST,
    WEBSITE_URL_REF,
    DATE_COUNT_DOWN,
} from './contants';
// css
import "aos/dist/aos.css";
import "./App.scss";

const customStyles = {
    overlay: {
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'none',
    },
    content: {
        top: '50%', left: '50%', right: 'auto', bottom: 'auto', marginRight: '-50%',
        transform: 'translate(-50%, -50%)', border: 'none',
    },
};
const App = () => {
    const location = useLocation();
    const search = location?.search || '';
    const valueQueryUrl = queryString.parse(search)?.ref;


    const [step, setStep] = useState(0);
    const [showDrawer, setShowDrawer] = useState(false);

    const [loaddingPage, setLoaddingPage] = useState(true);

    const context = useWeb3React();
    const {activate} = context;
    const [activatingConnector, setActivatingConnector] = useState();
    const [transactionHash, setTransactionHash] = useState('');
    const [transactionHashBuyToken, setTransactionHashBuyToken] = useState('');
    const [inputValue, setValueInput] = useState("");
    const [inputValueLink, setValueLink] = useState("");
    const [amountBuyTokenInput, setAmountBuyTokenInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [loadingBuyToken, setLoadingBuyToken] = useState(false);
    const [showLinkRefferall, setShowLinkRefferall] = useState(false);

    const [modalIsOpenBuyToken, setIsOpenBuyToken] = useState(false);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [modalClaimSuccess, setModalClaimSuccess] = useState(false);


    const triedEager = useEagerConnect();
    const {account, chainId, library} = useWeb3React();
    useInactiveListener(!triedEager || !!activatingConnector);

    const tokenomic = useRef(null);
    const roadmap = useRef(null);
    const bonding = useRef(null);
    const airdrop = useRef(null);
    const feature = useRef(null);
    const presale = useRef(null);

    const onCheckValueSubmit = (valueQueryUrl, inputValue, addressCurrent) => { // checkvalidate
        if (inputValue) {
            return inputValue; // input
        } else if (valueQueryUrl) {
            return valueQueryUrl; // ref
        } else {
            return addressCurrent; // fix cứng
        }
    };

    const connectWallet = async () => {
        const currentConnector = connectorsByName.MetaMask;
        setActivatingConnector(currentConnector);
        await activate(connectorsByName.MetaMask);
    };
    const buyNow = async () => {
        const addressCurrent = '0x0000000000000000000000000000000000000000';
        let referral = onCheckValueSubmit(valueQueryUrl, inputValue, addressCurrent);
        if (referral.toLowerCase() === account.toLowerCase()) {
            referral = "0x0000000000000000000000000000000000000000";
        }

        if (Number(amountBuyTokenInput) < 0.01) {
            return toast.warn("Amount bnb must be greater than 0.01", {});
        }
        setLoadingBuyToken(true);
        await write(
            "buy",
            library.provider,
            BSC_APP_TOKEN, // env
            TOKEN_ABI,
            [referral],
            {from: account, value: web3.utils.toWei(amountBuyTokenInput.toString())},
        ).then(async (res) => {
            setLoadingBuyToken(false);
            if (res && res?.transactionHash) {
                setTransactionHashBuyToken(`${BSC_blockExplorerUrls}/tx/${res?.transactionHash}`);
                setTimeout(() => {
                    setIsOpenBuyToken(true);
                }, 400);
            }
        }).catch((err) => {
            setLoadingBuyToken(false);
            console.log("errr", err);
        });
    };

    const claimAirdrop = async () => {
        if (Number(BSC_CHAIN_ID) !== Number(chainId)) {
            return toast.warn("Please switch to binance smart chain network !", {});
        }

        setLoading(true);
        const addressCurrent = '0x0000000000000000000000000000000000000000';
        let referral = onCheckValueSubmit(valueQueryUrl, inputValue, addressCurrent);
        const feeClaim = web3.utils.toWei(FEE_CLAIM_REFERRAL.toString());
        if (referral.toLowerCase() === account.toLowerCase()) {
            referral = "0x0000000000000000000000000000000000000000";
        }

        await write(
            "airdrop",
            library.provider,
            BSC_APP_TOKEN, // env
            TOKEN_ABI,
            [referral],
            {from: account, value: feeClaim},
        ).then(async (res) => {
            console.log("res", res);
            setLoading(false);
            if (res && res?.transactionHash) {
                setTransactionHash(`${BSC_blockExplorerUrls}/tx/${res?.transactionHash}`);
                setTimeout(() => {
                    setIsOpen(true);
                }, 400);
            }
        }).catch((err) => {
            setLoading(false);
            console.log("errr", err);
        });
    };


    const onClickMenu = (action) => {
            setShowDrawer(false)
        if(action == 'Tokenomics') {
            tokenomic.current.scrollIntoView({  behavior: "smooth", block: "start", })
        }
        if (action == 'Roadmap') {
            roadmap.current.scrollIntoView({behavior: "smooth", block: "start"});
        }
        if(action == 'Bonding') {
            toast.warn("Coming soon !")
        }
        if (action == 'Features') {
            feature.current.scrollIntoView({behavior: "smooth", block: "start"});
        }
        if (action == 'Airdrop') {
            airdrop.current.scrollIntoView({behavior: "smooth", block: "start"});
        }
    };


    function afterOpenModal() {}

    function closeModal() { setIsOpen(false); }

    useEffect(() => {
        AOS.init({
            duration: 2000,
            once: 'true',
        });
        AOS.refresh();
    });

    useEffect(() => {
        const typeMenu = queryString.parse(search)?.type;
        if(typeMenu == 'airdrop' && !loaddingPage) {
            airdrop && airdrop.current.scrollIntoView({behavior: "smooth", block: "start"});
        }
        if(typeMenu == 'presale' && !loaddingPage) {
            presale && presale.current.scrollIntoView({behavior: "smooth", block: "start"});
        }
    }, [loaddingPage])


    useEffect(() => {
        setTimeout(() => {
            setLoaddingPage(false)
        }, 3000)
    }, [])


    const DATE_TIMESTAMP = `${moment(`${DATE_COUNT_DOWN}`, "YYYY/MM/DD").format("X")}000`


    const renderItemOur = (animate, image, title, desc) => {
        return (
            <Col md={8}>
                <div className="flex flex-col items-center item-our mb-20 xs:mb-10" data-aos={`fade-${animate}`}>
                    <img src={image} className="image-our"/>
                    <div className="title font-700 fs-28 py-5 title-our-item">{title}</div>
                    <div className="text-center whitespace-pre-line fs-18 title-our-desc">{desc}</div>
                </div>
            </Col>
        )
    }

    if( loaddingPage ) {
        return (
            <div className="loadding-app relative w-full h-screen">
                <div
                    className="view-loadding-app top-0 right-0 left-0 bottom-0 flex flex-col justify-center items-center">
                    <img src={"/images/icon_loadding_app.png"}
                         className="image-loading w-56 -56 mb-10 rotate-loading-logo"/>
                    <div className="text-center text-white font-700 fs-32">Flames finance</div>
                </div>
            </div>
        );
    }


    return (
        <div className="App relative bg-tim">
            <Drawer
                closable={false}
                onClose={() => {
                    setShowDrawer(false);
                }}
                placement="left"
                visible={showDrawer}
                width={300}
            >
                <div className="menu-mobile">
                    <div onClick={() => {
                            setShowDrawer(false);
                        }} className="menu-logo-mobile flex items-center cursor-pointer mt-6">
                        <img src={"/images/icon_logo.png"} className="img-menu-logo w-8"/>
                        <div className="font-700 ml-4 text-white fs-18 ">Flames finance</div>
                    </div>
                    {
                        LIST_MENU.map((item, index) => (
                            <div
                                onClick={() => {
                                    onClickMenu(item?.action);
                                }}
                                key={index} className="fs-18 font-500 cursor-pointer nav-item relative text-white py-2">
                                {item?.name}
                            </div>
                        ))
                    }
                </div>
            </Drawer>


            {/* ======== HEADER ====== */}
            <div className="flex items-center flex-col header relative" style={{background: `url('/images/bg_header.png')`}}>
                <ListImageStar/>
                <div className="header-menu  w-full my-4">
                    <div className="flex menu-web items-center w-full justify-between relative">
                        <div className="menu-logo flex items-center ml-14 cursor-pointer">
                            <img src={"/images/icon_logo.png"} className="img-menu-logo"/>
                            <div className="font-500 ml-4 text-logo">Flames finance</div>
                        </div>
                        <div className="flex justify-between items-center mr-6 menu-left ">
                            {
                                LIST_MENU.map((item, index) => (
                                    <div
                                        onClick={() => {
                                            onClickMenu(item?.action);
                                        }}
                                        key={index}
                                        className="nav-item text-white font-500 px-3 cursor-pointer relative">
                                        {item?.name}
                                    </div>
                                ))
                            }
                            <div className="btn-primary items-center flex h-4 btn-connect font-700 ml-6"
                                 onClick={() => {
                                     if (account === undefined) {
                                         connectWallet();
                                     } else {
                                         toast.warn("Connected !");
                                     }
                                 }}
                            >
                                {account === undefined ? "Connect wallet" : "Connected"}
                            </div>
                        </div>
                        <div className="menu-left-mobile mr-6">
                            <Burger showDrawer={showDrawer} setShowDrawer={setShowDrawer}/>
                        </div>
                    </div>

                </div>

                <div className="header-content container relative">
                    <div className="absolute right-20 top-10 image-logo">
                        <img src={"/images/icon_logo.png"} className="w-24 rotate-loading-logo"/>
                    </div>
                    <div className="img-rocket absolute">
                        <img src={"/images/icon_roket_header.png"}/>
                    </div>
                    <Row>
                        <Col lg={12} md={24} xs={24}>
                            <div className="header-content-left">
                                <div className="title-content-left font-700 title-text-category ">
                                    FLAMES FINANCE
                                </div>
                                <div className="desc-content-left whitespace-pre-line font-400 mt-6 mb-9 sub-text text-white">
                                    {`Flames Finance is a common decentralization \nfinancial foundation built on the binance \n smart chain. Flames allow users to trade \nwithout intermediaries. In addition, users \ncan participate in earning profits \nby providing liquidity into pool staking.`}
                                </div>
                                <div className="flex btn-header">
                                    <div className="btn-content font-700 cursor-pointer"
                                         onClick={() => {
                                             toast.warn("Coming soon !");
                                         }}
                                    >
                                        Launch app
                                    </div>
                                    <div className=" btn-content font-700 ml-7 btn-pre-sale cursor-pointer"
                                         onClick={() => {
                                            presale.current.scrollIntoView({behavior: "smooth", block: "start"});
                                         }}
                                    >
                                        Pre sale
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col lg={12} md={24} xs={24} className="relative">

                        </Col>
                    </Row>

                </div>
            </div>
            {/* ======== ABOUT ====== */}
            <div className=" about flex items-center flex-col w-full"
                 style={{background: `url('/images/bg_about.png')`}}>
                <div className="container pt-20 mt-10">
                    <Row>
                        <Col md={14} xs={24}>
                            <div className="px-5" data-aos="fade-right">
                                <img src={"/images/image_about.png"} className="img-menu-logo"/>
                            </div>
                        </Col>
                        <Col md={10} xs={24}>
                            <div className="about-left flex items-center flex-col mt-14 px-5" data-aos="fade-left">
                                <div className="title-content-left font-700 title-text-category">
                                    ABOUT FLAMES
                                </div>
                                <div className="whitespace-pre-line font-400 mt-10 mb-9 sub-text fs-24 text-white text-center">
                                    {`FLAMES FINANCE is a Defi Project. We build a non-focused trading platform. This is the future of the finance industry. The system operates in the form of Automated Market Maker (ANM - temporarily translated: "automatic market creation system). In addition, we are building Defi 2.0 to optimize profits for projects.`}
                                </div>
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
            {/* ======== ENDD ABOUT ====== */}


            {/* OUR MAIN FEATURES */}
            <div className="our-main flex items-center flex-col w-full mt-28"
                style={{background: `url('/images/bg_our.png')`}}
            >
                <div className="container lex items-center flex-col">
                    <div ref={feature} className="font-700 title-text-category text-center mb-8 pt-10">
                        OUR MAIN FEATURES
                    </div>
                    <div ref={bonding}
                         className="text-center whitespace-pre-line color-black fs-20 mb-20 sub-text desc-our">{`Key features in the flames token project`}</div>
                    <Row justify="center">
                        {renderItemOur('right', "/images/icon_our_1.png", 'Pools', `Users can staking FFT \nto get more FFT token with \nAPR hight`)}
                        {renderItemOur('down', "/images/icon_our_2.png", 'Farming', `Flames finance provides many \nfarming opportunities to our \nusers. You can stake your LP \ntokens and in return earn \nFlames tokens`)}
                        {renderItemOur('left', "/images/icon_our_3.png", 'Bonding', `Flames finance is building a \n community-owned decentralized \nfinancial infrastructure to \nbring more stability and \ntransparency for the world.`)}
                    </Row>
                    <Row justify="center">
                        {renderItemOur('up', "/images/icon_our_4.png", 'Exchange', `Flames Exchange is an \nautomated market maker (AMM) \nthat allows users to exchange\n two tokens on the \nBinance Smart Chain network.`)}
                        {renderItemOur('up', "/images/icon_our_5.png", 'NFT Marketplace', `In 2022 we will release our \nown NFT for creators and \nyou can create your own NFT \nproduct from our purchased\n NFT and can trade on exchanges \nother NFT transactions.`)}
                    </Row>
                </div>
            </div>
            {/* END OUR MAIN FEATURES */}

            {/*  PRES - ALE FEATURES */}

            <div className="pre-sale flex items-center flex-col w-full ">
                <div className="container flex items-center flex-col pb-10 pt-10">
                    <div className="snowflakes" aria-hidden="true">
                        {
                            [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((item, index) => (
                                <div className="snowflake" key={index}>
                                    <img src={"/images/icon_money.png"} className="img-money"/>
                                </div>
                            ))
                        }
                    </div>
                    <div className="font-700 fs-40 text-white pb-12"  ref={presale}>PRE SALE</div>
                    <CountdownTimer
                        countdownTimestampMs={parseInt(DATE_TIMESTAMP)}/>
                    <div className="flex flex-col items-center mt-10">
                        <div className="view-bnb flex fs-24">
                            <div className="bnb-title flex items-center text-white px-6 font-700">BNB Orders</div>
                            <input className="input-btn px-3"
                                   onChange={(e) => {
                                       setAmountBuyTokenInput(e.target.value);
                                   }} value={amountBuyTokenInput}/>
                        </div>
                        <div className="btn-buy-now my-8 font-700 fs-24 cursor-pointer"

                             onClick={() => {
                                 buyNow();
                             }}
                        >
                            BUY NOW
                        </div>
                        <ul>
                            <li className="font-400 text-white fs-18 pb-2 px-3 text-center">•&nbsp;&nbsp;0.01 BNB = 50000
                                FFT
                            </li>
                            <li className="font-400 text-white fs-18 pb-2 px-3 text-center">•&nbsp;&nbsp;0.1 BNB = 500000
                                FFT
                            </li>
                            <li className="font-400 text-white fs-18 pb-2 px-3 text-center">•&nbsp;&nbsp;1 BNB = 5000000
                                FFT
                            </li>
                            <li className="font-400 text-white fs-18 pb-2 px-3 text-center flex">•&nbsp;&nbsp;Take 1000 FFT
                            <div onClick={() => {
                                window.open("http://t.me/FlamesAirdrop_bot", "_blank");
                            }} className="cursor-pointer"> 👉👉  here</div>
                            </li>
                            <li className="font-400 text-white fs-18 pb-2 px-3 text-center">•&nbsp;&nbsp;Note: Token
                                Listing Price 1 FFT = 0.0024 USD
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/*  ENDDDDD PRES - ALE FEATURES */}

            {/*  REFERAL REWARDS */}

            <div className="referal_rewards flex flex-col items-center w-full  mt-20 relative"
            >
                <div ref={airdrop} className="text-center font-700 fs-32 mb-6 title-text-category"> Referral Rewards</div>
                <div className=" container text-center whitespace-pre-line color-black fs-20 sub-text color-xanh-sub mb-10">{`Flames run the airdrop program, which introduces more FFT to receive.`}</div>
                <div className="container view-step pt-20" style={{background: `url('/images/bg_referal.png')`}}>
                    <Row>
                        {
                            LIST_STEP.map((item, index) => (
                                <Col key={index} lg={6} md={12} sm={12} xs={24}>
                                    <div className="item-step cursor-pointer mb-14"
                                         onClick={() => {
                                             if (item?.id - step == 1) {
                                                 setStep(item?.id);
                                                    if (item?.id == 1) {
                                                        return window.open("https://t.me/flamesfinance", "_blank");
                                                    }
                                                    if (item?.id == 2) {
                                                        return window.open("https://t.me/flamesfinancechannel", "_blank");
                                                    }
                                                    if (item?.id == 3) {
                                                        return window.open("https://twitter.com/FinanceFlames?t=zmY2qETelOD6kUDTxnOa1Q&s=09", "_blank");
                                                    }
                                                    if (item?.id == 4) {
                                                        return window.open("https://twitter.com/FinanceFlames?t=zmY2qETelOD6kUDTxnOa1Q&s=09", "_blank");
                                                    }
                                             }
                                             if (item?.id == 4 && valueQueryUrl) {
                                                 setValueInput(valueQueryUrl);
                                             }
                                         }}
                                    >
                                        <div className="font-700 fs-24 mb-4 pl-6 title-step">{`STEP ${item?.id}`}</div>
                                        <div
                                            className="item-step-bg h-full flex flex-col items-center justify-center relative ">
                                            <div className="px-6 absolute view-step-image">
                                                {
                                                    step >= item?.id ? (
                                                        <img src={"/images/icon_step_active.png"}
                                                             className={`absolute w-9 -top-4 right-10`}/>
                                                    ) : null
                                                }
                                                <img src={item?.image}
                                                     className={`w-full image-step hover:bg-step${index + 1} ${step >= item?.id ? `bg-step${index + 1}` : ''}`}/>
                                            </div>
                                            <img src={item?.icon} className={` absolute bg-contain icon-step`}/>
                                            <div
                                                className="whitespace-pre-line pt-4 pl-2 text-center mb-6 color-tim font-400 fs-18 desc-step color-xanh-sub">{item?.desc}</div>
                                        </div>
                                    </div>
                                </Col>
                            ))
                        }
                    </Row>
                    <div className="flex flex-col items-center mb-10">
                        <div className="flex view-claim">
                            <input placeholder="Connect wallet to see your ref link" className="input-claim"
                                onChange={(e) => {
                                    setValueInput(e.target.value);
                                }}
                                value={inputValue}
                                disabled={valueQueryUrl && step == 4}
                            />
                            <div className={step > 3 ? "btn-claim btn-claim-active font-700 text-white px-5 fs-24" : "btn-claim font-700 px-5 fs-24"}
                                onClick={() => {
                                    if (step > 3) {
                                        if ((inputValue && inputValue?.length < 40) || !inputValue) {
                                            return toast.warn("Inviter’s address invalid");
                                        }
                                        claimAirdrop();
                                    }
                                }}
                            >Claim airdrop
                            </div>
                        </div>

                        <ul className="mt-6">
                            <li className="font-400 color-tim-nhat fs-18 pb-2 px-3">•&nbsp;&nbsp;(*) Press “Claim” to receive
                                10000 FFT with fee 0.002 BNB
                            </li>
                            <li className="font-400 color-tim-nhat fs-18 pb-2 px-3">•&nbsp;&nbsp;(*) Share your referral link to
                                receive up to 100% commission!
                            </li>
                            <li className="font-400 color-tim-nhat fs-18 pb-2 px-3">•&nbsp;&nbsp;Invite everyone to get 100% referral bonus for eachAirdrop.
                            </li>
                            <li className="font-400 color-tim-nhat fs-18 pb-2 px-3">•&nbsp;&nbsp;Get 30% BNB & 70% FFT per referral.
                                2
                            </li>
                            <li className="font-400 color-tim-nhat fs-18 pb-2 px-3">•&nbsp;&nbsp;(*) There is no limit to the number of referrals you can invite
                            </li>
                        </ul>
                        <div className="flex view-get-link-text">
                            <input placeholder="Connect wallet to see your ref link" className="input-claim"
                                onChange={(e) => {
                                    setValueLink(e.target.value);
                                    setShowLinkRefferall(false)
                                }}
                                value={inputValueLink}
                            />
                            <div className={ ((inputValueLink && inputValueLink?.length < 40) || !inputValueLink) ? "btn-claim  font-700 text-white px-5 fs-24" : "btn-claim-active font-700 px-5 fs-24"}
                                onClick={() => {
                                    if ((inputValueLink && inputValueLink?.length < 40) || !inputValueLink) {
                                        return toast.warn("Inviter’s address invalid");
                                    } else {
                                        setShowLinkRefferall(true)
                                    }
                                }}
                            > Get link
                            </div>
                        </div>
                        <div className="">
                            {
                                    showLinkRefferall && (
                                        <div className="font-400 text-white fs-18 text-center mt-2">Link refferall:&nbsp;
                                            <span className="cursor-pointer link-copy italic"
                                                onClick={() => {
                                                    navigator.clipboard.writeText(`${WEBSITE_URL_REF}/?ref=${inputValueLink}&type=airdrop`);
                                                    toast.success("Copied");
                                                }}
                                            > {`${WEBSITE_URL_REF}/?ref=${inputValueLink}`}
                                            </span>
                                        </div>

                                    )
                                }
                        </div>
                    </div>
                </div>


            </div>
            {/* ENDDDD  REFERAL REWARDS */}


            {/* ENDDDD  ROADMAP */}
            <div className="w-full bg-tim pt-11">
                <img className="w-5/6" src="/images/line_category.png" />
            </div>
            <div ref={roadmap} className="roadmap flex items-center flex-col w-full mt-20 ">
                <div className="container lex items-center flex-col">
                    <div className="font-700 title-text-category text-center">
                        ROADMAP
                    </div>

                    <RoadMap/>
                </div>
            </div>
            {/* ENDDDD  ROADMAP */}
            <div className="w-full bg-tim pt-11 flex justify-end">
                <img className="w-5/6 img-line-category-reverse" src="/images/line_category.png" />
            </div>

            {/* NOMIC */}
            <div className=" flex items-center flex-col w-full mt-16 tokenomic pt-5">
                <div ref={tokenomic} className="container flex items-center flex-col">
                    <div className="font-700 title-text-category text-center pb-6">TOKENOMICS</div>
                    <div
                        className="text-center whitespace-pre-line fs-20 mb-8 sub-text pb-12 tokenomic-desc">{`Developer Team will lock the token for 6 months and then unlock the draw for 12 months`}</div>
                </div>

            </div>
            <div className="w-full">
                <Chart/>
            </div>
            {/* ENDDD NOMIC */}


            {/*  TOKEN */}

            <div className="token flex flex-col items-center w-full mt-20"
                 style={{background: `url('/images/bg_token.png')`}}>
                <div className="container pt-16">
                    <Row>
                        <Col md={12} xs={24}>
                        <div className="text-center font-700 fs-32 mb-10 text-white pt-10 view-token"> Token Flames finance</div>
                            <div className="text-left whitespace-pre-line text-white fs-24 sub-text desc-token xs:mb-10">
                                {`• Just go to the Metamask wallet app. The application 
                                    is safe and widely used in the de-fi market. 
                                    (Remember to never share your seed phrase).
                                •  Buy BEP20 BNB to top up your Metamask Wallet.
                                • Change network to Binance smart chain Copy our browser, paste the link in the browser on the Metamask wallet app, pay the minimum transaction fees and get FFT tokens.
                                •  Press the add wallet button in the browser to automatically add the token to your wallet.
                                    • Token Name: Flames finance token
                                    • Symbol: FFT
                                    • Decimal: 18
                                    • Contract FFT: 0x10ef14D67023b14922fcF693950F63F86e8aEC87`}</div>
                        </Col>
                    </Row>

                </div>
            </div>
            {/* ENDDDD  TOKEN */}




            {/* TEAM */}
            <div className="w-full flex items-center flex-col relative mt-20 mb-4">
                <div className="font-700 title-text-category text-center pb-6">TEAM</div>
                <div className="container mx-10 team_list " data-aos="zoom-in-up">
                    <Team />
                </div>
            </div>


            {/* ENDDDD TEAM */}

             {/* LIST ON */}
             <div className="list_on w-full items-center flex-col relative mt-10">
                <div className="text-center font-700 fs-40  text-white">LIST ON</div>
                <ListOn/>
            </div>

            {/* PARTNERSHIP */}
            <div className="partner flex flex-col items-center w-full mt-20 pt-5 ">
                <div className="font-700 title-text-category text-center">PARTNERSHIP</div>
                <div className="container px-10 mt-16">
                    <Row gutter={[80, 16]}>
                        <Col md={8} data-aos="fade-right">
                            {
                                PARTNER_LIST_1.map((item, index) => (
                                    <div key={index} className="mb-6">
                                        <img src={item?.image}/>
                                    </div>
                                ))
                            }
                        </Col>
                        <Col md={8} data-aos="fade-down">
                            {
                                PARTNER_LIST_2.map((item, index) => (
                                    <div key={index} className="mb-6">
                                        <img src={item?.image}/>
                                    </div>
                                ))
                            }
                        </Col>
                        <Col md={8} data-aos="fade-left">
                            {
                                PARTNER_LIST_3.map((item, index) => (
                                    <div key={index} className="mb-6">
                                        <img src={item?.image}/>
                                    </div>
                                ))
                            }
                        </Col>
                    </Row>
                </div>

            </div>
            <div className="w-full bg-tim pt-20 ">
                <img className="w-5/6" src="/images/line_category.png" />
            </div>

            {/* ENDDDD PARTNERSHIP */}

            {/* FOLOW US */}
            <div className="folow-us flex flex-col items-center w-full relative mt-20">
                <div className="font-700 title-text-category text-center">FOLOW US</div>
                <div
                    className="text-center whitespace-pre-line fs-20  mt-8 mb-14 sub-text desc-followus">{`Our community is an integral part of our development. We value the feedback from \n our users and try to make changes accordingly`}</div>
                <div className="flex items-center absolute z-20	list-follow">
                    {
                        FOLLOW_LIST.map((item, index) => (
                            <div key={index} className="img-social"
                                 onClick={() => {
                                     window.open(item?.link, "_blank");
                                 }}
                            >
                                <img src={item?.image}/>
                            </div>
                        ))
                    }
                </div>
                <div className="w-full">
                    <img src={"/images/footer.png"} className="w-full"/>
                    <div className="text-center absolute right-0 bottom-10 copy-right left-0 font-700 text-white fs-28">
                        Copyright&nbsp;&nbsp;&nbsp;© 2022.All Rights Reserved
                    </div>
                </div>
            </div>
            {/* END   FOLOW US */}

            <Modal
                isOpen={loading}
                onAfterOpen={afterOpenModal}
                // onRequestClose={() => setLoading(false)}
                style={customStyles}
            >
                <div className="modal-loadding-content">
                    <div className="bg-modal"/>
                    <img
                        className="rotate-loading"
                        src="/images/loading-process.png"
                    />
                    <div className="title text-gradient-app fs-24 font-700">CLAIM AIRDROP</div>
                    <div className="desc color-tim font-700 fs-20">Confirm this transaction in your wallet</div>
                </div>
            </Modal>
            <Modal
                isOpen={loadingBuyToken}
                onAfterOpen={afterOpenModal}
                // onRequestClose={() => setLoading(false)}
                style={customStyles}
            >
                <div className="modal-loadding-content">
                    <div className="bg-modal"/>
                    <img
                        className="rotate-loading"
                        src="/images/loading-process.png"
                    />
                    <div className="title text-gradient-app fs-24 font-700">BUY TOKEN</div>
                    <div className="desc color-tim font-700 fs-20">Confirm this transaction in your wallet</div>
                </div>
            </Modal>

            <Modal
                isOpen={modalIsOpenBuyToken}
                onAfterOpen={afterOpenModal}
                onRequestClose={() => {setIsOpenBuyToken(false)}}
                style={customStyles}
            >
                <div className="modal-success-content">
                    <div onClick={() => {setIsOpenBuyToken(false)}}
                         className="cursor-pointer absolute -top-1 -right-1 ">
                        <img className="w-10" src="/images/icon_close.png"/>
                    </div>
                    <div className="bg-modal"/>
                    <img
                        className="img-success"
                        src="/images/icon_success.png"
                    />
                    <div className="title text-gradient-app fs-24 font-700">Transaction submitted</div>
                    <div
                        onClick={() => {
                            window.open(transactionHashBuyToken, "_blank");
                        }}
                        className="cursor-pointer btn-view text-white font-700 fs-18">
                        View on BscScan
                    </div>
                </div>
            </Modal>


            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                style={customStyles}
            >
                <div className="modal-success-content">
                    <div onClick={closeModal}
                         className="cursor-pointer absolute -top-1 -right-1 ">
                        <img className="w-10" src="/images/icon_close.png"/>
                    </div>
                    <div className="bg-modal"/>
                    <img
                        className="img-success"
                        src="/images/icon_success.png"
                    />
                    <div className="title text-gradient-app fs-24 font-700">Transaction submitted</div>
                    <div className="desc flex font-500 color-tim fs-16 ">Link referral:&nbsp;
                        <div className="cursor-pointer fs-16 link-success color-black"
                             onClick={() => {
                                 navigator.clipboard.writeText(`${WEBSITE_URL_REF}/?ref=${account}`);
                                 toast.success("Copied");
                             }}
                        > {`${WEBSITE_URL_REF}/?ref=${account}`}
                        </div>
                    </div>
                    <div
                        onClick={() => {
                            window.open(transactionHash, "_blank");
                        }}
                        className="cursor-pointer btn-view text-white font-700 fs-18">
                        View on BscScan
                    </div>
                </div>
            </Modal>
            <Modal
                isOpen={modalClaimSuccess}
                onRequestClose={() => setModalClaimSuccess(false)}
                style={customStyles}
            >
                <div className="modal-success-content">
                    <div onClick={() => setModalClaimSuccess(false)}
                         className="cursor-pointer absolute -top-1 -right-1 ">
                        <img className="w-10" src="/images/icon_close.png"/>
                    </div>
                    <div className="bg-modal"/>
                    <img
                        className="img-success"
                        src="/images/icon_success.png"
                    />
                    <div className="title text-gradient-app fs-24 font-700">Already claim</div>
                    <div className="desc ">
                        <div className="mb-2 font-500 color-tim fs-16">Link referral:</div>
                        <div className="cursor-pointer  link-success color-black"
                             onClick={() => {
                                 navigator.clipboard.writeText(`${WEBSITE_URL_REF}/?ref=${account}`);
                                 toast.success("Copied");
                             }}
                        > {`${WEBSITE_URL_REF}/?ref=${account}`}
                        </div>
                    </div>
                </div>
            </Modal>
        </div>

    );
};

export default App;
