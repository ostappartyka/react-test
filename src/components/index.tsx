import * as React from "react";
import * as ReactDOM from "react-dom";
import { useState, useEffect } from 'react';

const METRIC_ENDPOINT = "/metrics";
const ENV_URL: any = {
  ['dev']: "https://dev.dummy-svr.com",
  ['prod']: "https://prod.dummy-svr.com"
};

function genQuery (timeRange: string, componentName: string, seed: number) {
    return `SELECT ${timeRange} WHERE c = ${componentName} AND x = ${(seed%7)==0?'true':'false'}`;
}

function Loading() {
    return <h2>Loading</h2>;
}

interface IProps { 
    timeRange: string;
}

const useData = (query: string, interval: number) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        setError(null);

        const res = await fetch(`${ENV_URL[process.env.ENVIRONMENT]}/${METRIC_ENDPOINT}`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "POST",
          body: JSON.stringify(query)
        });
      setData(res);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }

      setLoading(false);
    };
    
    fetchData();
    const intervalId = setInterval(() => {
      fetchData();
    }, interval);

    return () => {
      clearInterval(intervalId)
    }
  }, []);

  return [data, loading, error];
}

function C1(props: IProps) {
    const refreshInterval_Secs = 60;
    const query = genQuery(props.timeRange, "c1", Math.random());
    const [data, loading, error] = useData(query, refreshInterval_Secs);

    if (error) {
      return <div>Error - {error}</div>
    }

    return <>Hi {loading ? <Loading /> : data}</>; 
}

function C2(props: IProps) {
    const refreshInterval_Secs = 10;
    const query = genQuery(props.timeRange, "c2", Math.random());
    const [data, loading, error] = useData(query, refreshInterval_Secs);

    if (error) {
      return <div>Error - {error}</div>
    }

    return <>Hello there {loading ? <Loading /> : data}</>; 
}

function C3(props: IProps) {
    const refreshInterval_Secs = 15;
    const query = genQuery(props.timeRange, "c3", Math.random());
    const [data, loading, error] = useData(query, refreshInterval_Secs);

    if (error) {
      return <div>Error - {error}</div>
    }

    return <>Charlie {loading ? <Loading /> : data} Tango</>;
}

function C4(props: IProps) {
    const refreshInterval_Secs = 42;
    const query = genQuery(props.timeRange, "c4", Math.random());
    const [data, loading, error] = useData(query, refreshInterval_Secs);

    if (error) {
      return <div>Error - {error}</div>
    }

    return <>A fox jumped {loading ? <Loading /> : data}</>; 
}

function C5(props: IProps) {
    const refreshInterval_Secs = 30;
    const query = genQuery(props.timeRange, "c5", Math.random());
    const [data, loading, error] = useData(query, refreshInterval_Secs);

    if (error) {
      return <div>Error - {error}</div>
    }

    return <>{loading ? <Loading /> : data}is king</>;
}

function App() {
  return (
    <>
      <C1 timeRange={'1000'}/>
      <C2 timeRange={'2000'}/>
      <C3 timeRange={'3000'}/>
      <C4 timeRange={'4000'}/>
      <C5 timeRange={'5000'}/>
    </>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById("root")
);
