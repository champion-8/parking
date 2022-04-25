const supertest = require("supertest");
const app = require("../app");

describe("Parking Regist API", () => {
  describe("Create Parking Regist", () => {
    describe("Create Parking Regist Validation Error", () => {
      describe("Create Parking Regist Missing Field", () => {
        describe("Create Parking Regist Missing Field : Parking Id", () => {
          const payload = {
            parkingId: "",
          };

          it("Status 400", async () => {
            await supertest(app)
              .post("/api/parking-regist")
              .send(payload)
              .expect(400);
          });

          test("Error Message", async () => {
            await supertest(app)
              .post("/api/parking-regist")
              .send(payload)
              .then((res) => {
                expect(res.body.errorMessage).toBe("Please input parking");
              });
          });
        });

        describe("Create Parking Regist Missing Field : Car Size Id", () => {
          const payload = {
            parkingId: 1,
            carSizeId: "",
          };

          it("Status 400", async () => {
            await supertest(app)
              .post("/api/parking-regist")
              .send(payload)
              .expect(400);
          });

          it("Error Message", async () => {
            await supertest(app)
              .post("/api/parking-regist")
              .send(payload)
              .then((res) => {
                expect(res.body.errorMessage).toBe("Please input car size");
              });
          });
        });

        describe("Create Parking Regist Missing Field : Number Plate", () => {
          const payload = {
            parkingId: 1,
            carSizeId: 1,
            numberPlate: "",
          };

          it("Status 400", async () => {
            await supertest(app)
              .post("/api/parking-regist")
              .send(payload)
              .expect(400);
          });

          it("Error Message", async () => {
            await supertest(app)
              .post("/api/parking-regist")
              .send(payload)
              .then((res) => {
                expect(res.body.errorMessage).toBe("Please input number plate");
              });
          });
        });
      });

      describe("Create Parking Regist Max Length", () => {
        const payload = {
          parkingId: 1,
          carSizeId: 1,
          numberPlate: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        };

        it("Status 400", async () => {
          await supertest(app)
            .post("/api/parking-regist")
            .send(payload)
            .expect(400);
        });

        it("Error Message", async () => {
          await supertest(app)
            .post("/api/parking-regist")
            .send(payload)
            .then((res) => {
              expect(res.body.errorMessage).toBe(
                "Number plate is maxlength 20"
              );
            });
        });
      });
      describe("Create Parking Regist Data Type is wrong", () => {
        describe("Create Parking Regist Data Type is wrong : Parking Id", () => {
          const payload = {
            parkingId: "A",
          };

          it("Status 400", async () => {
            await supertest(app)
              .post("/api/parking-regist")
              .send(payload)
              .expect(400);
          });

          it("Error Message", async () => {
            await supertest(app)
              .post("/api/parking-regist")
              .send(payload)
              .then((res) => {
                expect(res.body.errorMessage).toBe(
                  "Parking Id must be a Integer"
                );
              });
          });
        });

        describe("Create Parking Regist Data Type is wrong : Car Size Id", () => {
          const payload = {
            parkingId: 1,
            carSizeId: "A",
          };

          it("Status 400", async () => {
            await supertest(app)
              .post("/api/parking-regist")
              .send(payload)
              .expect(400);
          });

          it("Error Message", async () => {
            await supertest(app)
              .post("/api/parking-regist")
              .send(payload)
              .then((res) => {
                expect(res.body.errorMessage).toBe(
                  "Car size Id must be a Integer"
                );
              });
          });
        });
      });
    });
  });
});
