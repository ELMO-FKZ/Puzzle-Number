import "./footer.css"

function Footer() {

    const currentYear = new Date().getFullYear().toString()
    
    return (
        <div className="footer">
            <p> &copy; Copyright {currentYear} </p>
            Designed & built by <a className="footer__copyright-owner" href="https://elmo.onrender.com" target="_blank" rel="noopener noreferrer">ELMO</a>
        </div>
    )
}

export default Footer
