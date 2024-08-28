type FullScreenText = {
    text: string;
};

export const FullScreenText = ({ text }: FullScreenText) => {
    return (
        <div className="p-4 flex justify-center items-center h-screen">
            <p>{text}</p>
        </div>
    );
};
