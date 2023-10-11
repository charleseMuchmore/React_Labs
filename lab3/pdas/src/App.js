import 'bulma/css/bulma.css';
import ProfileCard from './ProfileCard'
import AlexaImage from './images/alexa.png';
import CortanaImage from './images/cortana.png';
import SiriImage from './images/siri.png';



function App() {
    return (
        <div>
            <section className="hero is-primary">
                <div className="hero-body">
                    <p className="title">Personal Digital Assistants</p>
                </div>
            </section>

            <div className="container">
                <section className="section">
                    <div className="columns">
                        <div className="column is-4">
                            <ProfileCard 
                            title="Alexa" 
                            handle="@alexa99" 
                            image={AlexaImage}
                            description="From Amazon."
                            />
                        </div>
                        <div className="column is-4">
                            <ProfileCard 
                            title="Cortana" 
                            handle="@corty04" 
                            image={CortanaImage}
                            description="From Microsoft."
                            />
                        </div>
                        <div className="column is-4">
                            <ProfileCard 
                            title="Siri" 
                            handle="@sirius01" 
                            image={SiriImage}
                            description="From Apple."
                            />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default App;