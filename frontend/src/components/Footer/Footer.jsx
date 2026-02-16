import React from "react";

function Footer() {
    return (
        <>
            <footer className="bg-dark text-light py-5">
                <div className="container">
                    <div className="row">

                        <div className="col-md-3 mb-4">
                            <h5 className="text-primary fw-bold">LabourLink</h5>
                            <small>Connecting Hands to Work</small>
                            <p className="mt-3" style={{ fontSize: "13px" }}>
                                Empowering daily wage workers across India by connecting them with meaningful employment opportunities while helping employers find skilled, reliable workers.
                            </p>
                            {/* <p style={{ fontSize: "13px" }}>
                                <i className="bi bi-geo-alt"></i> Sector 62, Noida, UP 201309<br />
                                <i className="bi bi-telephone"></i> 1800-123-456<br />
                                <i className="bi bi-envelope"></i> help@labourlink.in
                            </p> */}
                        </div>

                        <div className="col-md-2 mb-4">
                            <h6 className="fw-bold">Quick Links</h6>
                            <ul className="list-unstyled" style={{ fontSize: "13px" }}>
                                <li><a href="#" className="text-light text-decoration-none">Home</a></li>
                                <li><a href="#" className="text-light text-decoration-none">Find Work</a></li>
                                <li><a href="#" className="text-light text-decoration-none">Post Jobs</a></li>
                                <li><a href="#" className="text-light text-decoration-none">Contact</a></li>
                            </ul>
                        </div>

                        <div className="col-md-2 mb-4">
                            <h6 className="fw-bold">About</h6>
                            <ul className="list-unstyled" style={{ fontSize: "13px" }}>
                                <li><a href="#" className="text-light text-decoration-none">About Us</a></li>
                                <li><a href="#" className="text-light text-decoration-none">How It Works</a></li>
                                {/* <li><a href="#" className="text-light text-decoration-none">Success Stories</a></li> */}
                                {/* <li><a href="#" className="text-light text-decoration-none">Press & Media</a></li> */}
                            </ul>
                        </div>

                        <div className="col-md-2 mb-4">
                            <h6 className="fw-bold">Legal & Policies</h6>
                            <ul className="list-unstyled" style={{ fontSize: "13px" }}>
                                <li><a href="#" className="text-light text-decoration-none">Terms of Service</a></li>
                                <li><a href="#" className="text-light text-decoration-none">Privacy Policy</a></li>
                                <li><a href="#" className="text-light text-decoration-none">Safety Guidelines</a></li>
                                <li><a href="#" className="text-light text-decoration-none">Community Standards</a></li>
                            </ul>
                        </div>

                    </div>
                    <hr className="border-secondary" />
                    <div className="text-center" style={{ fontSize: "13px" }}>
                        © 2025 LabourLink Technologies Pvt. Ltd. All rights reserved. |
                        <span className="text-danger"> ❤️ </span> Made in India |
                        {/* Available in: <span className="text-info">EN</span> / <span className="text-info">हिंदी</span> */}
                    </div>
                </div>
            </footer>
        </>
    );
}

export default Footer;
