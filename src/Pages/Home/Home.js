import { useEffect, useState } from 'react';


function Home() {
    const [data, setData] = useState([]);
    const [currentClass, setCurrentClass] = useState('52')
    useEffect(() => {
        fetch('http://localhost:5000/getroutine')
            .then(res => res.json())
            .then(data => {
                let newDataArray = [];
                let currentDay = ''
                let newDataObJ = {};
                data.data.map((dtOBJ) => {
                    if (dtOBJ.Day && dtOBJ.Room) {
                        currentDay = dtOBJ.Day;
                        newDataObJ = { ...dtOBJ }
                        newDataArray.push(newDataObJ);
                        newDataObJ = {};
                    } else if (!dtOBJ.Day && dtOBJ.Room) {
                        newDataObJ = { Day: currentDay, ...dtOBJ };
                        newDataArray.push(newDataObJ);
                        newDataObJ = {};
                    }
                })
                // let dayObj = {};
                // currentDay = newDataArray[0].Day;
                // let currentDayArray = [];
                // newDataArray.map(NDA => {
                //   if (NDA.Day === currentDay) {
                //     currentDayArray.push(NDA);
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
                setData(newDataArray)
            });
    }, [])
    return (
        <div>
            <h1>This is your home</h1>
            {
                data.map(dtObj => {
                    return (
                        Object.keys(dtObj).map(function (key, index) {
                            const value = dtObj[key];

                            return (
                                value.includes(currentClass) && <li key={index}>{dtObj.Room}---{dtObj.Day}---{value}</li>
                            )

                        })
                    )
                })
            }
        </div>
    );
}

export default Home;
