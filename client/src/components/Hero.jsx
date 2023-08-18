function Hero({ coverPosts }){
    return(
        <div 
            style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', height:'50vh' }}
        >
            <div 
                style={{ display:'flex', }}
            >
                {/* main cover article */}
                <div
                    style={{ width:'70%' }}
                >
                    main cover article
                </div>

                {/* new/featured posts section */}
                <div
                    style={{ width:'30%' }}
                >
                    <h3>New</h3>
                </div>
            </div>
        </div>
    )
}

export { Hero }