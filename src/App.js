import { useState } from "react";
import "./App.css";
// import 'antd/dist/antd.css';
import * as XLSX from "xlsx";
import { Button, Upload, message } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table, Container } from 'react-bootstrap';

function App() {
  const [items, setItems] = useState([]);

  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });

        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);

        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d) => {
      setItems(d);
    });
  };

  console.log('tttttttttttttt', items)

  // const props = {
  //   name: 'file',
  //   action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  //   headers: {
  //     authorization: 'authorization-text',
  //   },
  //   onChange(info) {
  //     if (info.file.status !== 'uploading') {
  //       console.log(info.file, info.fileList);
  //     }
  //     if (info.file.status === 'done') {
  //       message.success(`${info.file.name} file uploaded successfully`);
  //       console.log('iiiiiiiiii', info)
  //     } else if (info.file.status === 'error') {
  //       message.error(`${info.file.name} file upload failed.`);
  //     }
  //   },
  // };

  return (
    <div style={{textAlign: 'center', marginTop: '30px'}}>
      {/* <Upload onChange={(e) => {
          const file = e.target.files[0];
          readExcel(file);
        }}>
    <Button icon={<UploadOutlined />}>Click to Upload</Button>
  </Upload> */}
  <h1 style={{fontSize: '30px', fontWeight: '700', marginBottom: '10px'}}>Upload Excel or CSV File</h1>
      <input
        type="file"
        onChange={(e) => {
          const file = e.target.files[0];
          readExcel(file);
        }}
      />

{items?.length ? <Container><Table striped bordered hover className="mt-5">
  <thead>
    <tr>
      <th>Name</th>
      <th>Position</th>
      <th>Office</th>
      <th>Age</th>
      <th>Start Date</th>
      <th>Salary</th>
    </tr>
  </thead>
  <tbody>
    {items?.map((item) => <tr>
      <td>{item?.Name}</td>
      <td>{item?.Position}</td>
      <td>{item?.Office}</td>
      <td>{item?.Age}</td>
      <td>{item?.StartDate}</td>
      <td>{item?.Salary}</td>
    </tr>
    )}
  </tbody>
</Table>
</Container> : null}
    </div>
  );
}

export default App;
