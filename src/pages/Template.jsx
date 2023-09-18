import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/Sidebar";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { redirect } from "react-router-dom";
import Connect from "./Connect";

function Template() {
    const context = useContext(AuthContext)
    if (context.token != ""){
        return (
            <div className="app">
                <Sidebar />
                <main className="main">
                    <Outlet />
                </main>
            </div>
        )
    }else{
        return (
            <>
                <Connect />
            </>
        )
    }
}

export default Template;