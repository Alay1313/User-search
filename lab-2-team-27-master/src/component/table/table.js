import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, email, phone, city) {
  return { name, email, phone, city};
}


// for i in range of data size or while id != null
// push data into rows.
const rows1 = [
  createData('Frozen yoghurt', 159, 6.0, 24),
  createData('Ice cream sandwich', 237, 9.0, 37),
  createData('Eclair', 262, 16.0, 24),
  createData('Cupcake', 305, 3.7, 67),
  createData('Gingerbread', 356, 16.0, 49),
];

export default function BasicTable() {
  const classes = useStyles();
  const [nameList, setNameList] = useState([]);
  const [tempList, setTempList] = useState([]);
  const axios = require("axios");

    async function getData() 
    {
        const response = await axios.get("https://jsonplaceholder.typicode.com/users")
        /*for (const key in response)
        {
            console.log(key);
        }*/
        for (let i = 0; i < 9 ; i++) 
        {
            tempList.push([createData(response.data[i].name, response.data[i].email, 
                response.data[i].phone, response.data[i].address.city)]);
            //rows1.push([response.data[i].address.city]);
            //console.log(createData(response.data[i].name, response.data[i].email, 
            //    response.data[i].phone, response.data[i].address.city));
            //console.log("name: " + response.data[i].name + "email: " + response.data[i].email + "phone: " +
            //    response.data[i].phone + "city:" + response.data[i].address.city)
        }
        setNameList(tempList);
        //console.log(tempList);
    }
    //
    useEffect(() => {getData()}, []);
    console.log(tempList);
    //console.log(rows1);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Phone</TableCell>
            <TableCell align="left">City</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows1.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="left">{row.email}</TableCell>
              <TableCell align="left">{row.phone}</TableCell>
              <TableCell align="left">{row.city}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}