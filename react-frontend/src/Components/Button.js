function Button({text,onClick,type,styling}){
    return(
        <button 
            className={styling? "btn " + styling : "btn" }
            onClick={onClick}
            type = {type}
        >{text}</button>
    );
};
export default Button;