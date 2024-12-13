import React from 'react';
import backgroundImage from './a.jpg';
function Home() {
  return (
    <div>
      {/* Internal CSS */}
      <style>
        {`
          body {
              font-family: Arial, sans-serif;
              margin: 0;
              padding: 0;
              background-color: #f5f5f5;
              background-image: url(${backgroundImage});
              background-position: center;
              background-repeat: no-repeat;
              background-size: cover; 
              min-height: 100vh;
              position: relative;
          }

          header {
              background-color: #4CAF50;
              color: white;
              text-align: center;
              padding: 20px 0;
          }

          header h1 {
              margin: 0;
              font-size: 2.5em;
              color: white;
          }

          nav {
              background-color: #333;
              text-align: center;
          }

          nav ul {
              list-style-type: none;
              margin: 0;
              padding: 0;
          }

          nav ul li {
              display: inline-block;
              margin-right: 20px;
          }

          nav ul li:last-child {
              margin-right: 0;
          }

          nav ul li a {
              display: block;
              color: white;
              text-decoration: none;
              padding: 10px 20px;
              transition: background-color 0.3s ease;
          }

          nav ul li a:hover {
              background-color: #555;
          }

          footer {
              width: 100%;
              background-color: #333;
              color: #fff;
              font-family: Arial, sans-serif;
              display: flex;
              flex-wrap: wrap;
              justify-content: space-between;
              padding: 20px;
              box-sizing: border-box;
              position: absolute;
              bottom: 0;
          }

          .footerLeft {
              flex: 1;
              display: flex;
              justify-content: space-between;
          }

          .footerMenu {
              min-width: 150px;
          }

          .fMenuTitle {
              font-size: 18px;
              margin-bottom: 10px;
              border-bottom: 2px solid #fff;
              padding-bottom: 5px;
              color:white;
          }

          .fList {
              list-style: none;
              padding: 0;
              margin: 0;
          }

          .fListItem {
              margin: 8px 0;
          }

          .fListItem a {
              color: #fff;
              text-decoration: none;
              transition: color 0.3s;
          }

          .fListItem a:hover {
              color: #ddd;
          }

          .footerRight {
              flex: 1;
              display: flex;
              flex-direction: column;
              align-items: flex-end;
          }

          .footerRightMenu {
              margin-bottom: 20px;
              text-align: right;
          }

          .fMail {
              display: flex;
              flex-wrap: wrap;
              align-items: center;
              margin-top: 20px;
          }

          .fInput {
              padding: 10px;
              border: none;
              border-radius: 5px;
              margin-right: 10px;
              flex: 1;
              font-size: 14px;
          }

          .fButton {
              padding: 10px 20px;
              background-color: #555;
              color: #fff;
              border: none;
              border-radius: 5px;
              cursor: pointer;
              transition: background-color 0.3s;
          }

          .fButton:hover {
              background-color: #777;
          }

          .fIcons {
              display: flex;
              margin-top: 20px;
          }

          .fIcon {
              width: 30px;
              height: 30px;
              margin-right: 10px;
              cursor: pointer;
              transition: opacity 0.3s;
              color: white;
          }

          .fIcon:hover {
              opacity: 0.7;
          }

          .copyright {
              font-size: 14px;
              color: #bbb;
              margin-top: auto;
              align-self: flex-end;
          }

          @media (max-width: 768px) {
              .footerLeft, .footerRight {
                  flex-basis: 100%;
                  margin-bottom: 20px;
              }

              .fMail {
                  flex-direction: column;
                  align-items: stretch;
              }

              .footerRightMenu {
                  text-align: center;
              }
          }
        `}
      </style>
      {/* Header */}
      <header>
        <h1>Welcome to Our CRM System</h1>
      </header>

      {/* Navigation */}
      <nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/features">Product Features</a></li>
          <li><a href="/outlets">Company Outlets</a></li>
          <li><a href="/price">Pricing Details</a></li>
          <li><a href="/complaints_form">Register Complaint</a></li>
          <li><a href="/complaints_status">Complaint Status</a></li>
        </ul>
      </nav>

      {/* Footer */}
      <footer>
        <div className="footerLeft">
          <div className="footerMenu">
            <h1 className="fMenuTitle">Company</h1>
            <ul className="fList">
              <li className="fListItem"><a href="#about">About Us</a></li>
              <li className="fListItem"><a href="#contact">Contact</a></li>
              <li className="fListItem"><a href="#careers">Careers</a></li>
              <li className="fListItem"><a href="#partners">Partners</a></li>
              <li className="fListItem"><a href="#locations">Locations</a></li>
            </ul>
          </div>
          <div className="footerMenu">
            <h1 className="fMenuTitle">Support</h1>
            <ul className="fList">
              <li className="fListItem"><a href="#documentation">Documentation</a></li>
              <li className="fListItem"><a href="#tutorials">Tutorials</a></li>
              <li className="fListItem"><a href="#faq">FAQ</a></li>
              <li className="fListItem"><a href="#community">Community Forum</a></li>
              <li className="fListItem"><a href="#contact-support">Contact Support</a></li>
            </ul>
          </div>
          <div className="footerMenu">
            <h1 className="fMenuTitle">Products</h1>
            <ul className="fList">
              <li className="fListItem"><a href="#sales">Sales Management</a></li>
              <li className="fListItem"><a href="#marketing">Marketing Automation</a></li>
              <li className="fListItem"><a href="#customer-service">Customer Service</a></li>
              <li className="fListItem"><a href="#analytics">Analytics</a></li>
              <li className="fListItem"><a href="#integrations">Integrations</a></li>
            </ul>
          </div>
        </div>
        <div className="footerRight">
          <div className="footerRightMenu">
            <h1 className="fMenuTitle">Subscribe to our newsletter</h1>
            <div className="fMail">
              <input type="text" placeholder="your@gmail.com" className="fInput" />
              <button className="fButton">Join!</button>
            </div>
          </div>
          <div className="footerRightMenu">
            <h1 className="fMenuTitle">Follow Us</h1>
            <div className="fIcons">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><img src="facebook.png" alt="Facebook" className="fIcon" /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><img src="twitter.png" alt="Twitter" className="fIcon" /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><img src="instagram.png" alt="Instagram" className="fIcon" /></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><img src="linkedin.png" alt="LinkedIn" className="fIcon" /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
