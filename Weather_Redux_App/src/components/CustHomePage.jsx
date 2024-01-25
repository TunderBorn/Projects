import Main from "./CustMain";


const HomePage = ({page}) =>{
    return (
        // TITOLO
        <div>
            <h1 className="py-2">Che tempo fa in città?</h1>
             <Main page={page}/>
        </div>
    )
}

export default HomePage