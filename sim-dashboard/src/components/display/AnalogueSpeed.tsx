import React from 'react';

interface SpeedProps {
    speed: number;
    maxSpeed?: number;
}

const AnalogueSpeed: React.FC<SpeedProps> = ({ speed, maxSpeed = 220 }) => {
    const rotation = (speed / maxSpeed) * 270; // 270 degree rotation range

    return (
        <div className="w-64 h-64 relative bg-black rounded-full shadow-lg">
            <div className="w-full h-full relative">
                {/* Speedometer face */}
                <div className="w-full h-full rounded-full border-8 border-gray-700 bg-gray-900 relative">
                    {/* Speedometer markings and numbers */}
                    {[...Array(23)].map((_, i) => (
                        <div
                            className={`${i % 2 === 0 ? 'w-[3px]' : 'w-[1px]'} h-[119px] bg-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 origin-top`}
                            style={{ transform: `rotate(${i * 12.5 + 45}deg)` }}
                        />
                    ))}
                    {/* Center cap */}
                    <div className="w-52 h-52 bg-gray-900 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                    <div className="w-8 h-8 bg-gray-800 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-2 border-gray-600" />
                </div>
                {/* Needle */}
                <div
                    className="absolute top-1/2 left-1/2 w-1 h-[45%] bg-orange-500 origin-bottom transition-transform duration-200 ease-out"
                    style={{ transform: `translate(-50%, -100%) rotate(${rotation - 135}deg)` }}
                >
                    <div className="w-3 h-3 rounded-full bg-orange-500 absolute -top-1 left-1/2 transform -translate-x-1/2" />
                </div>
                {/* Digital speed display */}
                <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 text-2xl font-bold text-white bg-gray-800 px-3 py-1 rounded">
                    {Math.round(speed)} mph
                </div>
            </div>
        </div>
    );
};

export default AnalogueSpeed;
