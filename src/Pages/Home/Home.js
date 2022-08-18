import { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

function Home() {
    const [data, setData] = useState([]);
    const [currentClass, setCurrentClass] = useState('49');
    const [expanded, setExpanded] = useState(false);

    const handleChange =
        (panel) => (event, isExpanded) => {
            setExpanded(isExpanded ? panel : false);
        };


    useEffect(() => {
        fetch('http://localhost:5000/getroutine')
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
                            if (value.includes(currentClass)) {
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

                // let dayObj = {};
                // currentDay = newDataArray[0].Day;
                // let currentDayArray = [];
                // newDataArray.map(NDA => {
                //   if (NDA.Day === currentDay) {
                //     cu<rrentDayArray.push(NDA);
                //   } else {
                //     // dayObj = { ...dayObj, currentDay: currentDayArray }
                //     dayObj[currentDay] = currentDayArray;
                //     currentDay = NDA.Day;
                //     currentDayArray = [];
                //     currentDayArray.push(NDA);
                //   }
                // })
                // 
                // console.log(newDataArray);
                // console.log(dayObj);
                // setData(data.data)


                setData(newDataArray)
            });
    }, [])
    // console.log('new ', data[2])
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div>
                <h1>This is your home</h1>
                {
                    data.map(dtObj => {

                        return (
                            <div >
                                <Accordion expanded={expanded === dtObj.Day} onChange={handleChange(dtObj.Day)} key={dtObj.Day}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel4bh-content"
                                        id="panel4bh-header"
                                    >
                                        <Typography sx={{ flexShrink: 0, fontWeight: 'bold', color: 'red' }}>{dtObj.Day}DAY</Typography>
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
                                                            value.includes(currentClass) &&
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

                            </div>)
                    })
                }
            </div>
        </div>
    );
}

export default Home;
