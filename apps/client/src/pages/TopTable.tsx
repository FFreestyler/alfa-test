import { useEffect, useState } from 'react'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';


type resultProps = {
  id: number;
  idNode: number;
  fio: string;
  level: string;
  exp: number;
  money: number
}

function TopTable() {
    const [result, setResult] = useState<resultProps[]>([]);

    useEffect(() => {
        (async () => {
            const data = await fetch('api/topData')
                .then(res => res.text())
                .then(resText => JSON.parse(resText))
                setResult(data)
            })()
        }, [])

    return (
    <TableContainer component={Paper}>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Number</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Experience</TableCell>
                    <TableCell>Money</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {result.map(row => (
                    <TableRow key={row.idNode}>
                        <TableCell>{row.id}</TableCell>
                        <TableCell>{row.fio}</TableCell>
                        <TableCell>{row.level}</TableCell>
                        <TableCell>{row.exp}</TableCell>
                        <TableCell>{row.money}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
    )
}

export default TopTable;
