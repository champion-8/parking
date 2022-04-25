const supertest = require('supertest')
const app = require('../app')

describe('Parking API', () => {
    describe("Get Parking", () => {
        it("Status 200", async () => {
            await supertest(app).get("/api/parking").expect(200);
            
        });
    });

    describe("Get Parking Status", () => {
        it("Status 200", async () => {
            await supertest(app).get("/api/parking/status").expect(200);
            
        });
    });

    describe("Create Parking", () => {
      describe("Create Parking Validation Error", () => {
        describe("Create Parking Missing Field", () => {
          describe("Create Parking Missing Field : Name", () => {
            const payload = {
              name: null,
            };

            it("Status 400", async () => {
              await supertest(app).post("/api/parking").send(payload).expect(400);
              
            });

            it("Error Message", async () => {
              await supertest(app)
                .post("/api/parking")
                .send(payload)
                .then((res) => {
                  expect(res.body.errorMessage).toBe(
                    "Please input parking name"
                  );
                });
              
            });
          });

          describe("Create Parking Missing Field : Slot", () => {
            const payload = {
              name: "Parking n",
              slot: null,
            };
            it("Status 400 : slot", async () => {
              await supertest(app).post("/api/parking").send(payload).expect(400);
              
            });

            it("Error Message : slot", async () => {
              await supertest(app)
                .post("/api/parking")
                .send(payload)
                .then((res) => {
                  expect(res.body.errorMessage).toBe("Please input slot");
                });
              
            });
          });

          describe("Create Parking Missing Field : Sub Parking", () => {
            const payload = {
              name: "Parking n",
              slot: 10,
            };
            it("Status 400 : sub parking", async () => {
              const { statusCode } = await supertest(app)
                .post("/api/parking")
                .send(payload)
                .expect(400);
              
            });

            it("Error Message : sub parking", async () => {
              await supertest(app)
                .post("/api/parking")
                .send(payload)
                .then((res) => {
                  expect(res.body.errorMessage).toBe(
                    "Sub parking format is invalid"
                  );
                });
              
            });
          });

          describe("Create Parking Missing Field : Sub Parking Name", () => {
            const payload = {
              name: "Parking",
              slot: 10,
              subParkings: [],
            };
            it("Status 400 : sub parking name", async () => {
              await supertest(app).post("/api/parking").send(payload).expect(400);
              
            });

            it("Error Message : sub parking name", async () => {
              await supertest(app)
                .post("/api/parking")
                .send(payload)
                .then((res) => {
                  expect(res.body.errorMessage).toBe("Name is exists");
                });
              
            });
          });
        });

        describe("Create Parking Over Max Length", () => {
          const payload = {
            name: "ABCDEFGHIJHLMNOPQURSTUVWXYZ,ABCDEFGHIJHLMNOPQURSTUVWXYZ",
          };

          it("Status 400", async () => {
            await supertest(app).post("/api/parking").send(payload).expect(400);
            
          });

          it("Error Message", async () => {
            await supertest(app)
              .post("/api/parking")
              .send(payload)
              .then((res) => {
                expect(res.body.errorMessage).toBe("Parking name is maxlength 50");
              });
            
          });
        });

        describe("Create Parking Name Dupliacte", () => {
          const payload = {
            name: "small",
          };

          it("Status 400", async () => {
            await supertest(app).post("/api/parking").send(payload).expect(400);
            
          });

          it("Error Message", async () => {
            await supertest(app)
              .post("/api/parking")
              .send(payload)
              .then((res) => {
                expect(res.body.errorMessage).toBe("Name is exists");
              });
            
          });
        });
      });

      // describe('Create Parking success', () => {
      //     const payload = {
      //         name: "largest"
      //     };

      //     test('Status 200', async () => {
      //         const { statusCode } =  await supertest(app).post('/api/parking').send(payload);
      //         expect(statusCode).toBe(200);
      //     });
      // });
    });

    describe("Update Parking", () => {
      describe("Update Parking Validation Error", () => {
        describe("Update Parking Over Max Length", () => {
          const payload = {
            name: "ABCDEFGHIJHLMNOPQURSTUVWXYZ,ABCDEFGHIJHLMNOPQURSTUVWXYZ",
          };

          it("Status 400", async () => {
            await supertest(app).put("/api/parking/1").send(payload).expect(400);
            
          });

          it("Error Message", async () => {
            await supertest(app)
              .put("/api/parking/1")
              .send(payload)
              .then((res) => {
                expect(res.body.errorMessage).toBe("Name is maxlength 50");
              });
            
          });
        });

        describe("Update Parking Data Type Incorrect", () => {
          const payload = {
            isActive: "A",
          };

          const id = "A";

          it("Status 400 : isActive", async () => {
            await supertest(app).put("/api/parking/1").send(payload).expect(400);
            
          });

          it("Error Message : isActive", async () => {
            await supertest(app)
              .put("/api/parking/1")
              .send(payload)
              .then((res) => {
                expect(res.body.errorMessage).toBe("Status is not correct");
              });
            
          });

          it("Status 400 : id", async () => {
            await supertest(app).put(`/api/parking/${id}`).send(payload).expect(400);
            
          });

          it("Error Message : id", async () => {
            await supertest(app)
              .put(`/api/parking/${id}`)
              .send(payload)
              .then((res) => {
                expect(res.body.errorMessage).toBe("Id must be a Integer");
              });
            
          });
        });

        describe("Update Parking Data Not Found", () => {
          const payload = {
            isActive: true,
          };

          it("Status 400", async () => {
            await supertest(app).put("/api/parking/1000").send(payload).expect(400);
            
          });

          it("Error Message", async () => {
            await supertest(app)
              .put("/api/parking/1000")
              .send(payload)
              .then((res) => {
                expect(res.body.errorMessage).toBe("Parking not found");
              });
            
          });
        });
      });
    });
});