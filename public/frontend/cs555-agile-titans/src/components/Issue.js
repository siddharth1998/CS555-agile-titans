import './Issue.css';

const Issue = () => {
    return (
        <div>
            <h1 className="something-issue"> Customer Care Executive Portal </h1>
            <div className="main">
                <form className="row g-3" action="/api/form/issue" method="POST" >

                    <div className="col-md-6">
                        <label for="inputPassword4" className="form-label">User ID</label>
                        <input type="number" className="form-control" name="userId" required />
                    </div>

                    <div className="col-md-6">
                        <label for="inputEmail4" className="form-label">Email</label>
                        <input type="email" className="form-control" id="inputEmail4" name="email" required />
                    </div>

                    <div className="input-group">
                        <span className="input-group-text">Description</span>
                        <textarea className="form-control" aria-label="With textarea" name="description" required></textarea>
                    </div>

                    <div className="col-md-4">
                        <label for="inputState" className="form-label">Issue Status</label>
                        <select id="inputState" className="form-select" name="status" required>
                            <option selected value="unresolved">1. Unresolved</option>
                            <option value="resolved">2. Resolved</option>
                        </select>
                    </div>

                    <div className="col-md-4">
                        <label for="inputState" className="form-label">Priority</label>
                        <select id="inputState" className="form-select" name="priority" required>
                            <option selected value="high">1. High</option>
                            <option value="medium">2. Medium</option>
                            <option value="low">3. Low</option>
                        </select>
                    </div>

                    <div className="col-12">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="gridCheck" required />
                                <label className="form-check-label" for="gridCheck">
                                    The above information is true and is same as provided by the customer.
                                </label>
                        </div>
                    </div>
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary">Submit Status/ Generate Ticket</button>
                    </div>
                </form>
            </div>

        </div >
    );
}

export default Issue;