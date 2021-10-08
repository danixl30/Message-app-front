import { React } from "react";
import Cookies from 'js-cookie';
import MainDisplay from "./displays/MainDisplay";
import HomeDisplay from "./displays/HomeDisplay";

const Main = () => {
    return (
        <>
            {Cookies.get('id')? <HomeDisplay/> : <MainDisplay/>}
        </>
    )
}

export default Main;