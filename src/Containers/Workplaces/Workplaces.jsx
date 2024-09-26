import React, {useState, useContext, useEffect} from "react";
import { useApp } from "../../Data/AppContext";
import { UALContext } from "ual-reactjs-renderer";
import { toast } from "react-toastify";

import './workplaces.css'

import meat from '../../images/market-items/meat.png'
import stone from '../../images/market-items/rock.png'
import wood from '../../images/market-items/wood.png'
import wheel from '../../images/market-items/wheel.png'
import equip from '../../images/plus_icon_section.png'
import lock from '../../images/lock.png'

import Footer from '../../components/FooterGameNav/FooterGameNav'
import UnlockCard from '../../Modal/UnlockCard'
import EquipTool from '../../Modal/EquipTool'
import Sidebar from '../../components/Sidebar/Sidebar'

import {
    fetchResources,
    claimMiningResources,
    unStakeTool,
    stakeTool,
    stakeWp,
    fetchStakedWp
} from "../../Services";
import {getDataFromAtomicApi} from "../../Helpers";
import Timer from "../../components/Countdown/Timer";
import {createBrowserHistory} from "history";

const Workplaces = () => {

    const { activeUser } = useContext(UALContext);

    const {
        itemList,
        setResources,
        stakedItemList,
        setStakedItems,
    } = useApp();

    const [selectItem, setSelectItem] = useState([])
    const [selectedWorkPlace, setSelectedWorkPlace] = useState([])
    const [tools, setTools] = useState([])
    const [wp, setWP] = useState([])
    // const [countdownCompleted, setCountdownCompleted] = useState(false);
    const [miningCount, setMiningCount] = useState(0);


    const getResourceIcon = (name) => {
      switch (name) {
          case "food":
              return meat

          case "stone":
              return stone

          case "miles":
              return wheel

          case "wood":
              return wood

          default:
              return wood
      }
    }

    const history = createBrowserHistory();


    useEffect(() => {
        setMiningCount(tools.reduce((acc, curr) => acc + curr.data.power, 0))
    }, [tools])

    useEffect(() => {
        if (wp.asset_id !== undefined){
            history.push(`/workplace/${wp.asset_id}`)
        }else {
            history.push(`/workplace`)
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [history])



    useEffect(() => {
        const toolsIdtoObj = async () => {
            if (selectedWorkPlace && selectedWorkPlace.tools && selectedWorkPlace.tools.length){
                // const newTools = [];
                await Promise.all(selectedWorkPlace.tools.map(async item => {
                    console.log(selectedWorkPlace)
                    const data = await getDataFromAtomicApi(`assets?ids=${item.key}&page=1&limit=100`);
                    setTools(data);
                }));

                // setTools(newTools);
            }
             else {
                setTools([])
            }
        }

        const WPIdtoObj = async () => {
            if (selectedWorkPlace && selectedWorkPlace.workplace_asset_id && selectedWorkPlace.workplace_asset_id.length){
                    const data = await getDataFromAtomicApi(`assets?ids=${selectedWorkPlace.workplace_asset_id}&page=1&limit=100`)
                    setWP(data[0])
            } else if(stakedItemList && stakedItemList[0]?.workplace_asset_id && stakedItemList.length){
                    const data = await getDataFromAtomicApi(`assets?ids=${stakedItemList[0]?.workplace_asset_id}&page=1&limit=100`)
                    setSelectedWorkPlace(stakedItemList[0])
                    setWP(data[0])
            } else {
                setWP([])
            }
        }

        WPIdtoObj()
        toolsIdtoObj()
    }, [selectedWorkPlace, stakedItemList])



    // const renderWorkPlaceTools = () => {
    //   return(
    //       <div className="container">
    //           <div className="main-main-wrapper">
    //               {tools.length ?
    //                   <>
    //                       <div className="main-workplace-header">
    //                           <div className="start-work_btn" onClick={() => handleClaim(selectedWorkPlace && String(selectedWorkPlace.workplace_asset_id))}>
    //                               <p>Start Work</p>
    //                           </div>
    //                           <p>Total Prodused <span>0</span><img src={getResourceIcon(selectedWorkPlace?.generate_resource)} alt='' /></p>
    //                       </div>
    //                       <div className="main-main-contant">
    //                           <div className="main-main-list">
    //                               {tools.map(item =>
    //                                   <>
    //                                       <div key={Number(item.asset_id)} className="workplaces-item">
    //                                           <div className="workplaces-img available-img">
    //                                               <img src={`https://atomichub-ipfs.com/ipfs/${item.data.img}`} alt="" />
    //                                               {/*<p className={'workplaces-img_name'}>{item.name}</p>*/}
    //                                           </div>
    //                                           <div className="produces">
    //                                               <p>Produces:</p>
    //                                               <p>{item.data.power}/Hour</p>
    //                                           </div>
    //                                           <div className="btn-unequip">
    //                                               <button onClick={() => unstakeHandler(selectedWorkPlace.workplace_asset_id, item.asset_id)}>Unequip</button>
    //                                           </div>
    //                                       </div>
    //                                       <div className="workplaces-item lock">
    //                                           <div className="workplaces-img locked-img">
    //                                               <img src={lock} alt="spear" />
    //                                           </div>
    //                                           <div className="btn-lock">
    //                                               <UnlockCard />
    //                                           </div>
    //                                       </div>
    //                                       <div className="workplaces-item lock">
    //                                           <div className="workplaces-img locked-img">
    //                                               <img src={lock} alt="spear" />
    //                                           </div>
    //                                           <div className="btn-lock">
    //                                               <UnlockCard />
    //                                           </div>
    //                                       </div>
    //                                       <div className="workplaces-item lock">
    //                                           <div className="workplaces-img locked-img">
    //                                               <img src={lock} alt="spear" />
    //                                           </div>
    //                                           <div className="btn-lock">
    //                                               <UnlockCard />
    //                                           </div>
    //                                       </div>
    //                                   </>
    //                               )}
    //
    //                               {/*to unlock workplace slots - unlock:slot:workplace:[is staked 0 or 1]:[WORKPLACE_ID]*/}
    //
    //                               {/*<div className="workplaces-item">*/}
    //                               {/*    <div className="workplaces-img available-img">*/}
    //                               {/*        <img src={WoodenSpear} alt="spear" />*/}
    //                               {/*        <p className={'workplaces-img_name'}>Wooden Spear</p>*/}
    //                               {/*    </div>*/}
    //                               {/*    <div className="produces">*/}
    //                               {/*        <p>Produces:</p>*/}
    //                               {/*        <p>100/Hour</p>*/}
    //                               {/*    </div>*/}
    //                               {/*    <div className="btn-equip">*/}
    //                               {/*        <EquipTool itemList={itemList} />*/}
    //                               {/*    </div>*/}
    //                               {/*</div>*/}
    //
    //                               {/*<div className="workplaces-item equip">*/}
    //                               {/*    <div className="workplaces-img unequip-img">*/}
    //                               {/*        { !stakedToolsList.length ?  <img src={equip} alt="spear" /> : <img src={`https://cloudflare-ipfs.com/ipfs/${stakedToolsList[0].data.img}`} alt="spear" /> }*/}
    //                               {/*    </div>*/}
    //                               {/*    <div className="btn-equip">*/}
    //                               {/*        <EquipTool itemList={[]} />*/}
    //                               {/*    </div>*/}
    //                               {/*</div>*/}
    //
    //                               {/*<div className="workplaces-item lock">*/}
    //                               {/*    <div className="workplaces-img locked-img">*/}
    //                               {/*        <img src={lock} alt="spear" />*/}
    //                               {/*    </div>*/}
    //                               {/*    <div className="btn-lock">*/}
    //                               {/*        <UnlockCard />*/}
    //                               {/*    </div>*/}
    //                               {/*</div>*/}
    //
    //                               {/*<div className="workplaces-item lock">*/}
    //                               {/*    <div className="workplaces-img locked-img">*/}
    //                               {/*        <img src={lock} alt="spear" />*/}
    //                               {/*    </div>*/}
    //                               {/*    <div className="btn-lock">*/}
    //                               {/*        <UnlockCard />*/}
    //                               {/*    </div>*/}
    //                               {/*</div>*/}
    //
    //                           </div>
    //                       </div>
    //                   </>
    //
    //                   :
    //                   <div className={'no-tools'}>No tools</div>
    //
    //               }
    //
    //           </div>
    //       </div>
    //   )
    // }

    const renderWorkPlaceTools = () => {
        const equipItems = tools.length < wp.data?.slots ? (
            Array.from({ length: wp.data?.slots - tools.length }, (_, i) => (
                <div key={i} className="workplaces-item equip">
                    <div className="workplaces-img unequip-img">
                        <img src={equip} alt="spear" />
                    </div>
                    <div className="btn-equip">
                        <EquipTool stakeHandler={stakeHandler} itemList={itemList} />
                    </div>
                </div>
            ))
        ) : null;

        const lockItems = tools.length <= wp.data?.slots ? (
            Array.from({ length: 4 - wp.data?.slots }, (_, i) => (
                <div key={i} className="workplaces-item lock">
                    <div className="workplaces-img locked-img">
                        <img src={lock} alt="spear" />
                    </div>
                    <div className="btn-lock">
                        <UnlockCard wpID={wp.asset_id}/>
                    </div>
                </div>
            ))
        ) : null;

        return (
            <div className="container">
                <div className="main-main-wrapper">
                    <>
                        <div className="main-workplace-header">
                            <p className={'time'}>Left to the next production:
                                <div className={'timer'}>
                                    <Timer
                                        wp={wp}
                                        stakedWP={stakedItemList}
                                    />
                                </div>
                            </p>


                          <div className={'workplace-header-right'}>
                              <p>
                                  <span>{miningCount}</span>
                                  <img src={getResourceIcon(selectedWorkPlace?.generate_resource)} alt="" />
                              </p>
                              <button
                                  className={"start-work_btn"}
                                  onClick={() => handleClaim(selectedWorkPlace && String(wp.asset_id))}
                                //   disabled={countdownCompleted}
                              >
                                  Claim
                              </button>
                          </div>

                        </div>
                        <div className="main-main-contant">
                            <div className="main-main-list">
                                {tools.map((item) => (
                                    <div key={Number(item.asset_id)} className="workplaces-item">
                                        <div className="workplaces-img available-img">
                                            <img src={`https://atomichub-ipfs.com/ipfs/${item.data.img}`} alt="" />
                                        </div>
                                        <div className="produces">
                                            <p>Produces:</p>
                                            <p>{item.data.power}/Hour</p>
                                        </div>
                                        <div className="btn-unequip">
                                            <button onClick={() => unstakeHandler(selectedWorkPlace.workplace_asset_id, item.asset_id)}>
                                                Unequip
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                {equipItems}
                                {lockItems}
                            </div>
                        </div>
                    </>
                </div>
            </div>
        );
    };

    useEffect(() => {
        renderWorkPlaceTools();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tools]);





    const handleWorkplaceTool = (item) => {
        setSelectedWorkPlace(item)
    }

    const handleClaim = (workplace_id) => {
        claimMiningResources( { activeUser, workplace_id })
            .then(() => {
                fetchResources({ account: activeUser.accountName })
                    .then(resource => setResources(resource))
                    .catch(e => console.log(e));


                 toast.success('Claimed');
            })
            .catch(e => toast.error(e.message))
            .catch(e => console.error(e))
    }

    const stakeHandlerWp = () => {
        stakeWp({ activeUser, selectItem })
            .then(() => {
                fetchStakedWp({account: activeUser.accountName})
                    .then((items) => {
                        setStakedItems(items)
                    })
                    .catch(e => console.log(e));

                toast.success('Staked successed');
            })
            .catch(e => toast.error(e.message))
            .catch(e => console.error(e))
    }

    const stakeHandler = (selectItem) => {
        stakeTool({ activeUser, selectItem, wp })
            .then(() => {
                fetchStakedWp({account: activeUser.accountName})
                    .then((items) => {
                        setStakedItems(items)
                    })
                    .catch(e => console.log(e));

                toast.success('Staked successed');
            })
            .catch(e => toast.error(e.message))
            .catch(e => console.error(e))
    }

    const unstakeHandler = ( wpId, assetId ) => {
        unStakeTool({ activeUser, assetId, wpId })
            .then(() => {
                fetchStakedWp({account: activeUser.accountName})
                    .then((items) => setStakedItems(items))
                    .catch(e => console.log(e));

                 toast.success('Unstaked');
            })
             .catch(e => toast.error(e.message))
    }

    return (
        <section className="workplace">
            {/*<Header />*/}
            <div className="main-workplace">
                <Sidebar
                    handleWorkplaceTool={handleWorkplaceTool}
                    selectItem={selectItem}
                    setSelectItem={setSelectItem}
                    stakeHandler={stakeHandlerWp}
                    setSelectedWorkPlace={setSelectedWorkPlace}
                    selectedWorkPlace={selectedWorkPlace}
                />
                <div className="main-main">
                    <div className="main-title">
                        <h2>Workplaces</h2>
                    </div>
                    {renderWorkPlaceTools()}
                    <Footer />
                </div>
            </div>
        </section>
    )
}

export default Workplaces;