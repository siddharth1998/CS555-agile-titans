import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const CreateContract = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const contractNoRef = useRef();
  const contractTypeRef = useRef();
  const entityTypeRef = useRef();
  const firstPartyRef = useRef();

  const postContract =  () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      contractNo: contractNoRef.current.value,
      contractType: contractTypeRef.current.value,
      entity: entityTypeRef.current.value,
      firstParty: firstPartyRef.current.value,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:3001/contract/create", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      setError("");
      postContract();
      navigate("/contract/details");
    } catch {
      setError("Failed to Create a contract!");
    }
  };

  return (
    <div>
      <form>
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <div className="mb-3 row">
          <label htmlFor="contractNo" className="col-sm-2 col-form-label">
            Contract No.
          </label>
          <div className="col-sm-3">
            <input
              type="text"
              className="form-control"
              id="contractNo"
              ref={contractNoRef}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="firstParty" className="col-sm-2 col-form-label">
            Party A
          </label>
          <div className="col-sm-3">
            <input
              type="text"
              className="form-control"
              id="firstParty"
              ref={firstPartyRef}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="contractType" className="col-sm-2 col-form-label">
            Contract Type
          </label>
          <div className="col-sm-3">
            <select
              className="form-select form-select-md mb-3"
              id="contractType"
              ref={contractTypeRef}
            >
              <option value="lease">Lease</option>
              <option value="sale">Sale</option>
            </select>
          </div>
        </div>
        <div className="mb-3 row">
          <label htmlFor="entity" className="col-sm-2 col-form-label">
            Entity Type
          </label>
          <div className="col-sm-3">
            <select
              className="form-select form-select-md mb-3"
              id="entiry"
              ref={entityTypeRef}
            >
              <option value="person">Person</option>
              <option value="company">Company</option>
            </select>
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Next
        </button>
      </form>
    </div>
  );
};

export default CreateContract;
