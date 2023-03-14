import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchSomething } from "../services/fetchService";
import { SERVER_URL } from '../config';

const ContractList = () => {
  const navigate = useNavigate();
  const [contractList, setContractList] = useState([]);

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetchSomething(`${SERVER_URL}contract`, requestOptions, result => {
      result.contractList = result.contractList.map(c => {
        return {
          ...c,
          dateSigned: new Date(c.dateSigned).toDateString(),
          startDate: new Date(c.startDate).toDateString(),
          endDate: new Date(c.endDate).toDateString(),
        };
      });
      setContractList(result.contractList);
    }, err => console.log("error", err))
  }, []);

  const handleSubmit = () => {
    navigate("/contract/create");
  };

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Contract No.</th>
            <th scope="col">Contract Tyoe</th>
            <th scope="col">Entity</th>
            <th scope="col">Start Date</th>
            <th scope="col">End Date</th>
            <th scope="col">Date Signed</th>
            <th scope="col">Party A</th>
            <th scope="col">Party B</th>
            <th scope="col">Contract Status</th>
          </tr>
        </thead>
        <tbody>
          {contractList && contractList?.map((data, i) => {
            return (
              <tr key={i}>
                <th scope="row">{i}</th>
                <td>
                  <a href="/contract/details">{data.contractNo}</a>
                </td>
                <td>{data.contractType}</td>
                <td>{data.entity}</td>
                <td>{data.startDate}</td>
                <td>{data.endDate}</td>
                <td>{data.dateSigned}</td>
                <td>{data.firstParty}</td>
                <td>{data.secondParty}</td>
                <td>{data.contractStatus ? "In Progress" : "Terminate"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <button
          type="button"
          className="btn btn-primary mb-3"
          onClick={handleSubmit}
        >
          Create a new Contract
        </button>
      </div>
    </div>
  );
};

export default ContractList;
