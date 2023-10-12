import logo from './logo.svg';
import './App.css';
import { db } from './firebase';
import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';


function App() {
  
  const tbl = collection(db, "user");
  const [record, setRecord] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [eidtid, setEidtid] = useState("");
  const getUser = async () => {
    const data = await getDocs(tbl);
    setRecord(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  }

  const onsubmit = async () => {
    if (eidtid) {
      const userDoc = doc(db,"user",eidtid);
      const newFields = { name: name, phone: phone ,email:email};
      let update = await updateDoc(userDoc, newFields);
    } else {
      let insert = await addDoc(tbl, { name: name, email: email, phone: phone });
      if (insert) {
        alert("Record successfully insert")
      } else {
        alert("Record not successfully insert")
      }
    }
    setName("");
    setEmail("");
    setPhone("");
    getUser();
  }

  const ondelete = async (id) => {
    const userDoc = doc(db, "user", id);
    let res = await deleteDoc(userDoc);
    getUser();
  }

  const onedit = (id,email,phone,name) => {
    setName(name);
    setEmail(email);
    setPhone(phone);
    setEidtid(id);   
    getUser();
  }

  useEffect(() => {
    getUser();
  }, [])

  return (
    <>
      <table>
        <tbody>
          <tr>
            <td>Name :-</td>
            <td><input type='text' name='name' onChange={(e) => setName(e.target.value)} value={name} /></td>
          </tr>
          <tr>
            <td>Email :-</td>
            <td><input type='text' name='email' onChange={(e) => setEmail(e.target.value)} value={email} /></td>
          </tr>
          <tr>
            <td>Phone :-</td>
            <td><input type='text' name='phone' onChange={(e) => setPhone(e.target.value)} value={phone} /></td>
          </tr>
          <tr>
            <td></td>
            <td>
              {
                eidtid ? (<input type='button' value="Edit" onClick={() => onsubmit()} />)
                : (<input type='button' value="Submit" onClick={() => onsubmit()} />)
              }
              
            </td>
          </tr>
        </tbody>
      </table>
      <br></br>
      <table border={1}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            record.map((val) => {
              const { id, name, email, phone } = val
              return (
                <tr key={id}>
                  <td>{id}</td>
                  <td>{name}</td>
                  <td>{email}</td>
                  <td>{phone}</td>
                  <td>
                    <button onClick={() => ondelete(id)}>Delete</button>
                    <button onClick={() => onedit(id,name,phone,email)}>Edit</button>
                  </td>
                </tr>
              )
            })
            
          }
        </tbody>
      </table>
    </>
  );
}

export default App;
