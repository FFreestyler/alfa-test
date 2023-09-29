import { Button, Container } from "@mui/material";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";


function ButtonView() {
    const { page } = useParams();
    const navigate = useNavigate();

    const toStartView = () => {
        navigate("/");
    }

    const toTopTableView = () => {
        navigate("top");
    }

    const toAllTableView = () => {
        navigate("full");
    }

    useEffect(() => {
        if (page === undefined) {
            navigate("/");
        }
    }, [navigate, page])

    return (
    <Container>
        <Button onClick={toStartView}>Start</Button>
        <Button onClick={toTopTableView}>Top</Button>
        <Button onClick={toAllTableView}>All</Button>
    </Container>)
}

export default ButtonView;
