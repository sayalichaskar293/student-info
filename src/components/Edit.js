import React from 'react'
import {Typography, Tooltip} from '@mui/material'
import { deepPurple, green, orange } from '@mui/material/colors'
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableFooter';
import { Link } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));


const Edit = () => {

  const [upStudent, setUpStudent]= useState({
    studname: "",
    email: ""
  })

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/")
  }

  const {id}=useParams()

  function onInput(e){
    setUpStudent({...upStudent,
      [e.target.name]: e.target.value
  
    })
    // console.log(newStudent)
  }
   

  useEffect(()=>{
    async function getStudent(){
      try{
          const res=await axios.get(`http://localhost:3335/students/${id}`)
          setUpStudent(res.data)
      }
      catch(err){
        console.log(err.message)
      }
    }
    getStudent()
  }, [])

  async function onFormSubmit(e){
    e.preventDefault();
    try{
      await axios.put(`http://localhost:3335/students/${id}`, upStudent)
     navigate("/")
    }
    catch(err){
      console.log(err.mesage)
    }
  }
 

  return (
    <div>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Item><h1>Add Student</h1></Item>
          <form noValidate>
          <Grid item xs={12} >
          <Item> <TextField id="id" label="id" variant="outlined" disabled value={id}/></Item>
        </Grid>
          <Grid item xs={12} >
          <Item> <TextField id="studname" label="name" variant="outlined" name="studname" value={upStudent.studname} onChange={(e)=>onInput(e)} /></Item>
        </Grid>
        <Grid item xs={12} >
          <Item><TextField id="email" label="email" variant="outlined" name="email" value={upStudent.email} onChange={(e)=>onInput(e)}/></Item>
        </Grid> 
        <Grid item xs={12} >
          <Item><Button type='submit' variant='contained' onClick={onFormSubmit}>Update</Button></Item>
        </Grid>  
        <Grid item xs={12} >
        <Item><Button type='submit' variant='contained' onClick={handleClick}>Back to Home</Button></Item>
        </Grid> 
          </form>
        </Grid>
        </Grid>
        </Box>
    </div>
  )
}

export default Edit