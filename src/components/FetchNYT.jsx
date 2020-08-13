import React, {
    useState,
    useEffect
  } from "react";
  import { DisplayNYT } from "./DisplayNYT";
  
  const baseURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
  const key = "b2e02612e179494c9f1f57577b582a0a";
  
  export const FetchNYT = () => {
    const emptyResults = [];
    const [search, setSearch] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [pageNumber, setPageNumber] = useState();
    const [results, setResults] = useState(emptyResults);
  
    const fetchResults = () => {
      let url = `${baseURL}?api-key=${key}&page=${pageNumber}&q=${search}`;
      url = startDate ? `${url}&begin_date=${startDate}` : url;
      url = endDate ? `${url}&end_date=${endDate}` : url;
      console.log(url);
  
      fetch(url)
        .then(res => res.json())
        .then((data) => {
          setResults(data.response.docs);
          console.log(data);
        })
        .catch((err) => console.log(err));
    };
  
    useEffect(() => {
      if (search) {
        fetchResults();
      }
    }, [pageNumber]);
  
    const handleSubmit = (event) => {
      event.preventDefault();
      setPageNumber(0);
    };
  
    const changePageNumber = (event, direction) => {
      event.preventDefault();
      if (direction === "down") {
        if (pageNumber > 0) {
          setPageNumber(pageNumber - 1);
        }
      }
      if (direction === "up") {
        setPageNumber(pageNumber + 1);
      }
    };
  
    return (
      <div className="main">
        <div className="mainDiv">
          <form onSubmit={(e) => handleSubmit(e)}>
            <span>Enter a single search term (required):</span>
            <input
              type="text"
              name="search"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              required
            />
            <br />
            <span>Enter a start date:</span>
            <input
              type="date"
              name="startDate"
              pattern="[0-9]{8}"
              onChange={(e) => setStartDate(e.target.value)}
            />
            <br />
            <span>Enter an end date:</span>
            <input
              type="date"
              name="endDate"
              pattern="[0-9]{8}"
              onChange={(e) => setEndDate(e.target.value)}
            />
            <br />
            <button className="submit">Submit Search</button>
          </form>
          {results.length > 0 ? (
            <DisplayNYT
    
              results={results}
              changePageNumber={changePageNumber}
              pageNumber={pageNumber}
            />
          ) : null}
        </div>
      </div>
    );
  };


export default FetchNYT