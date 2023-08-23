/* loading screen to be used while fetching data from server */
import foShizzle from '../assets/snoop.gif'

function Loading() {
    return (
        <div
            style={{ 
                display:'flex', 
                alignItems:'center', 
                justifyContent:'center', 
                width:'100%', 
                padding:'5%' 
            }}
        >
            <img 
                src={foShizzle} 
                alt="Our developers are loading your stuff"
            />
        </div>
    )
}

export default Loading