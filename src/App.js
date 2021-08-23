import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import MainPage from './components/MainPage';
import BlogDetail from './components/BlogDetail';

function App() {
  return (
  	<Router>
      <Header/>
      	<Switch>
        	<Route exact path="/" render={(props) => <MainPage/>} />
        	<Route exact path="/blog-detail/:slug" component={() => <BlogDetail/>} />
      	</Switch>
      <Footer/>
    </Router>
  );
}

export default App;
