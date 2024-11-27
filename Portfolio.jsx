import React from 'react';
import '/src/css/Portfolio.css'; 
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link } from 'react-router-dom';

const Portfolio = () => {
    return (
        <div>
            <section className="home text-center">
                <div className="container">
                    <h1 className="display-4">Welcome to My Business Blaster Project!</h1>
                    <p className="lead">
                        This is the testing phase where I am creating and checking all the features 
                        required to build a comprehensive Business Blaster website. This platform aims 
                        to empower student entrepreneurs by providing tools and resources to launch 
                        and grow their business ideas.
                    </p>
                    <p>
                        Here, you can explore the functionalities that allow students to collaborate, 
                        showcase their work, and connect with potential partners. My goal is to create 
                        an engaging, dynamic application that enhances user experience while fostering 
                        a vibrant entrepreneurial community.
                    </p>
                    <p className="mb-4">
                        Join me as I embark on this exciting journey to revolutionize the way students 
                        approach entrepreneurship!
                    </p>
                    <Link to="/AuthForm" className="btn btn-primary btn-lg btn-custom">Continue to Project</Link>
                </div>
            </section>
            <footer className="text-center mt-5">
                <div className="container">
                    <h4>Connect with Me</h4>
                    <div className="social-icons">
                        <a href="#"><i className="fa-brands fa-linkedin"></i></a>
                        <a href="#"><i className="fa-brands fa-github"></i></a>
                        <a href="#"><i className="fa-brands fa-x-twitter"></i></a>
                        <a href="#"><i className="fa-brands fa-instagram"></i></a>
                    </div>
                </div>
            </footer>
        </div>
        );
    };

export default Portfolio;
