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
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableFooter';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { useEffect, useState } from 'react';



const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

const Home = () => {

  const [students, setStudents]=useState([])
  const [newStudent, setNewStudent]= useState({
    studname: "",
    email: ""
  })
  const [status, setStatus]= useState(false)//to add new student immediately on clicking add we will re-render home page

 useEffect(()=>{
     getAllStudents();
      
 }, []) 

 async function getAllStudents(){
      try{
        const res=await axios.get("http://localhost:3335/students")
        console.log(res.data)
        setStudents(res.data)
      }
      catch(err){
        console.log(err.mesage)
      }
 }

function onInput(e){
  setNewStudent({...newStudent,
    [e.target.name]: e.target.value

  })
  // console.log(newStudent)
}
 
async function onFormSubmit(e){
  e.preventDefault();
  try{
    await axios.post("http://localhost:3335/students", newStudent)
    setStatus(true)
  }
  catch(err){
    console.log(err.mesage)
  }
}

if(status){
  return <Home/>
}

async function handleDelete(id){
  await axios.delete(`http://localhost:3335/students/${id}`)
  var undeleted= students.filter((udel)=>{
    return udel.id !== id
   
  })
  setStudents(undeleted)
}


  return (
    <>
    <Box textAlign="center" >
        <Typography variant="h2">
            STUDENT DETAILS
        </Typography>
    </Box>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Item><h1>Add Student</h1></Item>
          <form noValidate>
          <Grid item xs={12} >
          <Item> <TextField id="studname" label="name" variant="outlined" name="studname" onChange={(e)=>onInput(e)}/></Item>
        </Grid>
        <Grid item xs={12} >
          <Item><TextField id="email" label="email" variant="outlined" name="email" onChange={(e)=>onInput(e)}/></Item>
        </Grid> 
        <Grid item xs={12} >
          <Item><Button type='submit' variant='contained' onClick={(e)=>onFormSubmit(e)}>Add</Button></Item>
        </Grid>  
          </form>
        </Grid>
        <Grid item xs={12} md={6}>
          <Item><h1>Student List</h1></Item>
          <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        
       
        <TableBody>
          
            <TableRow>
            <TableCell ><h3>ID</h3></TableCell>
              <TableCell ><h3>Name</h3></TableCell>
              <TableCell ><h3>Email</h3></TableCell>
              <TableCell ><h3>Action</h3></TableCell>
            </TableRow>
          
            {students.map((item)=>{
              return(
                
                <TableRow key={item.id}>
              <TableCell><p>{item.id}</p></TableCell>
              <TableCell><p>{item.studname}</p></TableCell>
              <TableCell><p>{item.email}</p></TableCell>
               
            <TableCell>
               <Link to={`/view/${item.id}`}><VisibilityIcon></VisibilityIcon></Link> 
               <Link to={`/edit/${item.id}` }><EditIcon color='primary' key={item.id}></EditIcon></Link> 
                <DeleteIcon color='error' onClick={()=>handleDelete(item.id)}></DeleteIcon></TableCell>
            
          </TableRow>
              )
              
            })}
           
        </TableBody>
      </Table>
    </TableContainer>
        </Grid>
        </Grid>
    </Box>
  
  

    </>
  )
}

export default Home