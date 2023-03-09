import './Issue.css';

const Issue = () => {
    return (
        <div>
            <h1 className='something'> Customer Care Executive Portal </h1>
            <div class="main">
                <form class="row g-3" action="/form/issue" method="POST" >

                    <div class="col-md-6">
                        <label for="inputPassword4" class="form-label">User ID</label>
                        <input type="number" class="form-control" name="userId" required />
                    </div>

                    <div class="col-md-6">
                        <label for="inputEmail4" class="form-label">Email</label>
                        <input type="email" class="form-control" id="inputEmail4" name="email" required />
                    </div>

                    <div class="input-group">
                        <span class="input-group-text">Description</span>
                        <textarea class="form-control" aria-label="With textarea" name="description" required></textarea>
                    </div>

                    <div class="col-md-4">
                        <label for="inputState" class="form-label">Issue Status</label>
                        <select id="inputState" class="form-select" name="status" required>
                            <option selected value="unresolved">1. Unresolved</option>
                            <option value="resolved">2. Resolved</option>
                        </select>
                    </div>

                    <div class="col-md-4">
                        <label for="inputState" class="form-label">Priority</label>
                        <select id="inputState" class="form-select" name="priority" required>
                            <option selected value="high">1. High</option>
                            <option value="medium">2. Medium</option>
                            <option value="low">3. Low</option>
                        </select>
                    </div>

                    <div class="col-12">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" id="gridCheck" required />
                            <label class="form-check-label" for="gridCheck">
                                The above information is true and is same as provided by the customer.
                            </label>
                        </div>
                    </div>
                    <div class="col-12">
                        <button type="submit" class="btn btn-primary">Submit Status/ Generate Ticket</button>
                    </div>
                </form>
            </div>

        </div>
    );
}

export default Issue;