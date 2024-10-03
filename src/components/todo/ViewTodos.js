import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';

function Todos({ isAuthenticated, setIsAuthenticated }) {
    const [todos, setTodos] = useState([]);
    const [changed, setChanged] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        const loadData = async () => {
            let response;
            try {
                let url = `https://taskmanagementbackend-production-2202.up.railway.app/api/todo/`;

                
               response = await axios.get(url, {
                    headers: { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` },
                });

                setErrorMessage('');
                setTodos(response.data);
            } catch (error) {
                if (error.response) {
                    setErrorMessage(error.response.data.message);
                } else {
                    setErrorMessage('Error: something happened');
                }
            }
        };

        loadData();
    });

    

  

    const showErrorMessage = () => {
        return errorMessage ? (
            <div className="alert alert-danger" role="alert">
                {errorMessage}
            </div>
        ) : null;
    };

    const markCompleted = async (id) => {
        try {
            await axios.put(`https://taskmanagementbackend-production-2202.up.railway.app/api/todo/${id}/markcomplete`, {}, {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            });
            setChanged(!changed);
        } catch (error) {
            if (error.response) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage('Error: something happened');
            }
        }
    };

    const deleteTodo = async (id) => {
        try {
            await axios.delete(`https://taskmanagementbackend-production-2202.up.railway.app/api/todo/${id}`, {
                headers: {
                    'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                }
            });
            setChanged(!changed);
        } catch (error) {
            if (error.response) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage('Error: something happened');
            }
        }
    };

    return (
        <div className="container">
            <h1 className="text-center">Todo List</h1>
            {showErrorMessage()}

            
            <table className="table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Target Date</th>
                        <th>Description</th>
                        <th>Is Completed?</th>
                        <th>Mark Completed</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
           <tbody>
    {todos.map((todo) => (
        <tr className={todo.isCompleted ? 'completed' : ''} key={todo.id}>
            <td>{todo.title}</td>
            <td>{moment(todo.targetDate).format('ll')}</td>
            <td>{todo.description}</td>
            <td>{todo.isCompleted.toString()}</td>
            <td>
                <button className="btn btn-success" onClick={() => markCompleted(todo.id)}>Mark Completed</button>
            </td>
            <td>
                <Link to={{ pathname: `/update/${todo.id}` }}>
                    <button className="btn btn-primary">Update</button>
                </Link>
            </td>
            <td>
                <button className="btn btn-danger" onClick={() => deleteTodo(todo.id)}>Delete</button>
            </td>
        </tr>
    ))}
</tbody>

            </table>
         
         
        </div>
    );
}

export default Todos;
