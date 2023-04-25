import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchSomething } from "../services/fetchService";

const ContractContent = () => {
  const [contractContent, setContractContent] = useState({});
  const [error, setError] = useState("");
  const [jump, setJump] = useState(false);
  const { contractNo } = useParams();
  const navigate = useNavigate();
  const secondPartySignedRef = useRef();

  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetchSomething(
      `api/contract/content/${contractNo}`,
      requestOptions,
      (result) => {
        result.contractContent["dateSigned"] = String(
          result.contractContent["dateSigned"]
        ).substring(0, 10);
        result.contractContent["startDate"] = String(
          result.contractContent["startDate"]
        ).substring(0, 10);
        result.contractContent["endDate"] = String(
          result.contractContent["endDate"]
        ).substring(0, 10);
        setContractContent(result.contractContent);
      },
      (err) => {
        console.log("error", err);
        setError(err.massage);
      }
    );
  }, [contractNo]);

  const postSecondParty = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      secondPartySignature: secondPartySignedRef.current.value,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetchSomething(
      `api/contract/content/${contractNo}`,
      requestOptions,
      (res) => {
        console.log(res);
        setJump(true);
      },
      (err) => {
        console.log("error", err);
        setError(err.message);
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setJump(false);

    postSecondParty();
  };

  if (jump) {
    window.location.reload();
  }

  return (
    <div>
      <div className="row">
        <div
          className="col-md-8"
          style={{
            margin: "0 auto",
            textAlign: "left",
            border: "1px solid #000",
          }}
        >
          <h1 className="text-center my-5">Contract Agreement</h1>
          <p>
            This Contract Agreement (“Agreement”), is made and entered into on [
            <u>{contractContent.dateSigned}</u>], by and between [
            <u>{contractContent.firstParty}</u>], (“Party A”), and [
            <u>{contractContent.secondParty}</u>], (“Party B”), collectively
            referred to herein as the “Parties.”
          </p>

          <h2>Scope of Agreement</h2>
          <p>The Parties agree to the following terms and conditions:</p>

          <h2>Payment</h2>
          <p>
            Party B shall pay Party A the sum of [$
            <u>{contractContent.paymentAmount}</u>] for the services provided by
            Party A.
          </p>

          <h2>Termination</h2>
          <p>
            This Agreement may be terminated by either Party upon [
            <u>{contractContent.noticePeriod}</u>] days' written notice to the
            other Party.
          </p>

          <h2>Term</h2>
          <p>
            This Agreement shall commence on [<u>{contractContent.startDate}</u>
            ], and shall continue until [<u>{contractContent.endDate}</u>],
            unless terminated earlier in accordance with this Agreement.
          </p>

          <h2>Entire Agreement</h2>
          <p>
            This Agreement constitutes the entire agreement between the Parties
            and supersedes all prior or contemporaneous negotiations,
            understandings, and agreements, whether oral or written, between the
            Parties.
          </p>

          <h2>Governing Law</h2>
          <p>
            This Agreement shall be governed by and construed in accordance with
            the laws of New Jersey.
          </p>

          <h2>Signatures</h2>
          <p>
            IN WITNESS WHEREOF, the Parties have executed this Agreement as of
            the date first above written.
          </p>
          <div className="row">
            <div className="col-md-4">
              <p>Party A: </p>
              <p
                style={{
                  fontFamily: "Katedryllon",
                  fontSize: "60px",
                  marginLeft: "50px",
                }}
              >
                {contractContent.firstPartySignature}
              </p>
            </div>
            {contractContent.secondPartySignature && (
              <div className="col-md-4">
                <p>Party B: </p>
                <p
                  style={{
                    fontFamily: "Katedryllon",
                    fontSize: "60px",
                    marginLeft: "50px",
                  }}
                >
                  {contractContent.secondPartySignature}
                </p>
              </div>
            )}
            {!contractContent.secondPartySignature && (
              <div className="col-md-4">
                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}
                <form>
                  <div className="mb-3 row">
                    <label
                      htmlFor="secondPartySignature"
                      className="col-sm-3 col-form-label"
                    >
                      Party B:
                    </label>
                    <div className="col-sm-6">
                      <input
                        type="text"
                        className="form-control"
                        id="secondPartySignature"
                        ref={secondPartySignedRef}
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary mb-3"
                    onClick={handleSubmit}
                  >
                    Party B Sign
                  </button>
                </form>
              </div>
            )}
            <div className="col-md-2">
              {contractContent.secondPartySignature && (
                <button
                  type="button"
                  className="btn btn-primary mt-2"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/contract/update/${contractNo}`);
                  }}
                >
                  Update
                </button>
              )}
              <button
                type="button"
                className="btn btn-primary mt-2"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/contract");
                }}
              >
                Back to Contracts
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

};

export default ContractContent;
