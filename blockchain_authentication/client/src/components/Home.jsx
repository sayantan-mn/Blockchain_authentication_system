import React, { Component } from 'react';
import '../App.css';

class Home extends Component {

render() {
    return (
        <section className='home_content'>
            <div className="top_cnt">
            <h1>Enhance Your Security with Blockchain Authentication</h1>
            <p>Experience a secure, decentralized, and tamper-proof authentication system that gives you control over your digital identity.</p>
            </div>
            <div className='def1'>
            <div className='container'>
            <h1><strong>BLOCKCHAIN</strong></h1>
            <p>
            A blockchain is a distributed database or ledger shared across a computer network's nodes. 
            They are best known for their crucial role in cryptocurrency systems, maintaining a secure and decentralized record of transactions, but they are not limited to cryptocurrency uses. Blockchains can be used to make data in any industry immutable—meaning it cannot  be altered.
            </p>
            </div>
            </div>
            <div className='def2'>
            <h1><strong>AUTHENTICATION</strong></h1>
            <p>
            Authentication is the process of determining whether someone or something is who or what they say they are. Authentication technology provides access control for systems by checking to see if a user's credentials match the credentials in a database of authorized users or a data authentication server. In doing this, authentication ensures that systems, processes and enterprise information are secure.
            </p>
            
            
            </div>
            <div className='def3'>
            <div className='container2'>
            <h1>Blockchain authentication</h1>
            <p>
            Blockchain Authentication is a secure verification process in the blockchain network that 
            enhances transaction security and transparency. It utilizes cryptographic keys and digital signatures to authenticate users, devices, or systems, preventing identity theft and fraud.

            </p>
            </div>
            </div>
            <section className="section">
            <div className='container'>
            <h1>How Blockchain Authentication Works?</h1>
            <div className="features">
            <div className="features-item"><strong>Decentralized Identity:</strong> No central authority—your identity is secured through cryptographic keys.</div>
            <div className="features-item"><strong>Immutable Ledger:</strong> Data stored on the blockchain is tamper-proof, ensuring authenticity.</div>
            <div className="features-item"><strong>Smart Contracts:</strong> Automated verification through code, reducing human error and increasing trust.</div>
            <div className="features-item"><strong>Enhanced Privacy:</strong> Your data is stored securely without a central database, protecting you from data breaches.</div>
            </div>
            </div>
            </section>
            <section className="benefits">
        <h1>Benifits and its uses</h1>
        <div className="benefit-items">
            <div className="benefit-item"><strong>Enhanced Security:</strong> Advanced cryptography for secure authentication.</div>
            <div className="benefit-item"><strong>Transparency:</strong> Every action is recorded, preventing fraud.</div>
            <div className="benefit-item"><strong>Increased Efficiency:</strong> Automated processes reduce delays and human intervention.</div>
            <div className="benefit-item"><strong>User Control:</strong> Empowers users with self-sovereign identity management.</div>
            <div className="benefit-item"><strong>Immutable records:</strong> Transactions are permanently recorded onthe blockchain, ensuring data integrity andpreventing tampering.</div>
            <div className="benefit-item"><strong>Smart Contracts:</strong> They run on the blockchain network, automatically enforcing and executing the terms of the contract when specific conditions are met. </div>
        </div>
    </section>
    <section className="section_use-cases">
        <h1>Applications and use cases</h1>
        <ul className="use-cases-list">
            <li><strong>Finance:</strong> Secure, decentralized authentication for digital banking.</li>
            <li><strong>Healthcare:</strong> Protecting sensitive patient information with immutable records.</li>
            <li><strong>Supply Chain:</strong> Verify and track products through each step, reducing fraud.</li>
            <li><strong>Voting:</strong> Enable secure and transparent digital voting.</li>
        </ul>
        </section>
        </section>
        
    );
}

}

export default Home;