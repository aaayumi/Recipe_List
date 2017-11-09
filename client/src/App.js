import React, { Component } from 'react';
import './App.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class App extends Component {
   constructor(props){
    super(props);
       this.state={
           results: [],
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
   componentDidMount(){
       fetch('/api')
       .then(res => res.json())
       .then(results => this.setState({
          results
       }))
 
    }

    handleSubmit(e){
      e.preventDefault();
      fetch('/recipe', {
        method: 'POST',
        body: JSON.stringify({
          name: this.refs.name.value,
          ingredients: this.refs.ingredients.value,
          descriptions: this.refs.descriptions.value
        }),
        headers: {"Content-Type" : "application/json"}
      })
      .then((res)=> {
        return res.json()
      })
      .then((body)=>{
        console.log("body" + body)
        console.log("result" + this.refs.name.value)
      })
    }
    
    handleClick(){
      console.log("delete")
    }

  
  render() {
  console.log("----")
  console.log(this.state.results)

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
