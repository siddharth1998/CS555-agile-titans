import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchSomething } from "../services/fetchService";

const ContractList = () => {
  const navigate = useNavigate();
  const [contractList, setContractList] = useState([]);

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetchSomething(
      `api/contract`,
      requestOptions,
      (result) => {
        result.contractList = result.contractList.map((c) => {
          return {
            ...c,
            dateSigned: String(c.dateSigned).substring(0, 10),
            startDate: String(c.startDate).substring(0, 10),
            endDate: String(c.endDate).substring(0, 10),
          };
        });
        setContractList(result.contractList);
      },
      (err) => console.log("error", err)
    );
  }, []);

  const handleSubmit = () => {
    navigate("/contract/create");
  };

  const deleteContract = (contractNo) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
    };

    fetchSomething(
      `api/contract/delete/${contractNo}`,
      requestOptions,
      (res) => console.log(res),
      (err) => console.log("error", err)
    );
  };

  const terminateContract = (contractNo) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      redirect: "follow",
    };

    fetchSomething(
      `api/contract/terminate/${contractNo}`,
      requestOptions,
      (res) => console.log(res),
      (err) => console.log("error", err)
    );
  };

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Contract No.</th>
            <th scope="col">Type</th>
            <th scope="col">Entity</th>
            <th scope="col">Start Date</th>
            <th scope="col">End Date</th>
            <th scope="col">Date Signed</th>
            <th scope="col">Party A</th>
            <th scope="col">Party B</th>
            <th scope="col">Status</th>
            <th scope="col">Function</th>
            <th scope="col">Additional Info</th>
          </tr>
        </thead>
        <tbody>
          {contractList &&
            contractList?.map((data, i) => {
              return (
                <tr key={i}>
                  <th scope="row">{i}</th>
                  <td>
                    <a href={`/contract/content/${data.contractNo}`}>
                      {data.contractNo}
                    </a>
                  </td>
                  <td>{data.contractType}</td>
                  <td>{data.entity}</td>
                  <td>{data.startDate}</td>
                  <td>{data.endDate}</td>
                  <td>{data.dateSigned}</td>
                  <td>{data.firstParty}</td>
                  <td>{data.secondParty}</td>
                  <td>{data.contractStatus}</td>
                  <td>
                    {!data.secondParty && (
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={(e) => {
                          e.preventDefault();
                          deleteContract(data.contractNo);
                          window.location.reload();
                        }}
                      >
                        Delete
                      </button>
                    )}
                    {data.secondParty &&
                      data.contractStatus !== "Terminate" && (
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={(e) => {
                            e.preventDefault();
                            terminateContract(data.contractNo);
                            window.location.reload();
                          }}
                        >
                          Terminate
                        </button>
                      )}
                  </td>
                  <td>{data.additionalInformation}</td>
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
