import React from 'react'
import { Typography, Tooltip } from '@mui/material'
import { deepPurple, green, orange } from '@mui/material/colors'
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Views = () => {

  const navigate = useNavigate();


  const handleClick = () => {
    navigate("/")
  }

  const { id } = useParams();
  console.log(id)

  const [student, setStudent] = useState({})

  useEffect(() => {
    
  async function getStudent() {
    try {
      const res = await axios.get(`http://localhost:3335/students/${id}`)
      console.log(res.data)
      setStudent(res.data)
    }
    catch (err) {
      console.log(err.message)
    }
  }
    getStudent();
  }, [])


  return (
    <>
      <Grid item xs={12} md={6}>
        <Item><h1>Student List</h1></Item>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">


            <TableBody>

              <TableRow>
                <TableCell ><h3>ID</h3></TableCell>
                <TableCell ><h3>Name</h3></TableCell>
                <TableCell ><h3>Email</h3></TableCell>

              </TableRow>


              <TableRow >
                <TableCell><p>{student.id}</p></TableCell>
                <TableCell><p>{student.studname}</p></TableCell>
                <TableCell><p>{student.email}</p></TableCell>



              </TableRow>




            </TableBody>
          </Table>
        </TableContainer>
        <Grid item xs={12} >
          <Item><Button type='submit' variant='contained' onClick={handleClick}>Back to Home</Button></Item>
        </Grid>
      </Grid>
    </>
  )
}

export default Views