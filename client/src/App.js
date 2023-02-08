import './App.css';
import {React,useState,useEffect} from 'react';
import Axios from 'axios';
import ListadoPelis from './components/listadoPelis'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  const [listFilms,setListFilms] = useState([]);
  const [id,setId] = useState(null);
  const [titleSearch,setTitleSearch] = useState(null);
  const [titles,setTitles] = useState(null);
  const [title,setTitle] = useState(null);
  const [description,setDescription] = useState(null);
  const [iDToEdit,setIDToEdit] = useState(null);
  const [titleEdit,setTitleEdit] = useState(null);
  const [descriptionToEdit,setDescriptionToEdit] = useState(null);

  
  const notifyEdit = () => toast('✅ Pelicula modificada con éxito!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    const notifyAdd = () => 
      toast('✅ Pelicula agregada con éxito!', {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,

    })
    getFilms()
    ;

  function getFilms () {

    Axios.get(`http://localhost:8080/api/tutorials`)
    .then(res => {

      const films = res.data;
      
      setListFilms(films)
      //return films;
    })

  }

  

  function getFilmsId() {
  
    Axios.get('http://localhost:8080/api/tutorials/'+id)
    .then(res => {

      const filmsById = res.data;
      
      setListFilms(filmsById)
    }).catch(err => {
      console.log(err)
    }
    )
  }

  function getFilmsTitle() {
   
    Axios.get('http://localhost:8080/api/tutorials/',{params: {titleSearch: title}})
    .then(res => {

      const filmsByTtitle = res.data;
      console.log(filmsByTtitle)
      setListFilms(filmsByTtitle)

    }).catch(err => {
      console.log(err)
    }
    )
  }

  function saveFilm() {
   
    const payload = { "title":titles,"description":description }
    
    Axios.post('http://localhost:8080/api/tutorials',payload
    )
    .then(res => {
      notifyAdd();
    }).catch(err => {
      console.log(err)
    }
    )
  }

  function editFilm(){

    const payload = { "title":titleEdit,"description":descriptionToEdit }
   
    Axios.put('http://localhost:8080/api/tutorials/'+iDToEdit,payload
    )
    .then(res => {
      
      notifyEdit();
    
    }).catch(err => {
     
    })
  }

  function removeFilms(){
    Axios.delete(`http://localhost:8080/api/tutorials`)
    .then(res => {      
      setListFilms([])
      //return films;
    })
  }

  
  useEffect (() => {

    getFilms();
    
  }, [])

  useEffect (() => {
}, [listFilms])

  

  return (
    <>
    <center>
    <h1 className="display-1">CRUD CON REACT,NODE Y MONGODB</h1>
      <div className="accordion col-8 mt-5" id="accordionExample">
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingOne">
            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
              Obtener info
            </button>
          </h2>
          <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
            <div className="accordion-body">
              
            <div class="input-group mb-3 col-3">
              <button class="btn btn-outline-secondary" onClick={getFilmsId} type="button" id="button-addon1">Filtrar por ID</button>
              <input type="text" class="form-control"  onChange={(e) => setId(e.target.value)} placeholder="ID ..." aria-label="Example text with button addon" aria-describedby="button-addon1" />
            </div>

            <div class="input-group mb-3 col-3">
              <button class="btn btn-outline-secondary"  onClick={getFilmsTitle} type="button" id="button-addon1">Filtrar por titulo</button>
              <input type="text" class="form-control"  onChange={(e) => setTitleSearch(e.target.value)} placeholder="Titulo ..." aria-label="Example text with button addon" aria-describedby="button-addon1" />
            </div>


              <button type="button" class="btn btn-outline-warning" onClick={getFilms}>Mostrar todas </button>

               {listFilms.length > 0 ? <ListadoPelis data={listFilms} /> : <center><h3>Sin peliculas ...</h3></center>}   

               
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingTwo">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
              Insertar info 
            </button>
          </h2>
          <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
            <div className="accordion-body">
              <div className="row">
                  <div className="col-4">
                    <input type="text" class="form-control" onChange={(e) => setTitles(e.target.value)}placeholder="Titulo para insertar ..."  aria-describedby="button-addon1" />
                  </div>
                  <div className="col-4">
                    <input type="textarea" class="form-control" onChange={(e) => setDescription(e.target.value)} placeholder="descripción para insertar ..."  aria-describedby="button-addon1" />
                  </div>
                  <div className="col-2">
                    <button type="button" class="btn btn-success" onClick={saveFilm}>Guardar</button>
                  </div>
              </div>
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingThree">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
              Actualizar info 
            </button>
          </h2>
          <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
            <div className="accordion-body">
              <div className='row'>
                <div className="col-6">
                  <label>Id</label>
                  <input type="text" class="form-control" onChange={(e) => setIDToEdit(e.target.value)} placeholder="Id ..."  aria-describedby="button-addon1" />
                </div>
                <div className="col-6">
                  <label>Título</label>
                  <input type="text" class="form-control" onChange={(e) => setTitleEdit(e.target.value)} placeholder="Titulo ..."  aria-describedby="button-addon1" />
                </div>
              </div>
              <div className='row'>
                <div className="col-12">
                  <label>Description</label>
                  <textarea class="form-control" onChange={(e) => setDescriptionToEdit(e.target.value)} placeholder="Descripción ..."  aria-describedby="button-addon1" />
                </div>
              </div>
              <center>
              
                  <button type="button" class="btn btn-dark m-10" onClick={editFilm}>Editar</button>
                
              </center>
              
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header" id="headingFor">
            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFor" aria-expanded="false" aria-controls="collapseFor">
              Eliminar peliculas 
            </button>
          </h2>
          <div id="collapseFor" className="accordion-collapse collapse" aria-labelledby="headingFor" data-bs-parent="#accordionExample">
            <div className="accordion-body">
              
              
              <center>
              
                  <button type="button" class="btn btn-danger m-10" onClick={removeFilms}>Eliminar peliculas</button>
                
              </center>
              
            </div>
          </div>
        </div>
      </div>
    </center>
    <ToastContainer />
    </>
    
  );
}

export default App;
