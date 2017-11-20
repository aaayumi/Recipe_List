import React, { Component } from 'react';
import './App.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class App extends Component {
   constructor(props){
    super(props);
      this.state={
            results: [],
            name: '',
            ingredients: '',
            descriptions: '',
            modal: false
         }
    this.toggle = this.toggle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
     this.handleClick = this.handleClick.bind(this);
   }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  componentDidMount() {
     fetch('/recipe')
     .then(res => res.json())
     .then(results => this.setState({
      results
     }))
   }

  handleSubmit(e) {
    e.preventDefault();
   const { name, ingredients, descriptions } = this.state;
    fetch('/', {
      method: 'POST',
      body: JSON.stringify({
        name,
        ingredients,
        descriptions
      }),
      headers: {"Content-Type" : "application/json"}
    })
    // when call completes, it should return the newly created recipe object
    // as it was saved in the DB - just store it into state
    .then((recipe)=> {
      this.setState({recipe});
    });
    // TODO: handle error case
  }
    handleClick(e){
      e.preventDefault();
      const { name, ingredients, descriptions } = this.state.results;
      console.log(this.state.results)
      fetch('/result', {
        method: 'delete',
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
          
        })
      })
      .then( res => {
        if(res.ok) return res.json()
      })
      .then(data => {
        console.log(data)
        window.location.reload()
      })
      console.log("delete")
      }      
 
  render() {
    let data = this.state.results;
    let recipe;
    if(data) {
       recipe = data.map(
         (obj) => (
            <div key={obj._id} className="recipeList">
            <h2>{obj.name}</h2>
            <p>{obj.ingredients}</p>
            <p>{obj.descriptions}</p>
            <button onClick={this.handleClick}>Delete</button>
            </div>
        ))
  }
    return (
      <div className="App"> 
        <h1>Recipe List</h1>
         <Button color="danger" onClick={this.toggle}>Add a recipe</Button>
         <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <form onSubmit={this.handleSubmit}>
           <ModalHeader toggle={this.toggle}>New Recipe</ModalHeader>
           <ModalBody>
           <input type="text" placeholder="name" ref="name" />
           <input type="text" placeholder="ingredients" ref="ingredients" />
           <input type="text" placeholder="descriptions" ref="descriptions" />
           </ModalBody>
           <ModalFooter>
             <input type="submit" onClick={this.toggle}/>
             <Button color="secondary" onClick={this.toggle}>Cancel</Button>
           </ModalFooter>
           </form>
         </Modal>
       {recipe}
        </div>           

      )
    }
  }

export default App;
