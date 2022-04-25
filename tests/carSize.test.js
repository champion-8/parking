const supertest = require('supertest')
const app = require("../app");

describe("Car Size API", () => {
  describe("Get Car Size", () => {
    it("Status 200", async () => {
      await supertest(app).get("/api/car-size").expect(200);
    });
  });
  describe("Create Car Size", () => {
    describe("Create Car Size Validation Error", () => {
      describe("Create Car Size Missing Field", () => {
        const payload = {
          name: "",
        };

        it("Status 400", async () => {
          await supertest(app).post("/api/car-size").send(payload).expect(400);
        });

        it("Error Message", async () => {
          await supertest(app)
            .post("/api/car-size")
            .send(payload)
            .then((res) => {
              expect(res.body.errorMessage).toBe("Please input name");
            });
        });
      });

      describe("Create Car Size Over Max Length", () => {
        const payload = {
          name: "ABCDEFGHIJHLMNOPQURSTUVWXYZ,ABCDEFGHIJHLMNOPQURSTUVWXYZ",
        };

        it("Status 400", async () => {
          await supertest(app).post("/api/car-size").send(payload).expect(400);
        });

        it("Error Message", async () => {
          await supertest(app)
            .post("/api/car-size")
            .send(payload)
            .then((res) => {
              expect(res.body.errorMessage).toBe("Name is maxlength 50");
            });
        });
      });

      describe("Create Car Size Name Dupliacte", () => {
        const payload = {
          name: "small",
        };

        it("Status 400", async () => {
          await supertest(app).post("/api/car-size").send(payload).expect(400);
        });

        it("Error Message", async () => {
          await supertest(app)
            .post("/api/car-size")
            .send(payload)
            .then((res) => {
              expect(res.body.errorMessage).toBe("Name is exists");
            });
        });
      });
    });

    // describe('Create Car Size success', () => {
    //     const payload = {
    //         name: "largest"
    //     };

    //     test('Status 200', (done) => {
    //         const { statusCode } =  supertest(app).post('/api/car-size').send(payload);
    //         expect(statusCode).toBe(200);
    //     });
    // });
  });

  describe("Update Car Size", () => {
    describe("Update Car Size Validation Error", () => {
      describe("Update Car Size Over Max Length", () => {
        const payload = {
          name: "ABCDEFGHIJHLMNOPQURSTUVWXYZ,ABCDEFGHIJHLMNOPQURSTUVWXYZ",
        };

        it("Status 400", async () => {
          await supertest(app).put("/api/car-size/1").send(payload).expect(400);
        });

        it("Error Message", async () => {
          await supertest(app)
            .put("/api/car-size/1")
            .send(payload)
            .then((res) => {
              expect(res.body.errorMessage).toBe("Name is maxlength 50");
            });
        });
      });

      describe("Update Car Size Data Type Incorrect", () => {
        const payload = {
          isActive: "A",
        };

        const id = "A";

        it("Status 400 : isActive", async () => {
          await supertest(app).put("/api/car-size/1").send(payload).expect(400);
        });

        it("Error Message : isActive", async () => {
          await supertest(app)
            .put("/api/car-size/1")
            .send(payload)
            .then((res) => {
              expect(res.body.errorMessage).toBe("Status is not correct");
            });
        });

        it("Status 400 : id", async () => {
          await supertest(app)
            .put(`/api/car-size/${id}`)
            .send(payload)
            .expect(400);
        });

        it("Error Message : id", async () => {
          await supertest(app)
            .put(`/api/car-size/${id}`)
            .send(payload)
            .then((res) => {
              expect(res.body.errorMessage).toBe("Id  must be a Integer");
            });
        });
      });

      describe("Update Car Size Data Not Found", () => {
        const payload = {
          isActive: true,
        };

        it("Status 400", async () => {
          await supertest(app)
            .put("/api/car-size/1000")
            .send(payload)
            .expect(400);
        });

        it("Error Message", async () => {
          await supertest(app)
            .put("/api/car-size/1000")
            .send(payload)
            .then((res) => {
              expect(res.body.errorMessage).toBe("Car size not found");
            });
        });
      });
    });
  });
});
