import React, { useState, useEffect } from 'react';

export default function Body() {

  const [userList, setUserList] = useState([]);
  const [backList, setBackList] = useState([]);
  const [searchKey, setSearchKey] = useState('');
  const tempList = ([]);

  const axios = require("axios");

  useEffect(() => {

    async function getData() {

      const response = await axios.get("https://jsonplaceholder.typicode.com/users")
      
      for (let i = 0; i < response.data.length; i++) {

        const user = { //display user information
          name: response.data[i].name,
          city: (response.data[i].address).city,
          email: response.data[i].email,
          phone: response.data[i].phone,
          id: response.data[i].id
        }

        tempList.push(user);

      }
      setUserList(tempList); //set the userList = tempList
      setBackList(tempList);
    }

    getData()
  }, []);

  function handleDelete(user) { //remove user from list
    const newList = userList.filter(item => item !== user);
    setUserList(newList);
    setBackList(newList);
  }

  function compare(a, b) {
    if (a.city < b.city) {
      return -1;
    }
    if (a.city > b.city) {
      return 1;
    }
    return 0;
  }

  function sortCities(userList) {
    let tempList2 = userList.slice(0);
    tempList2.sort(compare)
    setUserList(tempList2);
  }
  const searchByName = event => {
    event.preventDefault();
    let tempNameList = [];
    for (let index = 0; index < backList.length; index++) {
      if (backList[index].name.toLowerCase().includes(searchKey.toLowerCase())) {
        tempNameList.push(backList[index])
      }
      setUserList(tempNameList);
    }

  }

  const searchByCity = (event) => {
    event.preventDefault();
    let tempCityList = [];
    for (let index = 0; index < backList.length; index++) {
      if (backList[index].city.toLowerCase().includes(searchKey.toLowerCase())) {
        tempCityList.push(backList[index])
      }
      setUserList(tempCityList);
    }
  };
  const mapUser = userList.map(user => <div key={user.id}><h3 id="name">{user.name}</h3>{'Email: ' + user.email + ' City: ' + user.city + ' Phone: ' + user.phone + " "}<button type="button" id="remove" onClick={function () { handleDelete(user) }}>Remove</button></div>);



  return (
    <form noValidate autoComplete="off" >
      <div>
        <button type="button" onClick={function () { sortCities(userList) }}>Sort by city </button>
        <input type="text" placeholder="Search" onChange={(i) => setSearchKey(i.target.value)} />
        <button type="button" onClick={searchByName}>Search by Name</button>
        <button type="button" onClick={searchByCity}>Search by City</button>
        {mapUser}
      </div>

    </form>
  );
}
