export const ExampleView = ({ content }: { content: string }) => {
    return (
        <div className="grid">
            <div className='col-offset-2 col-8'>
                <div className='m-1 p-2 border-round border-1 bg-white'>
                    <div className="flex flex-column md:flex-row">
                        <div className="flex align-items-center justify-content-center font-bold">
                            <p>{content}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExampleView;