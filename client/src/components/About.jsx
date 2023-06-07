function About(){
    return(
        <>
            <div className="aboutHeader">
                <p>New ideas start <strong>here.</strong></p> 
            </div>
            <div className="aboutSummary">
                <div className="summaryLeft">
                    <p>
                        Welcome to Bloggy, the cutting-edge digital platform, that provides unparalleled coverage and analysis of the latest groundbreaking trends, technologies, and advancements shaping the tech landscape. Our expert contributors leverage their deep domain expertise to deliver thought-provoking articles and curated insights, keeping our readers at the forefront of the digital revolution. With a seamless user experience and an intuitive interface, you can easily dive into our content ecosystem, spanning areas like artificial intelligence, blockchain, cloud computing, Internet of Things (IoT) and quantum computing to stay ahead of the innovation curve.
                    </p>
                    <br />
                    <p>
                        At Bloggy, we are passionate about fueling tech-driven disruption and empowering the global tech community. Bloggy serves as a melting pot of knowledge, fostering collaboration and driving synergies between diverse stakeholders. From startups to Fortune 500 companies, our exclusive features and in-depth interviews shed light on the strategies employed by trailblazing entrepreneurs and visionaries, unlocking the secrets behind their unprecedented success. Seamlessly integrating multimedia content, Bloggy is an immersive destination where tech aficionados can satiate their thirst for disruptive innovations, uncover emerging trends, and explore the frontiers of tomorrow's technologies.
                    </p>
                </div>
                <div className="summaryRight">
                    <video muted="" loop="infinite" playsInline={true} autoPlay={true} data-src="https://cdn.dribbble.com/users/975591/screenshots/15061825/media/dda67eaae00bea483c877ab5ae438d3e.mp4" data-video-small="https://cdn.dribbble.com/users/975591/screenshots/15061825/media/a9d49a36c1cef4c09eec37e65c0a7881.mp4" data-video-medium="https://cdn.dribbble.com/users/975591/screenshots/15061825/media/7bfab71f65e6e1e2c38eae1c96b8c20d.mp4" data-video-large="https://cdn.dribbble.com/users/975591/screenshots/15061825/media/dda67eaae00bea483c877ab5ae438d3e.mp4" src="https://cdn.dribbble.com/users/975591/screenshots/15061825/media/a9d49a36c1cef4c09eec37e65c0a7881.mp4"></video>
                </div>
            </div>
            <div className="aboutUserSpotLight">
                <h1 style={{marginBottom:'30px'}}>A melting pot of curious minds.</h1>
                <p>Bloggy is fueled by a vibrant community of users. From passionate enthusiasts to seasoned experts, users flock to Bloggy to share their ideas, experiences, and perspectives. Engaging in lively discussions, they contribute to a diverse tapestry of knowledge and insights. With a spirit of inclusivity and collaboration, Bloggy encourages users of all backgrounds to actively participate and connect with one another. Together, they form a dynamic network that fuels the growth and vitality of the platform, making Bloggy a thriving hub for engaging content and meaningful interactions.</p>
            </div>
        </>
    )
}

export { About }