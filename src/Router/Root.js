import { useState } from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@chakra-ui/react";

export default function Root() {

    const location = useLocation()
    const [toggleMenuOpened, setToggleMenuOpened] = useState(false);

    const renderToggleMenu = () => {
        return (
            <div className="position-absolute top-20 end-0 bg-light" style={{zIndex:10, width:'100%', height:'100%'}}>
                <div className="w-100 d-flex px-5 pt-4 pb-0 justify-content-end">
                    <span onClick={() => setToggleMenuOpened(false)}>
                        <button className="btn">
                            <FontAwesomeIcon icon={faX} />
                        </button>
                    </span>
                </div>
                <div className="navbar-nav p-5 gap-5 align-items-center w-100">
                    <NavLink className="nav-link" exact="true" to={`/search`}>
                        <div onClick={() => setToggleMenuOpened(false)}>
                            Search
                        </div>
                    </NavLink>
                    <NavLink className="nav-link" exact="true" to={`/connect`}>
                        <div onClick={() => setToggleMenuOpened(false)}>
                            Connect
                        </div>
                    </NavLink>
                    {sessionStorage.getItem('user') !== null && sessionStorage.getItem('user') !== 'null' && sessionStorage.getItem('role') == 'influencer' && (
                        <NavLink className="nav-link" exact="true" to={`/discuss`}>
                            <div onClick={() => setToggleMenuOpened(false)}>
                                Discuss
                            </div>
                        </NavLink>
                    )}
                    {/* TODO: remove profile/userID link from nav once setup somewhere else */}
                    <NavLink className="nav-link" exact="true" to={`/profile/1`}>
                        <div onClick={() => setToggleMenuOpened(false)}>
                            Public Profile
                        </div>
                    </NavLink>
                    {sessionStorage.getItem('user') === null || sessionStorage.getItem('user') === 'null' ? (
                        <NavLink className="nav-link" exact="true" to={`/login`}>
                            <div onClick={() => setToggleMenuOpened(false)}>
                                Login
                            </div>
                        </NavLink>
                    ) : (
                        <NavLink className="nav-link" exact="true" to={`/profile`}>
                            <div onClick={() => setToggleMenuOpened(false)}>
                                Profile
                            </div>
                        </NavLink>
                    )}
                </div>
            </div>
        )
    }

    return (
        <div className="p-3">
            <div id="sidebar" className="d-flex gap-3 mb-3">
                <nav className="navbar navbar-expand-lg bg-body-tertiary w-100">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/" style={{fontWeight:700, fontSize:32}}>Glitz Guide</a>
                    <button onClick={() => setToggleMenuOpened(!toggleMenuOpened)} className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse ms-5" id="navbarNavAltMarkup">
                        <div className="navbar-nav gap-5 align-items-center w-100">
                            <NavLink className="nav-link" exact="true" to={`/search`}>Search</NavLink>
                            <NavLink className="nav-link" exact="true" to={`/connect`}>Connect</NavLink>
                            {sessionStorage.getItem('user') !== null && sessionStorage.getItem('user') !== 'null' && sessionStorage.getItem('role') == "influencer" && (
                                <NavLink className="nav-link" exact="true" to={`/discuss`}>Discuss</NavLink>
                            )}
                            {/* TODO: remove profile/userID link from nav once setup somewhere else */}
                            <NavLink className="nav-link" exact="true" to={`/profile/1`}>Public Profile</NavLink>
                            {sessionStorage.getItem('user') === null || sessionStorage.getItem('user') === 'null' ? (
                                <NavLink className="nav-link ms-auto" exact="true" to={`/login`}>
                                    <Button variant='solid' colorScheme='pink'>
                                        Login
                                    </Button>
                                </NavLink>
                            ) : (
                                <NavLink className="nav-link ms-auto" exact="true" to={`/profile`}>
                                    <Button variant='solid' colorScheme='pink'>
                                        Profile
                                    </Button>
                                </NavLink>
                            )}
                        </div>
                    </div>
                </div>
                </nav>
            </div>
            {toggleMenuOpened && renderToggleMenu()}
            <div id="detail">
                {location.pathname === "/" ? (
                    <div>
                        Welcome to Glitz Guide!
                    </div>
                ) : (
                    <Outlet />
                )}
            </div>
        </div>
    );
}