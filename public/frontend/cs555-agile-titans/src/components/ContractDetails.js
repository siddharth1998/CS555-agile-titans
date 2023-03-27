import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { fetchSomething } from "../services/fetchService";

const ContractDetails = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const contractNoRef = useRef();
  const dateSignedRef = useRef();
  const firstPartyRef = useRef();
  const secondPartyRef = useRef();
  const paymentAmountRef = useRef();
  const noticePeriodRef = useRef();
  const startDateRef = useRef();
  const endDateRef = useRef();
  const firstPartySignedRef = useRef();
  const secondPartySignedRef = useRef();

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

    fetchSomething(`api/contract/details/create`, requestOptions, res => {
      console.log(res);
    }, err => {
      console.log(err);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      setError("");
      postContractDetails();
      navigate("/contract");
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
        <div class="row">
          <div class="col-md-8" style={{ margin: "0 auto", textAlign: "left", border: "1px solid #000" }}>
            <h1 class="text-center my-5">Contract Agreement</h1>
            <div class="mb-3 row">
              <label for="contractNo" class="col-sm-2 col-form-label">Contract No.</label>
              <div class="col-sm-3">
                <input type="text" class="form-control" id="contractNo" ref={contractNoRef} />
              </div>
            </div>
            <div>
              This Contract Agreement (“Agreement”), is made and entered into on
              <div class="mb-3 row">
                <div class="col-sm-3">
                  <label for="dateSigned" class="visually-hidden">Date Signed</label>
                  <input type="text" class="form-control" id="dateSigned" ref={dateSignedRef} value="2023-01-01" />
                </div>
                <div class="col-sm-3">
                  , by and between
                </div>
                <div class="col-sm-3">
                  <label for="firstPartyName" class="visually-hidden">Party A</label>
                  <input type="text" class="form-control" id="firstPartyName" ref={firstPartyRef} />
                </div>
                <div class="col-sm-3">
                  , (“Party A”), and
                </div>
              </div>
              <div class="mb-3 row">
                <div class="col-sm-3">
                  <label for="secondPartyName" class="visually-hidden">Party B</label>
                  <input type="text" class="form-control" id="secondPartyName" ref={secondPartyRef} />
                </div>
                <div class="col-sm-9">
                  , (“Party B”), collectively referred to herein as the "Parties".
                </div>
              </div>
            </div>

            <h2>Scope of Agreement</h2>
            <p>The Parties agree to the following terms and conditions:</p>

            <h2>Payment</h2>
            <div class="mb-3 row">
              <div class="col-sm-5">
                Party B shall pay Party A the sum of
              </div>
              <div class="col-sm-2">
                <label for="paymentAmount" class="visually-hidden">Payment Amount</label>
                <input type="text" class="form-control" id="paymentAmount" ref={paymentAmountRef} value="100000" />
              </div>
              <div class="col-sm-5">
                for the services provided by Party A.
              </div>
            </div>

            <h2>Termination</h2>
            <div class="mb-3 row">
              <div class="col-sm-7">
                This Agreement may be terminated by either Party upon
              </div>
              <div class="col-sm-3">
                <label for="noticePeriod" class="visually-hidden">Notice Period</label>
                <input type="text" class="form-control" id="noticePeriod" ref={noticePeriodRef} value="30" />
              </div>
              <div class="col-sm-5">
                days' written notice to the other Party.
              </div>
            </div>

            <h2>Term</h2>
            <div>
              <div class="mb-3 row">
                <div class="col-sm-5">
                  This Agreement shall commence on
                </div>
                <div class="col-sm-3">
                  <label for="startDate" class="visually-hidden">Start Date</label>
                  <input type="text" class="form-control" id="startDate" ref={startDateRef} value="2023-01-01" />
                </div>
                <div class="col-sm-4">
                  , and shall continue until
                </div>
              </div>
              <div class="mb-3 row">
                <div class="col-sm-3">
                  <label for="endDate" class="visually-hidden">End Date</label>
                  <input type="text" class="form-control" id="endDate" ref={endDateRef} value="2023-12-31" />
                </div>
                <div class="col-sm-9">
                  , unless terminated earlier in accordance with this Agreement.
                </div>
              </div>
            </div>

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
            <div class="row">
              <div class="col-md-6">
                <div class="mb-3 row">
                  <label for="firstPartySignature" class="col-sm-3 col-form-label">Party A:</label>
                  <div class="col-sm-6">
                    <input type="text" class="form-control" id="firstPartySignature" ref={firstPartySignedRef} />
                  </div>
                </div>
                <button type="button" class="btn btn-primary mb-3" onClick={handleSubmit}>Party A Sign</button>
              </div>
              <div class="col-md-6">
                <div class="mb-3 row">
                  <label for="secondPartySignature" class="col-sm-3 col-form-label">Party B:</label>
                  <div class="col-sm-6">
                    <input type="text" class="form-control" id="secondPartySignature" ref={secondPartySignedRef} />
                  </div>
                </div>
                <button type="button" class="btn btn-primary mb-3">Party B Sign</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ContractDetails;