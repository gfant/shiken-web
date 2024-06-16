import { Link } from 'react-router-dom'

export const SidebarButton = ({ path, header, icon }: { path: string, header: string, icon: string }) => {
    return (
        <>
            <div className="col-offset-1 col-10">
                <Link to={path}>
                    <div className='bg-primary text-primary border-round p-3 hover:bg-white hover:text-purple-500'>
                        <div className="flex flex-column md:flex-row">
                            <div className="flex align-items-center p-1 justify-content-center font-bold border-round">
                                <i className={icon} />
                            </div>
                            <div className="flex align-items-center p-1 justify-content-center font-bold border-round">
                                <p>{header}</p>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </>
    );
};

export default SidebarButton;