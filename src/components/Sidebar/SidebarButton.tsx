import { Link } from 'react-router-dom'

export const SidebarButton = ({ path, header, icon }: { path: string, header: string, icon: string }) => {
    return (
        <>
            <div className="col-12">
                <Link to={path}>
                    <div className='bg-primary text-primary border-round hover:bg-white hover:text-purple-500'>
                        <div className="flex flex-column md:flex-row">
                            <div className="flex align-items-center p-2 justify-content-center font-bold border-round">
                                <i className={icon} />
                            </div>
                            <div className="flex align-items-center justify-content-center font-bold border-round">
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