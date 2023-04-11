import request  from "supertest";
import app from "../app.js";

describe("Auth -- SignUp -- Login Routes Testing", () => {
    describe("/login route", () => {
        it('GET / Should return login page', (done) => {
            request(app)
                .get(`/`)
                .expect(200)
                .expect('Content-Type', 'text/html')
                .end((err, res) => {
                    done();
                });
        });
    });

    describe("signup route")
});