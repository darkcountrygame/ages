import React from 'react';
import Popup from 'reactjs-popup';

import closeImg from '../images/close.png';

import './CraftModal.css';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { contract_address, getAccountBalanceAptos, getResources, getUserNfts } from '../Services';
import { toast } from 'react-toastify';
import { useApp } from '../Data/AppContext';

const CraftLastStepModal = ({ template_id }) => {
    const { setResources, setRtpBalance, setItems } = useApp();
    const { account, signAndSubmitTransaction } = useWallet();

    // Generic function to handle crafting
    const handleCraft = async ({ template_id, close, isAptCraft }) => {
        if (!account) return;

        try {
            const functionName = `${contract_address}::craft::${isAptCraft ? 'craft_with_aptos' : 'craft_with_resources'}`;

            await signAndSubmitTransaction({
                sender: account.address,
                data: {
                    function: functionName,
                    functionArguments: [template_id],
                },
            });

            if (isAptCraft) {

                const amount = await getAccountBalanceAptos({ account: account.address });
                setRtpBalance(Number(amount))

                const userNfts = await getUserNfts({ account: account.address });
                setItems(userNfts);

            } else {
                const resource = await getResources({ account });
                setResources(resource);

                const userNfts = await getUserNfts({ account: account.address });
                setItems(userNfts);
            }

            toast.success('Item crafted!');
            close();
        } catch (error) {
            toast.error('Transaction failed: ' + error);
            console.error("Transaction failed:", error);
        }
    };


    return (
        <Popup
            trigger={<button>Craft Item</button>}
            modal
            nested
        >
            {close => (
                <div className="craft-last-step">
                    <img className="close" src={closeImg} alt="close" onClick={close} />
                    <div className="craft-last-step_container">
                        <div className="stake-btn">
                            <button
                                className='stake-btn'
                                onClick={() => handleCraft({ template_id, close, isAptCraft: true })}
                            >
                                Craft by APT
                            </button>
                        </div>
                        <div className="stake-btn">
                            <button
                                className='stake-btn'
                                onClick={() => handleCraft({ template_id, close, isAptCraft: false })}
                            >
                                Craft by Resources
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </Popup>
    );
};

export default CraftLastStepModal;
