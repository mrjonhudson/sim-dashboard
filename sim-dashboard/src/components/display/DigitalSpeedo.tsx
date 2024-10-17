import React from 'react';
import { format } from 'date-fns';
import Time from './Time';

type DigitalSpeedoProps = {
    speed: number;
    gear: number;
    performance: number;
    error: string | null;
}

const DigitalSpeedo: React.FC<DigitalSpeedoProps> = ({ speed, gear, performance, error }) => {

    const getGearDisplay = (gear: number): string => {
        if (gear === 0) return 'R';
        if (gear === 1) return 'N';
        if (gear >= 2 && gear <= 999) return (gear - 1).toString();
        return 'N';
    };

    const displayGear = getGearDisplay(gear);

    return (
        <div className="bg-black text-white w-full h-full rounded-t-[128px] relative p-10 justify-center items-end flex flex-row shadow-inner shadow-gray-500">
            <div className={`text-white py-3 px-5 min-w-[50vw] rounded-[10px] absolute -top-3 left-1/2 transform -translate-x-1/2 text-sm ${performance > 0 ? "bg-red-500" : performance > -0.1 ? "bg-amber-500" : "bg-green-500"}`}>
                <p className="font-digital text-center text-xl">{performance.toFixed(3)}</p>
            </div>
            <div className="flex flex-row justify-between items-end w-full h-full border-b-4 border-white p-8">
                <div className="flex w-[100px] lg:w-[175px] justify-center items-end h-full">
                    <p className="text-7xl font-adlam text-center">{displayGear}</p>
                </div>
                <div className="flex justify-end min-w-[200px]  items-end">
                    <p className="font-digital text-8xl lg:text-9xl text-end">{"000"}</p>
                    <p className="text-4xl font-adlam text-center">mph</p>
                </div>
                <div className="flex justify-center items-end h-full">
                    <div className="flex flex-col w-[100px] overflow-hidden lg:w-[175px]">
                        {error && <div className="border-t-2 border-white py-2 text-red-500 text-sm">
                            <p>{"ERROR:"}</p>
                            <p className="line-clamp-1">{error}</p>
                        </div>}
                        <div className="border-t-2 border-b-2 border-white py-2">
                            <Time />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DigitalSpeedo;

