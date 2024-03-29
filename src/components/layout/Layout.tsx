import { Outlet } from "react-router-dom"
import Header from "../header/Header"
import Footer from "../footer/Footer"
import "./layout.css"

const Layout = () => {

    return (
        <div className="main">
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}

export default Layout