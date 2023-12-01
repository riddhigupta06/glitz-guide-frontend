import { Outlet } from "react-router-dom";

export default function Root() {
    return (
        <div>
            <div id="sidebar">
                <h1>Glitz Guide</h1>
                <nav>
                    <ul>
                    <li>
                        <a href={`/login`}>Login</a>
                    </li>
                    <li>
                        <a href={`/search`}>Search</a>
                    </li>
                    <li>
                        <a href={`/details/1`}>Details</a>
                    </li>
                    <li>
                        <a href={`/profile`}>Your profile</a>
                    </li>
                    <li>
                        <a href={`/profile/1`}>Public profile</a>
                    </li>
                    <li>
                        <a href={`/blog`}>Blog Posts</a>
                    </li>
                    </ul>
                </nav>
            </div>
            <div id="detail">
                <Outlet />
            </div>
        </div>
    );
}