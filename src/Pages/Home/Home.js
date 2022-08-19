import { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { CircularProgress, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import './Home.css'
import classRoutineLogo from './../../assets/classRoutineLogo.jpg'
import { useNavigate } from 'react-router';
import { addToDb, getStoredCart } from '../FakeDB/FakeDB';

function Home({ batchNumber, setBatchNumber }) {
    const [data, setData] = useState([]);
    const [expanded, setExpanded] = useState(false);
    const [loading, setLoading] = useState(false);
    let navigate = useNavigate();
    const fetchDataFromServer = () => {
        setLoading(true);
        fetch('https://miu-class-routine.herokuapp.com/getroutine')
            // fetch('http://localhost:5000/getroutine')
            .then(res => res.json())
            .then(data => {
                let newDataArray = [];
                let currentDay = 'SAT'
                let currentRoom = ''
                let newDataObJ = {};
                data.data.map((dtOBJ) => {
                    currentRoom = dtOBJ.Room;

                    Object.keys(dtOBJ).map(function (key, index) {
                        const value = dtOBJ[key];
                        // SAT!=SUN
                        if ((dtOBJ.Day) && (currentDay !== dtOBJ.Day)) {
                            newDataObJ['Day'] = currentDay;
                            const sortedObjectByKey = Object.entries(newDataObJ)
                                .sort(([, a], [, b]) => {
                                    let firstChar = a.charAt(0)
                                    let secondChar = b.charAt(0)
                                    return (firstChar - secondChar)
                                })
                                .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
                            newDataArray.push(sortedObjectByKey);

                            newDataObJ = {};
                            currentDay = dtOBJ.Day;
                        }
                        else {
                            if (value.includes(batchNumber)) {
                                if (key === "9:00-10:00") {
                                    newDataObJ[key] = `1--${value}--${currentRoom}`;
                                    // newDataObJ[`1--${key}`] = `${value}--${currentRoom}`;
                                } else if (key === "10:00-11:00") {
                                    newDataObJ[key] = `2--${value}--${currentRoom}`;
                                    // newDataObJ[`2--${key}`] = `${value}--${currentRoom}`;

                                }
                                else if (key === "11:00-12:00") {
                                    newDataObJ[key] = `3--${value}--${currentRoom}`;
                                    // newDataObJ[`3--${key}`] = `${value}--${currentRoom}`;

                                }
                                else if (key === "12:00-1:00") {
                                    newDataObJ[key] = `4--${value}--${currentRoom}`;
                                    // newDataObJ[`4--${key}`] = `${value}--${currentRoom}`;

                                }
                                else if (key === "1:00-2:00") {
                                    newDataObJ[key] = `5--${value}--${currentRoom}`;
                                    // newDataObJ[`5--${key}`] = `${value}--${currentRoom}`;

                                }
                                else if (key === "2:00-3:00") {
                                    newDataObJ[key] = `6--${value}--${currentRoom}`;
                                    // newDataObJ[`6--${key}`] = `${value}--${currentRoom}`;

                                }
                                else if (key === "3:00-4:00") {
                                    newDataObJ[key] = `7--${value}--${currentRoom}`;
                                    // newDataObJ[`7--${key}`] = `${value}--${currentRoom}`;

                                }
                                else if (key === "4:00-5:00") {
                                    newDataObJ[key] = `8--${value}--${currentRoom}`;
                                    // newDataObJ[`8--${key}`] = `${value}--${currentRoom}`;
                                }
                            }
                        }
                    })
                })
                // push last element;
                newDataObJ['Day'] = currentDay;
                const sortedObjectByKey = Object.entries(newDataObJ)
                    .sort(([, a], [, b]) => {
                        let firstChar = a.charAt(0)
                        let secondChar = b.charAt(0)
                        return (firstChar - secondChar)
                    })
                    .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
                newDataArray.push(sortedObjectByKey);
                // filter the empty Day
                newDataArray = newDataArray.filter(element => Object.keys(element).length > 1)

                addToDb({ data: newDataArray })
                setData(newDataArray)
                setLoading(false);
            });
    }
    const handleChange =
        (panel) => (event, isExpanded) => {
            setExpanded(isExpanded ? panel : false);
        };

    useEffect(() => {
        const localBatchNumber = getStoredCart().user;
        if (localBatchNumber && getStoredCart().data) {
            setData(getStoredCart().data);
        } else if (localBatchNumber) {
            setBatchNumber(localBatchNumber);
            fetchDataFromServer()
        } else {
            navigate("/")
        }
    }, [])

    // console.log('new ', data[2])
    return (
        loading ? <div style={{ marginTop: '8rem' }}><CircularProgress /> </div> :
            <div style={{ marginTop: '1rem' }}>
                <div >
                    {data.map(dtObj => {
                        return (
                            <Accordion expanded={expanded === dtObj.Day} onChange={handleChange(dtObj.Day)} key={dtObj.Day}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel4bh-content"
                                    id="panel4bh-header"
                                >
                                    <Typography className={expanded === dtObj.Day ? "textCenter" : "titleCssInHOme"}>{dtObj.Day}DAY</Typography>
                                </AccordionSummary>
                                <AccordionDetails>

                                    <TableContainer sx={{ maxWidth: '650px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} component={Paper}>
                                        <Table sx={{}} aria-label="Appointments table">
                                            <TableHead>
                                                <TableRow style={{ backgroundColor: '#95deed' }}>

                                                    <TableCell >TIME</TableCell>
                                                    <TableCell >SUBJECT</TableCell>
                                                    <TableCell >Room</TableCell>

                                                </TableRow>
                                            </TableHead>
                                            <TableBody>



                                                {Object.keys(dtObj).map(function (key, index) {
                                                    const value = dtObj[key];
                                                    const valuesArray = value.split("--");


                                                    return (
                                                        value.includes(batchNumber) &&
                                                        <TableRow

                                                            key={index}
                                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                        >

                                                            <TableCell component="th" scope="row">
                                                                {key}
                                                            </TableCell>
                                                            <TableCell component="th" scope="row">
                                                                {valuesArray[1]}
                                                            </TableCell>
                                                            <TableCell component="th" scope="row">
                                                                {valuesArray[2]}
                                                            </TableCell>


                                                        </TableRow>
                                                    )

                                                })
                                                }
                                            </TableBody>
                                        </Table>
                                    </TableContainer>

                                </AccordionDetails>
                            </Accordion>
                        )
                    })
                    }
                    {!expanded && <img alt="rutine" src={classRoutineLogo} />}
                </div> </div>
    );
}

export default Home;
