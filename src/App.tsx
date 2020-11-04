import React, {useEffect, useState} from "react";
import SearchModal from "./components/Modal"
import useRemoteData from "./components/useRemoteData";
import axios from "axios";

const Content = () => (
    <div>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
        <p>123</p>
    </div>
);

const App = () => {
    const [open, setOpen] = useState(false);
    const get = () => {
        return axios.get("/manage/person?username=2017001")
    };
    const data = useRemoteData(() => get());

    return (
        <div>
            <button onClick={() => setOpen(true)}>点我</button>
            <Content/>
            <SearchModal open={open} onClose={() => setOpen(false)}>
                <div style={{height: '100%', overflow: 'auto'}}>
                    <Content/>
                </div>
            </SearchModal>
        </div>
    )
};

export default App;