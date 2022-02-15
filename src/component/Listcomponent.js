import Item from './Item'
const Listcomponent =(props) =>{
    // console.log(props[0])
    const {item} = props;
    // console.log(item)
    return (
        <div>
            {/* <h1>test</h1> */}
            <ul>
                
                {item.map((e,i)=><Item name = {e.name}></Item>)
                }
            </ul>
        </div>)
}

export default Listcomponent;