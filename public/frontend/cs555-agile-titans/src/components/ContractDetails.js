import { useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchSomething } from "../services/fetchService";

const ContractDetails = () => {
  const [error, setError] = useState("");
  const [jump, setJump] = useState(false);
  const navigate = useNavigate();
  const { contractNo } = useParams();
  const contractNoRef = useRef();
  const dateSignedRef = useRef();
  const firstPartyRef = useRef();
  const secondPartyRef = useRef();
  const paymentAmountRef = useRef();
  const noticePeriodRef = useRef();
  const startDateRef = useRef();
  const endDateRef = useRef();
  const firstPartySignedRef = useRef();

  const localUser = JSON.parse(localStorage.getItem("user"));

  const postContractDetails = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      contractNo: contractNoRef.current.value,
      dateSigned: dateSignedRef.current.value,
      firstParty: firstPartyRef.current.value,
      secondParty: secondPartyRef.current.value,
      paymentAmount: paymentAmountRef.current.value,
      noticePeriod: noticePeriodRef.current.value,
      startDate: startDateRef.current.value,
      endDate: endDateRef.current.value,
      firstPartySignature: firstPartySignedRef.current.value,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetchSomething(
      `api/contract/details/create/${contractNo}`,
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

    postContractDetails();
    
  };

  if (jump) {
    navigate("/contract");
    window.location.reload();
  }

  return (
    <div>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <form>
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
                  value={contractNo}
                />
              </div>
            </div>
            <div>
              This Contract Agreement (“Agreement”), is made and entered into on
              <div className="mb-3 row">
                <div className="col-sm-3">
                  <label htmlFor="dateSigned" className="visually-hidden">
                    Date Signed
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="dateSigned"
                    ref={dateSignedRef}
                    defaultValue="2023-01-01"
                  />
                </div>
                <div className="col-sm-3">, by and between</div>
                <div className="col-sm-3">
                  <label htmlFor="firstPartyName" className="visually-hidden">
                    Party A
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstPartyName"
                    ref={firstPartyRef}
                    value={`${localUser.firstName}${localUser.lastName}`}
                    readOnly
                  />
                </div>
                <div className="col-sm-3">, (“Party A”), and</div>
              </div>
              <div className="mb-3 row">
                <div className="col-sm-3">
                  <label htmlFor="secondPartyName" className="visually-hidden">
                    Party B
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="secondPartyName"
                    ref={secondPartyRef}
                  />
                </div>
                <div className="col-sm-9">
                  , (“Party B”), collectively referred to herein as the
                  "Parties".
                </div>
              </div>
            </div>

            <h2>Scope of Agreement</h2>
            <p>The Parties agree to the following terms and conditions:</p>

            <h2>Payment</h2>
            <div className="mb-3 row">
              <div className="col-sm-5">
                Party B shall pay Party A the sum of
              </div>
              <div className="col-sm-2">
                <label htmlFor="paymentAmount" className="visually-hidden">
                  Payment Amount
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="paymentAmount"
                  ref={paymentAmountRef}
                  defaultValue="100000"
                />
              </div>
              <div className="col-sm-5">
                for the services provided by Party A.
              </div>
            </div>

            <h2>Termination</h2>
            <div className="mb-3 row">
              <div className="col-sm-7">
                This Agreement may be terminated by either Party upon
              </div>
              <div className="col-sm-3">
                <label htmlFor="noticePeriod" className="visually-hidden">
                  Notice Period
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="noticePeriod"
                  ref={noticePeriodRef}
                  defaultValue="30"
                />
              </div>
              <div className="col-sm-5">
                days' written notice to the other Party.
              </div>
            </div>

            <h2>Term</h2>
            <div>
              <div className="mb-3 row">
                <div className="col-sm-5">This Agreement shall commence on</div>
                <div className="col-sm-3">
                  <label htmlFor="startDate" className="visually-hidden">
                    Start Date
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="startDate"
                    ref={startDateRef}
                    defaultValue="2023-01-01"
                  />
                </div>
                <div className="col-sm-4">, and shall continue until</div>
              </div>
              <div className="mb-3 row">
                <div className="col-sm-3">
                  <label htmlFor="endDate" className="visually-hidden">
                    End Date
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="endDate"
                    ref={endDateRef}
                    defaultValue="2023-12-31"
                  />
                </div>
                <div className="col-sm-9">
                  , unless terminated earlier in accordance with this Agreement.
                </div>
              </div>
            </div>

            <h2>Entire Agreement</h2>
            <p>
              This Agreement constitutes the entire agreement between the
              Parties and supersedes all prior or contemporaneous negotiations,
              understandings, and agreements, whether oral or written, between
              the Parties.
            </p>

            <h2>Governing Law</h2>
            <p>
              This Agreement shall be governed by and construed in accordance
              with the laws of New Jersey.
            </p>

            <h2>Signatures</h2>
            <p>
              IN WITNESS WHEREOF, the Parties have executed this Agreement as of
              the date first above written.
            </p>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3 row">
                  <label
                    htmlFor="firstPartySignature"
                    className="col-sm-3 col-form-label"
                  >
                    Party A:
                  </label>
                  <div className="col-sm-6">
                    <input
                      type="text"
                      className="form-control"
                      id="firstPartySignature"
                      ref={firstPartySignedRef}
                    />
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-primary mb-3"
                  onClick={handleSubmit}
                >
                  Party A Sign
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ContractDetails;