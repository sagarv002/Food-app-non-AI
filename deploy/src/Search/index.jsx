
export default function Search({ search, setSearch, handelsearch }) {


    return (<div className="Search-engine">
        <input type="text"
            className=" Search Items "
            placeholder=" Seach items   "
            name="Search"
            value={search}
            style={{color: "red", fontWeight: "bold" ,backgroundColor: "black",borderRadius:"60px",width:"500px"}}
            onChange={(event) => setSearch(event.target.value)}
        />

        <button className="Search-Weather" style={ {  color: "red", fontWeight: "bold" ,backgroundColor: "black",borderRadius:"10px",width:"150px" }} onClick={handelsearch}> 
           =? Search.  </button>
    </div>);
}