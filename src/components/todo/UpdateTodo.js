import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { useNavigate, useParams } from 'react-router-dom';

function UpdateTodo({ isAuthenticated, setIsAuthenticated }) {
    const { id } = useParams(); // Get id from URL params
    const [title, setTitle] = useState('');
    const [targetDate, setTargetDate] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    let navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, navigate]);

    const timeout = (delay) => {
        return new Promise(res => setTimeout(res, delay));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
       // console.log('Updating todo with ID:', id);

        try {
            await axios.put(`https://taskmanagementbackend-production-2202.up.railway.app/api/todo/${id}`, 
                { title, targetDate, description }, {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            });
            setMessage('Todo successfully updated');
            setErrorMessage('');
            await timeout(1000);
            navigate("/todo");
        } catch (error) {
            setMessage('');
            if (error.response) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage('Error: something happened');
            }
        }
    };

    useEffect(() => {
        const loadData = async () => {
            if (!id) {
                setErrorMessage('Todo ID is not available.');
                return;
            }

            console.log('Fetching todo with ID:', id);
            try {
                const response = await axios.get(`https://taskmanagementbackend-production-2202.up.railway.app/api/todo/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                    }
                });
                setTitle(response.data.title);
                setTargetDate(moment(response.data.targetDate).format('YYYY-MM-DD'));
                setDescription(response.data.description);
                setErrorMessage('');
            } catch (error) {
                setMessage('');
                if (error.response) {
                    setErrorMessage(error.response.data.message);
                } else {
                    setErrorMessage('Error: something happened');
                }
            }
        };

        loadData();
    }, [id]);

    const showMessage = () => {
        if (message === '') return null;
        return <div className="alert alert-success" role="alert">{message}</div>;
    };

    const showErrorMessage = () => {
        if (errorMessage === '') return null;
        return <div className="alert alert-danger" role="alert">{errorMessage}</div>;
    };

    return (
        <div className="container">
            <form onSubmit={onSubmit}>
                <h1>Update Todo</h1>
                <div className="form-group">
                    <label>Title</label>
                    <input
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Target Date</label>
                    <input
                        value={targetDate}
                        type="date"
                        onChange={e => setTargetDate(e.target.value)}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <input
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        className="form-control"
                    />
                </div>
                <button className="btn btn-primary">Update Todo</button>
            </form>
            {showMessage()}
            {showErrorMessage()}
        </div>
    );
}

export default UpdateTodo;
