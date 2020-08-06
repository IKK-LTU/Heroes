import React, { Component} from 'react';
import logo from './img/star-wars-logo.png'; // with import
import './App.css';

class App extends Component {
  
  constructor(props) {
   super(props) 

  this.state = {
    name: null,
    birth: null,
    gender:null,
    heroes: [
      {name:'Skywalker', birth:'19BBY', gender:'M'},
      {name:'C-3PO', birth:'112BBY', gender:'n/a'},
      {name:'R2-D2', birth:'33BBY', gender:'n/a'},],
    filter:"",
    item:"",
    showinputs : false,
    
  };
  this.removeHero = this.removeHero.bind(this);
}

renderTableData() {
  const { filter, heroes } = this.state;
  if (!this.state.heroes.length) return null;
  const lowercasedFilter = filter.toLowerCase();
  
  const filteredData = heroes.filter(item => {
    return Object.keys(item).some(key =>
      item[key].toLowerCase().includes(lowercasedFilter)
    );
  });
     const { name, birth, gender} = heroes //destructuring
     
     return (
      filteredData.map((item,index) => (
        <tr>
        
          <td>{item.name}</td>
          <td>{item.birth}</td>
           <td>{item.gender}</td>
           <td>
            <button
              className="close"
                 type="button"
                 onClick={() => this.removeHero(index)}>
             </button>
             </td>
             </tr>
         
      ) ))

}

 renderTableHeader() {
  if (!this.state.heroes.length) return null;
  let header = Object.keys(this.state.heroes[0])
  return header.map((name, index) => {
     return  <th key={index}>{name.toUpperCase()}</th>
  })
}

removeHero = index => {
  this.setState(state => {
    const heroes = state.heroes.filter((item, j) => index !== j)
    return {
      heroes,
    };
  });
};

toggleHeroes = () => {
  const doesShow = this.state.showinputs
  this.setState({showinputs: !doesShow})
}
onChangeName = (event) => {
  {this.setState({name: event.target.value})}
};
onChangeBirth = (event) => {
  {this.setState({birth: event.target.value})}
};
onChangeGender = (event) => {
  {this.setState({gender: event.target.value})}
};

handleChange = event => {
  this.setState({ filter: event.target.value });
};

onAddItem = (event) => {
  this.setState(prevState =>
     ({
       heroes:
       [...prevState.heroes, 
         {name: prevState.name,
           birth: prevState.birth, 
           gender: prevState.gender}]
          })
  )};
  render() {
    const { filter, heroes } = this.state;
    return (
      
    <div className="App">
      
    <header className="App-header">

      <img src={logo} className="App-logo" alt="logo" /> 

      <h1 id='title'> Star Wars Heroes</h1>
      
      <button className='addHero' onClick={this.toggleHeroes}>+ Add Hero!</button>
      

      <input  type="Text" style={{margin: '15px',padding: '5px'}} value={filter} onChange={this.handleChange} placeholder="Sort Heroes" />

      <table id='heroes'>
  <tbody>

    <tr>{this.renderTableHeader()}</tr>
    <>{this.renderTableData()}</>

     {this.state.showinputs ?
      <tr>
      <td>
      <input
      type="text"
      value={this.state.name}
      onChange={this.onChangeName}
    />
    </td>
    <td>
    <input
      type="text"
      value={this.state.birth}
      onChange={this.onChangeBirth}
    />
    </td>
    <td>
    <input
      type="text"
      value={this.state.gender}
      onChange={this.onChangeGender}
    />
    </td>
    <td>
       <button
          type="button"
           onClick={this.onAddItem} >
           Add
       </button>
       </td>
       </tr> : null }
 </tbody>   
</table>
</header>
</div> 
  );

     }
}

export default App;
