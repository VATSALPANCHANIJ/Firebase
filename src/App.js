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
      const userDoc = doc(db, "user", eidtid);
      const newFields = { name: name, phone: phone, email: email };
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

  const onedit = (id, email, phone, name) => {
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
    < center>
      <table>
        <tbody className='row'>
          <tr>
            <td>
              <div class="form-group">
                <span>Name</span>
                <input className="form-field" type="text" name='name' onChange={(e) => setName(e.target.value)} value={name} placeholder="Enter Your Name" />
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="form-group">
                <span>Email</span>
                <input className="form-field" type="text" name='email' onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Enter Your Email" />
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div class="form-group">
                <span>Phone</span>
                <input className="form-field" name='phone' onChange={(e) => setPhone(e.target.value)} value={phone} placeholder="Enter Your Phone" />
              </div>
            </td>
          </tr>
          <tr>

            <td>
              {
                eidtid ? (<input type='button' className='btnc' value="Edit" onClick={() => onsubmit()} />)
                  : (<input type='button' className='btnc' value="Submit" onClick={() => onsubmit()} />)
              }

            </td>
          </tr>
        </tbody>
      </table>
      <br></br>
      <table border={1}>
        <thead className='tbl-header'>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className='demo'>
          {
            record.map((val) => {
              const { id, name, email, phone } = val
              return (
                <tr key={id}>
                  <td style={{ fontSize: "18px" }}>{id}</td>
                  <td style={{ fontSize: "18px" }}>{name}</td>
                  <td style={{ fontSize: "18px" }}>{email}</td>
                  <td style={{ fontSize: "18px" }}>{phone}</td>
                  <td>
                    <button className='btnc' onClick={() => ondelete(id)}>Delete</button>
                    <button className='btnc' onClick={() => onedit(id, name, phone, email)}>Edit</button>
                  </td>
                </tr>
              )
            })

          }
        </tbody>
      </table>
    </center>
  );
}

export default App;
