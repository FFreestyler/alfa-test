import { Container } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import TopTable from "./TopTable";
import AllTable from "./AllTable";


function TableView() {
    return (
    <Container>
        <Routes>
            <Route path={'top'} element={<TopTable></TopTable>}></Route>
            <Route path={'full'} element={<AllTable></AllTable>}></Route>
        </Routes>
    </Container>)
}

export default TableView;
