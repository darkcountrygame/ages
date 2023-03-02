import React from 'react';
import Countdown from 'react-countdown';

const Timer = ({ wp, stakedWP }) => {

    const formatTime = ({ hours, minutes, seconds }) => {
        return `${hours.toString().padStart(2, '0')}:${minutes
            .toString()
            .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const getTimestampFromCurrentWP = () => {
        const filteredStakedWP = stakedWP.filter(item => {
            return item.workplace_asset_id === wp.asset_id;
        });
        const lastTimeWork = filteredStakedWP[0]?.last_time_work;
        return lastTimeWork ?? 0;
    };

    const timestamp = getTimestampFromCurrentWP();

    if (!timestamp) {
        return <p>Timer not available</p>;
    }

    return (
        <p>
            <Countdown
                key={timestamp}
                date={(timestamp * 1000 - Date.now()) + Date.now()}
                renderer={formatTime}
            />
        </p>
    );
};

export default Timer;
