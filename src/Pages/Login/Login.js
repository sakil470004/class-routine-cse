import { TextField } from '@mui/material';
import './Login.css'
import React, { useEffect, useState } from 'react';
import happyEmoji from './../../assets/happyEmoji.png'
import { useNavigate } from 'react-router';
import { addToDb, getStoredCart } from '../FakeDB/FakeDB';

export default function Login({ setBatchNumber }) {

    const [loading, setLoading] = useState(false)
    let navigate = useNavigate();
    const [localBatchNumber, setLocalBatchNumber] = useState('');

    const handleKeyChange = e => {
        const value = e.target.value;
        setLocalBatchNumber(value)


    }
    const handleLogin = (e) => {
        addToDb({ user: localBatchNumber });
        setBatchNumber(localBatchNumber)
        navigate('/home')
        window.close()
        e.preventDefault();
    }
    useEffect(() => {
        const currentUser = getStoredCart().user;
        if (currentUser) {
            setBatchNumber(currentUser);
            navigate('/home')
            window.close()
        }

    }, [])

    return <div className='login--container'>
        {loading ? <h1 style={{ color: 'white' }}>Loading ...</h1> :
            <div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0.7rem 1rem' }}>
                    <div style={{ background: '#fff8f8', padding: '30px', borderRadius: '40px' }}>
                        <h1 style={{ color: 'red' }}>Give Your Batch Number</h1>

                        <img style={{ maxWidth: '8rem' }} src={happyEmoji} alt="Happy" />

                        <form

                            onSubmit={handleLogin}>

                            <TextField
                                required
                                sx={{ width: '90%', m: 2 }}
                                label="Batch Number"
                                variant="standard"
                                name='batchNumber'
                                onChange={handleKeyChange} />

                            <button

                                style={{ marginTop: 20, width: '90%', backgroundColor: '#FEEAEB', color: 'red', padding: '10px', borderRadius: '15px', cursor: 'pointer', fontSize: '20px' }} type='submit'>LOGIN</button>

                        </form>



                    </div>

                </div>

            </div>
        }
    </div>
}