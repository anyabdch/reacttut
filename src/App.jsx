import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Banner from './components/Banner';
import CourseList from './components/CourseList';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useDbData } from './utilities/firebase';
import TermPage from './components/TermPage';

const Main = () => {
  const [data, error] = useDbData('/');

  if (error) return <h1>Error loading user data: {error.toString()}</h1>;
  if (data === undefined) return <h1>Loading user data...</h1>;
  if (!data) return <h1>No user data found</h1>;

  const terms = {
    Fall : Object.entries(data.courses).filter(([id, course]) => course.term === 'Fall'),
    Winter : Object.entries(data.courses).filter(([id, course]) => course.term === 'Winter'),
    Spring : Object.entries(data.courses).filter(([id, course]) => course.term === 'Spring')
  };

  return <div>
          <header>
            <Banner title={data.title}/>
          </header>
          <TermPage terms={terms} />
        </div>;  
}

const queryClient = new QueryClient;

const App = () => {

  
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <div className="container">
          <Main />
        </div>
      </QueryClientProvider>
    </div>
  );
};

export default App;
