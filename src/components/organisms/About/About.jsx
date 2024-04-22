import './about.css'
import AboutImg from '../../../assets/img/about.webp'
import Button from '../../molecules/Button/Button'

const About = () => {
    return (
        <section id='about'>
            <h2>About me</h2>
            <figure>
                <img src={AboutImg} alt="image avec des photos de profil de face et de dos d'Emeline"></img>
            </figure>
            <Button text="Know me"/> 
        </section>
    )
}

export default About;