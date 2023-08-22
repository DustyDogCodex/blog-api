import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons"
import { usersAndImages } from "../assets/usersAndImages"
import { Spotlight } from "./Spotlight"
import { Container } from "react-bootstrap"
import useMediaQuery from "../hooks/useMediaQuery"

function About(){
    //custom media query
    const aboveMediumScreens = useMediaQuery('(min-width:1060px)')

    //mapping usernames + avatars into soptlight components for display in user spotlights section
    const spotLightElements = usersAndImages.map((user,index) => 
        <Spotlight 
            key={index} 
            avatar={user.avatar} 
            username={user.username}
        /> 
    )

    return(
        <>
            {/* Main heading */}
            <div 
                style={{ 
                    display:'flex', 
                    alignItems:'center', 
                    justifyContent:'center', 
                    height:'20rem', 
                    borderBottom:'1px solid black', 
                    fontSize:`${ aboveMediumScreens ? '5rem' : '2rem' }`
                }}
            >
                <p>New ideas start <strong>here.</strong></p> 
            </div>

            {/* about us/introduction section. This is split in 2 sections */}
            <div 
                style={{ 
                    display:'flex', 
                    flexDirection:`${ aboveMediumScreens ? 'row' : 'column' }`,
                    justifyContent:'space-between', 
                    alignItems:'center', 
                    borderBottom:'1px solid black' 
                }}
            >
                {/* left hand section */}
                <div
                    style={{ 
                        width:`${ aboveMediumScreens ? '50%' : '100%' }`, 
                        height:'100%', 
                        padding:`${ aboveMediumScreens ? '2rem 4rem' : '1rem' }`, 
                        borderRight:`${ aboveMediumScreens ? '1px solid black' : 'none' }`,
                        borderBottom:`${ aboveMediumScreens ? 'none' : '1px solid black' }`,
                        textAlign:`${ aboveMediumScreens ? 'left' : 'center' }`
                    }}
                >
                    <p>
                        Welcome to Bloggy, the cutting-edge digital platform, that provides unparalleled coverage and analysis of the latest groundbreaking trends, technologies, and advancements shaping the tech landscape. Our expert contributors leverage their deep domain expertise to deliver thought-provoking articles and curated insights, keeping our readers at the forefront of the digital revolution. With a seamless user experience and an intuitive interface, you can easily dive into our content ecosystem, spanning areas like artificial intelligence, blockchain, cloud computing, Internet of Things (IoT) and quantum computing to stay ahead of the innovation curve.
                    </p>
                    <br />
                    <p>
                        At Bloggy, we are passionate about fueling tech-driven disruption and empowering the global tech community. Bloggy serves as a melting pot of knowledge, fostering collaboration and driving synergies between diverse stakeholders. From startups to Fortune 500 companies, our exclusive features and in-depth interviews shed light on the strategies employed by trailblazing entrepreneurs and visionaries, unlocking the secrets behind their unprecedented success. Seamlessly integrating multimedia content, Bloggy is an immersive destination where tech aficionados can satiate their thirst for disruptive innovations, uncover emerging trends, and explore the frontiers of tomorrow's technologies.
                    </p>
                </div>

                {/* right hand section with video */}
                <div 
                    style={{ 
                        width:`${ aboveMediumScreens ? '50%' : '100%' }`, 
                        height:'100%', 
                        display:'flex', 
                        alignItems:'center', 
                        justifyContent:'center' 
                    }}
                >
                    <video 
                        style={{ width:'30rem', height:'30rem' }}
                        muted="" 
                        loop="infinite" 
                        playsInline={true} 
                        autoPlay={true} 
                        data-src="https://cdn.dribbble.com/users/975591/screenshots/15061825/media/dda67eaae00bea483c877ab5ae438d3e.mp4" 
                        data-video-small="https://cdn.dribbble.com/users/975591/screenshots/15061825/media/a9d49a36c1cef4c09eec37e65c0a7881.mp4" 
                        data-video-medium="https://cdn.dribbble.com/users/975591/screenshots/15061825/media/7bfab71f65e6e1e2c38eae1c96b8c20d.mp4" 
                        data-video-large="https://cdn.dribbble.com/users/975591/screenshots/15061825/media/dda67eaae00bea483c877ab5ae438d3e.mp4" 
                        src="https://cdn.dribbble.com/users/975591/screenshots/15061825/media/a9d49a36c1cef4c09eec37e65c0a7881.mp4" 
                    />
                </div>
            </div>

            {/* user spotlight section */}
            <div 
                style={{ 
                    display:'flex', 
                    alignItems:'center', 
                    flexDirection:'column', 
                    justifyContent:'center', 
                    padding:`${ aboveMediumScreens ? '3.5% 15%' : '1rem' }`, 
                    textAlign:'center', 
                    background:'#ffd1b9',
                    height:'fit-content'
                }}
            >
                <h1 
                    style={{ 
                        fontSize: '3rem', 
                        marginBottom:'2rem' 
                    }}
                >
                    A melting pot of curious minds
                </h1>
                
                <p style={{ fontSize:'1.2rem' }}>Bloggy is fueled by a vibrant community of users. From passionate enthusiasts to seasoned experts, users flock to Bloggy to share their ideas, experiences, and perspectives. Engaging in lively discussions, they contribute to a diverse tapestry of knowledge and insights. With a spirit of inclusivity and collaboration, Bloggy encourages users of all backgrounds to actively participate and connect with one another. Together, they form a dynamic network that fuels the growth and vitality of the platform, making Bloggy a thriving hub for engaging content and meaningful interactions.</p>
                
                {/* user spotlight display */}
                <div 
                    style={{ 
                        width:'100%', 
                        height: 'max-content', 
                        display:'grid', 
                        padding:'2rem', 
                        gap:'3%', 
                        gridTemplateColumns:`${ aboveMediumScreens ? 'repeat(3,1fr)' : 'repeat(1,1fr)' }`, 
                        gridTemplateRows:`${ aboveMediumScreens ? 'repeat(3,1fr)' : 'repeat(12,1fr)' }` 
                    }}
                >
                    { spotLightElements }
                </div>
            </div>

            {/* contact me section */}
            <div
                style={{ 
                    display:'flex', 
                    flexDirection:`${ aboveMediumScreens ? 'row' : 'column' }`,
                    background:'#34a245' 
                }}
            >
                {/* left hand section */}
                <div 
                    className="contactSection"
                    style={{ 
                        borderRight:`${ aboveMediumScreens ? '1px solid black' : 'none' }`,
                        borderBottom:`${ aboveMediumScreens ? 'none' : '1px solid black' }` 
                    }}
                >
                    <h1 
                        style={{ 
                            fontSize:`${ aboveMediumScreens ? '4rem' : '3rem' }`, 
                            padding:'2%', 
                            color:'white',
                            textAlign:`${ aboveMediumScreens ? 'left' : 'center' }`
                        }}
                    >
                        Learn more about this website. Or contact me.
                    </h1>
                </div>

                {/* right hand section */}
                <div className="contactSection">
                    <a 
                        href="https://github.com/DustyDogCodex/bloggy"
                        target="_blank" 
                        rel="noopener"
                    >
                        <FontAwesomeIcon 
                            icon={faGithub} 
                            style={{ color: "white", height:'50px', width:'50px', margin:'20px' }} 
                        />
                    </a>
                    <a 
                        href="https://twitter.com/VarunMalaviya2"
                        target="_blank" 
                        rel="noopener" 
                    >
                        <FontAwesomeIcon 
                            icon={faTwitter} 
                            style={{ color: "#055ffa", height:'50px', width:'50px', margin:'20px' }} 
                        />
                    </a>
                </div>
            </div>
        </>
    )
}

export { About }