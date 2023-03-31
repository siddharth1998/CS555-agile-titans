import './ContactUs.css';

const ContactUs = () => {
    return (
        <div className='contactUs-body'>
            <section>

                <div className="section-header">
                    <div className="container">
                        <h2>Get In Touch With Us</h2>
                        <p>solar pannels</p>
                    </div>
                </div>

                <div className="container">
                    <div className="roww">

                        <div className="contact-info">
                            <div className="contact-info-item">
                                <div className="contact-info-icon">
                                    <i className="fas fa-home"></i>
                                </div>

                                <div className="contact-info-content">
                                    <h4>Address</h4>
                                    <p>stevens,<br /> hoboken, <br />07030</p>
                                </div>
                            </div>

                            <div className="contact-info-item">
                                <div className="contact-info-icon">
                                    <i className="fas fa-phone"></i>
                                </div>

                                <div className="contact-info-content">
                                    <h4>Phone</h4>
                                    <p>000-000-0000</p>
                                </div>
                            </div>

                            <div className="contact-info-item">
                                <div className="contact-info-icon">
                                    <i className="fas fa-envelope"></i>
                                </div>

                                <div className="contact-info-content">
                                    <h4>Email</h4>
                                    <p>example@stevens.edu</p>
                                </div>
                            </div>
                        </div>

                        <div className="contact-form">
                            <form action="" id="contact-form">
                                <h2>Send Message</h2>
                                <div className="input-box">
                                    <input type="text"  name="" />
                                    <span>Full Name</span>
                                </div>

                                <div className="input-box">
                                    <input type="email"  name="" />
                                    <span>Email</span>
                                </div>

                                <div className="input-box">
                                    <textarea  name=""></textarea>
                                    <span>Type your Message...</span>
                                </div>

                                <div className="input-box">
                                    <input type="submit" value="Send" name="" />
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </section>

        </div>
    );
};

export default ContactUs;