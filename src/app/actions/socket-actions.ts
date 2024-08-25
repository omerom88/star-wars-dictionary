export const openSocket = async () => {
    await fetch('http://localhost:3001/start-emission', {
        method: 'POST',
    });
};

export const stopSocket = async () => {
    await fetch('http://localhost:3001/stop-emission', {
        method: 'POST',
    });
};

export const resetSocket = async () => {
    await fetch('http://localhost:3001/reset-emission', {
        method: 'POST',
    });
};
