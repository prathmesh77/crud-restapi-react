import React from 'react';
import { Table,Button } from 'reactstrap';
import axios from 'axios';
import Create from './components/create.componet';
import Edit from './components/edit.component';

class App extends React.Component {
  state = {
    books: [],
    newBookData: {
      name: null,
      author: null,
      description:null
    },
    editBookData: {
      id:null,
      name: null,
      author: null,
      description:null
    },
    isNewModalOpen: false,
    isEditModalOpen:false
  }

  componentDidMount() {
    this.refreshBookList();
  }

  /**to toggle current state of modal  */
  toggle=()=>{
    this.setState({
      isNewModalOpen:!this.state.isNewModalOpen
    })
  }

  /**to toggle current state of Edit modal  */
  toogleEditModal = () => {
    this.setState({
      isEditModalOpen:!this.state.isEditModalOpen
    })
  }

  /**a common method to setState all input data */
  handleChange=(e)=> {
    const { name, value } = e.target;
    this.setState({
      newBookData: {
      ...this.state.newBookData,
      [name]: value
      }
    }
    );
  }

  handleChangeForEdit=(e)=> {
    const { name, value } = e.target;
    this.setState({
      editBookData: {
      ...this.state.editBookData,
      [name]: value
      }
    }
    );
  }

  refreshBookList() {
    axios
    .get("http://localhost:3000/books")
    .then(response=>this.setState({books:response.data}))
    .catch(error => console.log(error));
  }

/**post request to save data to server */
  addnewBook = () => {
    axios.post("http://localhost:3000/books", this.state.newBookData).then(response => {
      const { books } = this.state;
      books.push(response.data);

      this.setState({
        books,
        newBookData: {
          name: '',
          author: '',
          description: ''
        },
        isNewModalOpen: !this.state.isNewModalOpen
      },()=>console.log(this.state));
    });
  }

/**Edit request to server */
  editBookData = (id,name,author,description) => {
    this.setState({
      editBookData: {
        id:id,
        name: name,
        author: author,
        description:description
      },
      isEditModalOpen:!this.state.isEditModalOpen
    })
  }

/**Update a book */
  updateBookData = () => {
    const { name, author, description } = this.state.editBookData;
    console.log(name, author, description,this.state.editBookData.id);
    axios.put("http://localhost:3000/books/" + this.state.editBookData.id, {
      name, author, description
    }).then((response) => {
      this.refreshBookList();
      this.setState({
        isEditModalOpen: !this.state.isEditModalOpen,
        editBookData: {
          id: '',
          name: '',
          author: '',
          description: ''
        }
      });
    }).catch(error => console.log(error));
  }

  /**Delete specific book */
  deleteBook=(id)=> {
    axios.delete('http://localhost:3000/books/' + id).then((response) => {
      this.refreshBookList();
    });
  }
  render() {

    const books = this.state.books.map((book,index) => {
      return (
        <tr key={book._id}>
          <td>{++index}</td>
          <td>{book.name}</td>
          <td>{book.author}</td>
          <td>{book.description}</td>
          <td>
            <Button className='mr-2' color='success' size='sm' onClick={()=>this.editBookData(book._id,book.name,book.author,book.description)}>Edit</Button>
            <Button className='' color='danger' size='sm' onClick={() => this.deleteBook(book._id)}>Delete</Button>
          </td>
      </tr>
      )
    });

    return(
      <div className='App container'>
        <h1>Books App</h1>
        <Button className="my-3" color="primary" onClick={this.toggle}>Add Book</Button>
        <Table>
          <Create
            toggle={this.toggle}
            isNewModalOpen={this.state.isNewModalOpen}
            handleChange={this.handleChange}
            newBookData={this.state.newBookData}
            addnewBook={this.addnewBook}
          />
           <Edit
            toogleEditModal={this.toogleEditModal}
            isEditModalOpen={this.state.isEditModalOpen}
            handleChangeForEdit={this.handleChangeForEdit}
            editBookData={this.state.editBookData}
            updateBookData={this.updateBookData}
          />
          <thead>
            <tr>
              <th>#</th>
              <th>title</th>
              <th>author</th>
              <th>description</th>
            </tr>
          </thead>

          <tbody>
            {books}
          </tbody>
      </Table>
      </div>
    );  
  }
  
}

export default App;
