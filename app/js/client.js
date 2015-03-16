'use strict';

var React = require('react');
var ajax = require('jquery').ajax;

var UnicornForm = React.createClass({
  getInitialState: function() {
    return {newUnicorn: {unicornBody: ''}};
  },
  handleChange: function(event) {
    this.setState({newUnicorn: {unicornBody: event.target.value}});
  },
  handleSubmit: function(event) {
    event.preventDefault();
    console.log(this.state.newUnicorn);
    var newUnicorn = this.state.newUnicorn;
    ajax({
      url: this.props.url,
      contentType: 'application/json',
      type: 'POST',
      data: JSON.stringify(newUnicorn),
      success: function(data) {
        this.props.onNewUnicornSubmit(data);
        this.setState({newUnicorn: {unicornBody: ''}});
      }.bind(this),
      error: function(xhr, status, err) {
        console.log(err);
      }
    });
  },
  render: function() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="newunicorn">New Unicorn </label>
        <input id="newunicorn" type="text" value={this.state.newUnicorn.unicornBody} onChange={this.handleChange} />
        <button type="submit">Create New Unicorn</button>
      </form>
    )
  }
});

var Unicorn = React.createClass({
  render: function() {
    return <li>{this.props.data.unicornBody}</li>
  }
}); 

var UnicornList = React.createClass({
  render: function() {
    var unicorns = this.props.data.map(function(unicorn) {
      return <Unicorn data={unicorn} key={unicorn._id}/>
    });
    return (
      <section>
        <h1>Unicorns:</h1>
          <ul>
            {unicorns}
          </ul>
      </section>
    )
  }
});

var UnicornApp = React.createClass({
  getInitialState: function() {
    return {unicornData: []};
  },
  onNewUnicorn: function(unicorn) {
    unicorn._id = this.state.unicornData.length + 1;
    var stateCopy = this.state;
    stateCopy.unicornData.push(unicorn);
    this.setState(stateCopy);
  },
  componentDidMount: function() {
    ajax({
      url: this.props.unicornBaseUrl,
      dataType: 'json',
      success: function(data) {
        var state = this.state;
        state.unicornData = data;
        this.setState(state);
      }.bind(this),
      error: function(xhr, status) {
        console.log(xhr, status);
      }
    });
  },
  render: function() {
    return (
      <main>
        <UnicornForm onNewUnicornSubmit={this.onNewUnicorn} url={this.props.unicornBaseUrl} />
        <UnicornList data={this.state.unicornData} />
      </main>
    )
  }
});

React.render(<UnicornApp unicornBaseUrl={'api/v1/unicorns'} />, document.body);