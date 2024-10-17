import React, { useState, useMemo } from 'react';
import useDataStream, { StreamDataType } from '../hooks/useDataStream';
import AnalogueSpeed from './display/AnalogueSpeed';
import DigitalSpeedo from './display/DigitalSpeedo';

const StreamData: React.FC = React.memo(() => {
    const { data, error, startStreaming } = useDataStream();
    const [pin, setPin] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        startStreaming(pin);
        setIsSubmitted(true);
    };

    const renderContent = useMemo(() => {
        if (!isSubmitted) {
            return (
                <div className="flex items-center justify-center w-screen h-screen">
                    <form onSubmit={handleSubmit} className="flex flex-col items-center border-2 border-orange-500 rounded-lg px-40 py-20">
                        <input
                            value={pin}
                            onChange={(e) => setPin(e.target.value)}
                            placeholder="Enter PIN"
                            className="mb-4 p-2 border rounded text-black"
                        />
                        <button type="submit" className="p-2 bg-orange-500 text-white rounded">
                            Submit
                        </button>
                    </form>
                </div>
            );
        }

        return (
            <div className="flex items-center justify-center w-screen h-screen flex-col">
                <div className="flex flex-col items-center justify-center max-h-[500px] w-full h-full px-16 py-8">
                    <DigitalSpeedo speed={data.speed} gear={data.gear} performance={data.performance} error={error} />
                    {/* <AnalogueSpeed speed={data.speed} /> */}
                </div>
            </div>
        );
    }, [isSubmitted, pin, data, error]);

    return renderContent;
});

export default StreamData;
