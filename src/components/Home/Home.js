import { useEffect, useState } from "react";
import "./Home.scss";
const countries = require("../../geo_data/countries+states+cities.json");

const HomePage = () => {
  const listCountries = countries.map((data) => data);
  const [filter, setFilter] = useState("");
  const [stateFilter, setStateFilter] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);

  useEffect(() => {
    let stateContainer = [];
    let cityContainer = [];
    countries
      .filter((f) => f.name === stateFilter)
      .map((data) => setStateList(data.states));

    stateList
      .filter((data) => data.name.includes(stateFilter) || stateFilter === "")
      .map((state) => {
        stateContainer.push(state);
        setStateList(stateContainer);
      });

    stateList
      .filter((data) => data.name.includes(cityFilter))
      .map((city) => setCityList(city.cities));

    cityList
      .filter((data) => data.name.includes(cityFilter))
      .map((data) => {
        cityContainer.push(data);
        setCityList(cityContainer);
      });
  }, [stateFilter, cityFilter]);

  return (
    <div className="container">
      <table className="countriesList">
        <tbody>
          <tr className="header">
            <td>Countries</td>
          </tr>
          <tr className="coutriesData">
            <td>
              <input
                id="input"
                type="search"
                placeholder="Search Countries.."
                onChange={(event) => setFilter(event.target.value)}
                className="inputEle"
              />
            </td>
          </tr>
          <tr>
            {listCountries
              .filter(
                (f) =>
                  f.name.toLowerCase().includes(filter) ||
                  f.name.includes(filter) ||
                  filter === ""
              )
              .map((f) => (
                <td key={f.id}>
                  <div className="innerData">
                    <div>
                      <span>{f.emoji}</span>
                      <span className="innerText">{f.name}</span>
                      <span className="roundedBorders">{f.iso2}</span>
                    </div>
                    <div>
                      <i
                        className="fa fa-arrow-circle-right"
                        aria-hidden="true"
                        onClick={() => setStateFilter(f.name)}
                      ></i>
                    </div>
                  </div>
                </td>
              ))}
          </tr>
        </tbody>
      </table>
      <table className="countriesList">
        <tbody>
          <tr>
            <td className="header">States</td>
          </tr>
          <tr className="coutriesData">
            <td>
              <input
                id="input"
                type="search"
                placeholder="Search States.."
                onChange={(event) => setStateFilter(event.target.value)}
                className="inputEle"
              />
            </td>
          </tr>
          {stateList.length ? (
            <tr>
              {stateList.map((data) => (
                <td key={data.id}>
                  <div className="innerData">
                    <div>
                      <span className="innerText">{data.name}</span>
                      <span className="roundedBorders">{data.state_code}</span>
                    </div>
                    <div>
                      <i
                        className="fa fa-arrow-circle-right"
                        aria-hidden="true"
                        onClick={() => setCityFilter(data.name)}
                      ></i>
                    </div>
                  </div>
                </td>
              ))}
            </tr>
          ) : (
            <tr>
              <td>No States Found.</td>
            </tr>
          )}
        </tbody>
      </table>
      <table className="countriesList">
        <tbody>
          <tr>
            <td className="header">Cities</td>
          </tr>
          <tr className="coutriesData">
            <td>
              <input
                id="input"
                type="search"
                placeholder="Search Cities.."
                onChange={(event) => setCityFilter(event.target.value)}
                className="inputEle"
              />
            </td>
          </tr>
          {cityList.length ? (
            <tr>
              {cityList.map((data) => (
                <td key={data.id}>
                  <div className="innerData">
                    <div>
                      <span className="innerText">{data.name}</span>
                    </div>
                    <div>
                      <i className="fa fa-info-circle" aria-hidden="true"></i>
                    </div>
                  </div>
                </td>
              ))}
            </tr>
          ) : (
            <tr>
              <td>No Cities Found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default HomePage;
