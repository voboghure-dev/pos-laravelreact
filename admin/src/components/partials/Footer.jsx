const Footer = () => {
    return (
        <footer className="py-2 bg-light mt-auto">
            <div className="container-fluid px-4">
                <div className="d-flex align-items-center justify-content-between small">
                    <div className="text-muted">
                        Copyright &copy; ERPOnline {new Date().getFullYear()} |
                        Version 1.0.0
                    </div>
                    <div>
                        <a href="#">Privacy Policy</a>
                        &middot;
                        <a href="#">Terms &amp; Conditions</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
