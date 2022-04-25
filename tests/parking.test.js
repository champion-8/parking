const supertest = require('supertest')
const app = require('../app')

describe('Parking API', () => {
    describe('Get Parking', () => {
        it('Status 200', (done) => {
            supertest(app).get('/api/parking').expect(200);
            done();
        });
    });
    describe('Create Parking', () => {
        describe('Create Parking Validation Error', () => {
            describe('Create Parking Missing Field', () => {

                describe('Create Parking Missing Field : Name', () => {
                    const payload = {
                        name: null
                    };
                    
                    it('Status 400', (done) => {
                        supertest(app).post('/api/parking').send(payload).expect(400);
                        done();
                    });

                    it('Error Message', (done) => {
                        const { body } =  supertest(app).post('/api/parking').send(payload).then(res => {
                            expect(res.body.errorMessage).toBe('Please input parking name');
                        });
                        done();
                    });
                });

                describe('Create Parking Missing Field : Slot', () => {
                    const payload = {
                        name: "Parking",
                        slot: null
                    };
                    it('Status 400 : slot', (done) => {
                        supertest(app).post('/api/parking').send(payload).expect(400);
                        done();
                    });

                    it('Error Message : slot', (done) => {
                        supertest(app).post('/api/parking').send(payload).then(res => {
                            expect(res.body.errorMessage).toBe('Please input slot');
                        });;
                        done();
                    });
                });

                describe('Create Parking Missing Field : Sub Parking', () => {
                    const payload = {
                        name: "Parking",
                        slot: 10
                    };
                    it('Status 400 : sub parking', (done) => {
                        const { statusCode } =  supertest(app).post('/api/parking').send(payload).expect(400);
                        done();
                    });

                    it('Error Message : sub parking', (done) => {
                        const { body } =  supertest(app).post('/api/parking').send(payload).then(res => {
                            expect(res.body.errorMessage).toBe('Sub parking format is invalid');
                        });
                        done();
                    });
                });

                describe('Create Parking Missing Field : Sub Parking Name', () => {
                    const payload = {
                        name: "Parking",
                        slot: 10,
                        subParkings: []
                    };
                    it('Status 400 : sub parking name', (done) => {
                        supertest(app).post('/api/parking').send(payload).expect(400);
                        done();
                    });

                    it('Error Message : sub parking name', (done) => {
                        supertest(app).post('/api/parking').send(payload).then(res => {
                            expect(res.body.errorMessage).toBe('Name is exists');
                        });
                        done();
                    });
                });
            });

            describe('Create Parking Over Max Length', () => {
                const payload = {
                    name: "ABCDEFGHIJHLMNOPQURSTUVWXYZ,ABCDEFGHIJHLMNOPQURSTUVWXYZ"
                };
                
                it('Status 400', (done) => {
                    supertest(app).post('/api/parking').send(payload).expect(400);
                    done();
                });

                it('Error Message', (done) => {
                    supertest(app).post('/api/parking').send(payload).then(res => {
                        expect(res.body.errorMessage).toBe('Name is maxlength 50');
                    });
                    done();
                });
            });

            describe('Create Parking Name Dupliacte', () => {
                const payload = {
                    name: "small"
                };
                
                it('Status 400', (done) => {
                    supertest(app).post('/api/parking').send(payload).expect(400);
                    done();
                });

                it('Error Message', (done) => {
                    supertest(app).post('/api/parking').send(payload).then(res => {
                        expect(res.body.errorMessage).toBe('Name is exists');
                    });
                    done();
                });
            });
        });

        // describe('Create Parking success', () => {
        //     const payload = {
        //         name: "largest"
        //     };

        //     test('Status 200', (done) => {
        //         const { statusCode } =  supertest(app).post('/api/parking').send(payload);
        //         expect(statusCode).toBe(200);
        //     });
        // });
    });

    describe('Update Parking', () => {
        describe('Update Parking Validation Error', () => {
            describe('Update Parking Over Max Length', () => {
                const payload = {
                    name: "ABCDEFGHIJHLMNOPQURSTUVWXYZ,ABCDEFGHIJHLMNOPQURSTUVWXYZ"
                };
                
                it('Status 400', (done) => {
                    supertest(app).put('/api/parking/1').send(payload).expect(400);
                    done();
                });

                it('Error Message', (done) => {
                    supertest(app).put('/api/parking/1').send(payload).then(res => {
                        expect(res.body.errorMessage).toBe('Name is maxlength 50');
                    });
                    done();
                });
            });

            describe('Update Parking Data Type Incorrect', () => {
                const payload = {
                    isActive: "A"
                };

                const id = "A"
                
                it('Status 400 : isActive', (done) => {
                    supertest(app).put('/api/parking/1').send(payload).expect(400);
                    done();
                });

                it('Error Message : isActive', (done) => {
                    supertest(app).put('/api/parking/1').send(payload).then(res => {
                        expect(res.body.errorMessage).toBe('Status is not correct');
                    });
                    done();
                });

                it('Status 400 : id', (done) => {
                    supertest(app).put(`/api/parking/${id}`).send(payload).expect(400);
                    done();
                });

                it('Error Message : id', (done) => {
                    supertest(app).put(`/api/parking/${id}`).send(payload).then(res => {
                        expect(res.body.errorMessage).toBe('Id  must be a Integer');
                    });
                    done();
                });

            });

            describe('Update Parking Data Not Found', () => {
                const payload = {
                    isActive: true
                };
                
                it('Status 400', (done) => {
                    supertest(app).put('/api/parking/1000').send(payload).expect(400);
                    done();
                });

                it('Error Message', (done) => {
                    supertest(app).put('/api/parking/1000').send(payload).then(res => {
                        expect(res.body.errorMessage).toBe('Parking not found');
                    });
                    done();
                });
            });

            
        });
    });
});