import { useState, useCallback } from 'react';

export type StreamDataType = {
    speed: number;
    gear: number;
    rpm: number;
    performance: number;
    error?: string;
}

const useDataStream = () => {
    const [data, setData] = useState<StreamDataType>({
        speed: 0,
        gear: 0,
        rpm: 0,
        performance: 0,
    });
    const [error, setError] = useState<string | null>(null);

    const startStreaming = useCallback((pin: string) => {
        const streamUrl = 'http://192.168.1.247:3001/stream';
        const authToken = btoa(pin); // Base64 encode the PIN

        const setupEventSource = () => {
            const eventSource = new EventSource(streamUrl, {
                withCredentials: true,
                headers: {
                    'Authorization': `Bearer ${authToken}`
                }
            } as EventSourceInit);

            eventSource.onmessage = (event: MessageEvent) => {
                const newData: StreamDataType = JSON.parse(event.data);
                if (newData.error) {
                    setError(newData.error);
                    // setData(null);
                } else {
                    setError(null);
                    setData(newData);
                }
            };

            eventSource.onerror = (errorEvent: Event) => {
                console.error('EventSource failed:', errorEvent);
                setError('Connection failed. Falling back to polling.');
                eventSource.close();
                pollData(authToken);
            };
        };

        const pollData = (token: string) => {
            fetch(streamUrl, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then((newData: StreamDataType) => {
                    if (newData.error) {
                        setError(newData.error);
                        // setData(null);
                    } else {
                        setError(null);
                        setData(newData);
                    }
                    setTimeout(() => pollData(token), 100);
                })
                .catch(error => {
                    setError('Failed to fetch data. Retrying...');
                    setTimeout(() => pollData(token), 1000);
                });
        };

        if (typeof EventSource !== 'undefined') {
            setupEventSource();
        } else {
            console.log('EventSource not supported, falling back to polling');
            pollData(authToken);
        }
    }, []);

    return { data, error, startStreaming };
};

export default useDataStream;
