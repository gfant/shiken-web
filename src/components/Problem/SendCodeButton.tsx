export const SendButton = ({content}: {content:string}) => {
    return (
        <div className="grid">
            <div className='col-offset-5 col-2'>
                <div className='m-1 p-1 border-round hover:border-1 bg-primary hover:bg-white hover:text-purple-500'>
                    <div className="flex align-items-center justify-content-center font-bold">
                        <div className="flex flex-column md:flex-row">
                            <p>{content}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SendButton;