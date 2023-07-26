import axios from "axios";
import { useProtectedData } from "../hooks/useProtectedData";
import { useEffect, useState } from "react";
import baseURL from "../constants/baseURL";

function FeedPage() {
  useProtectedData()

  const [data, setData] = useState([])
  const token = localStorage.getItem('token')

  const isValidImage = (url) => {
    const img = new Image();
    img.src = url;
    return img.complete && img.naturalHeight !== 0;
  };

  const dataAPI = () => {
    const headers = {
      headers: {
        Authorization: token
      }
    }
    axios.get(`${baseURL}/recipe/all`, headers)
    .then((resp)=> {
        // console.log(resp)
        setData(resp.data)
    })
    .catch((err)=> {
        console.log(err)
    })
    console.log(data)
  }

  useEffect(() => {
    dataAPI()
}, [])

  return (
    <main>
      feed
      {data.map((item, index) => (
        <div key={index}>
          <p>id: {item.id}</p>
          {isValidImage(item.imageUrl) ? <img src={item.imageUrl} alt="x" /> : 'null'}
          <p>Titulo: {item.title}</p>
        </div>
      ))}
    </main>
  );
}

export default FeedPage;