import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "bootstrap/dist/css/bootstrap.css";
import App from './App.jsx'

const sql = postgres('postgresql://user:password@db:5432/mydb', {
  host                 : 'localhost',           // Postgres ip address[s] or domain name[s]
  port                 :  5432,                 // Postgres server port[s]
  database             : 'mydb',                // Name of database to connect to
  username             : 'user',                // Username of database user
  password             : 'password',            // Password of database user
})

App.listen(8000, () => {
  console.log('Listening to port 8000')
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
