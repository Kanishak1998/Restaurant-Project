import React,{useState,useEffect} from 'react'
import Product from './Product'
import products from './data'
import './test.css'
import FlipMove from 'react-flip-move'
const list = [{"id":1,"name":"1"}]
function Home() {
    const [lis, setlis] = useState(list)
    const [removedArticles,setremovedArticles] = useState([])
    const removeitem = (id)=>{
        const newlis = lis.filter(it=> it.id != id )
        console.log(newlis)
        setlis(newlis)

    }
    const additem = ()=>{
        // const newlis = lis
        // newlis.pop()
        // console.log(newlis)
        setlis([...lis ,{"id":lis.length+1,"name":(lis.length+1)}])

    }
    const moveArticle = ((id) => {
        const sourceArticles = lis.slice();
        let destArticles = removedArticles.slice();
        console.log(sourceArticles)
        console.log(destArticles)
        if ( !sourceArticles.length ) return;
    
        // Find the index of the article clicked.
        // If no ID is provided, the index is 0
        const i = id ? sourceArticles.findIndex(lis => lis.id === id) : 0;
    
        // If the article is already removed, do nothing.
        if ( i === -1 ) return;
    
        destArticles = [].concat( sourceArticles.splice(i, 1), destArticles );
        setlis(sourceArticles)
        setremovedArticles(destArticles)
      })

    return (
        <div className="grid-container">
            <button onClick = {additem}>Add</button>
            <FlipMove
             staggerDurationBy="30"
             duration={500}
             enterAnimation="accordionVertical"
             leaveAnimation="accordionVertical"
             typeName="ul">
            {
                lis.map((item,index)=>{
                    const {name,id} = item 
                    return(
                        <div className = 'items' key = {index}>
                            <h1>{name}</h1>
                            <button onClick = {()=>{removeitem(id)}}>X</button>
                        </div>
                    )
                })
            }
            </FlipMove>
        </div>        
    )
}

export default Home
