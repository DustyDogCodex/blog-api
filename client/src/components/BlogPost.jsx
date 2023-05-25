import { faPenToSquare } from "@fortawesome/free-regular-svg-icons"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

function BlogPost(){
    return(
        <div className="blogPost">
            <img src="https://img.freepik.com/free-photo/beautiful-shot-crystal-clear-lake-snowy-mountain-base-during-sunny-day_181624-5459.jpg?w=1800&t=st=1685055781~exp=1685056381~hmac=908a5fea6ad0fd99a4aabe0bc038b23220941a60ed5264fe6269b9645e4fbab4" alt="" className="blogImg"/>
            <h1 className="blogTitle">
                Title for this blog post.
                <div className="blogCRUD">
                    <FontAwesomeIcon icon={faPenToSquare} style={{height:'30px', width:'30px',color: "#1c71d8",}} />
                    <FontAwesomeIcon icon={faTrash} style={{height:'30px', width:'30px',color: "#e01b24",}} />
                </div>
            </h1>
            <div className="blogInfo">
                <span className="blogAuthor">Written by <strong>Maximus Dickus</strong></span>
                <span className="blogDate">Created <em>1 hr ago</em></span>
            </div>
            <p className="blogText">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. In, cupiditate? Mollitia aspernatur distinctio doloremque facere porro natus illum doloribus consequuntur atque voluptatum at sint saepe tempora cumque, aliquam nihil numquam aliquid obcaecati eligendi, harum earum, voluptatibus amet. Culpa odio omnis eveniet nihil quod soluta ea animi aliquam! Totam fugiat iusto, nemo similique nesciunt dolorem ipsam corrupti minus, deleniti, minima tempore! Porro, distinctio voluptatem nostrum perspiciatis recusandae excepturi rem consectetur voluptatum magni totam hic eius voluptas ab doloremque ratione ea provident atque illo quos, neque, optio fugit? Fugiat sunt beatae quisquam adipisci modi aliquid, praesentium id voluptate aspernatur, possimus eligendi mollitia eaque esse rerum asperiores amet hic quos quis vel. Delectus dolorum officiis corrupti, voluptate illum nobis placeat cumque, sunt reprehenderit natus, explicabo iste accusamus excepturi. Dolores ab in eos repellat provident veritatis! Fugit, aperiam deserunt. Deserunt qui debitis iusto perferendis accusantium inventore nihil culpa animi quidem modi, tenetur quam quos laborum omnis aliquid quaerat laudantium officiis mollitia rerum quae voluptates odio consequatur non. Temporibus delectus repudiandae facilis doloribus provident nobis, fugiat, pariatur atque harum magni saepe eaque natus consectetur voluptatibus voluptatem. Nostrum quia ipsam ipsum? Alias earum corrupti voluptates optio reprehenderit nisi similique dolorem labore quam magnam nulla, aliquam recusandae officia atque totam a cupiditate dignissimos eveniet est laboriosam libero consectetur aliquid soluta! Ratione doloribus mollitia molestiae neque quaerat consectetur ea repellendus nemo cumque labore sit quam, saepe quia quisquam dolorem facere laboriosam maiores unde. Reiciendis ducimus iure sint voluptatem. Fugit, ad fugiat quisquam hic temporibus magnam! Reprehenderit, aut quisquam?
            </p>
        </div>
    )
}

export { BlogPost }