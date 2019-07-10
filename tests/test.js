/* eslint-disable no-undef */
import chai from 'chai'
import { expect } from 'chai'
import chaiHttp from 'chai-http'
import app from '../server'

chai.use(chaiHttp)
//Our parent block

/*
 * Test the index /GET route and unnknown routes
 */
describe('/GET user account info', () => {
    it('it should test for "/" route ', done => {
        chai.request(app)
            .get('/')
            .end((err, res) => {
                if (err) done(err)
                expect(res.status).to.equal(200)
                done()
            })
    })

    it('it should test for unknown route ', done => {
        chai.request(app)
            .get('*')
            // eslint-disable-next-line no-unused-vars
            .end((err, res) => {
                if (err) done(err)
                expect(res.status).to.equal(404)
                done()
            })
    })
})

//  // Import the dependencies for testing

//  import chai from 'chai';
//  import chaiHttp from 'chai-http';
//  import app from '../server.js';

//  // Configure chai

//   let should=chai.should();

//  chai.use(chaiHttp);

//  describe('test suite', () => {
//      it('should run fine', () => {

//      });
//  });

//  describe("properties routes", () => {

//     it('it should POST a particular property', () =>{
//                 const  newProperty = {

//                     owner: "desire BYAMUNGU "  ,
//                     status: "Available" ,
//                     city: "KIGALI",
//                     address: "KIGALI_KIMIRONKP ",
//                     type: "3 BED ",
//                     image_url: "WWW.google.com" ,

//                 };

//             Chai.request (app)
//                 .post('api/v1/properties')
//                 .send(newProperty)
//                 .end((err, res) => {
//                 res.should.have.status(201);
//                 res.body.should.be.a('object');
//                 res.body.should.have.property('status').eql(201);
//                 res.body.should.have.property('message').eql('Created');
//                 res.body.should.have.property('newProperty').eql(newProperty);
//                 done();

//                        });
//                      });

//                 });

//                 describe("properties routes", () => {

//                     //                it('it should POST a particular property', () =>{
//                     //             // const  newProperty = {

//                     //             //     owner: "desire BYAMUNGU "  ,
//                     //             //     status: "Available" ,
//                     //             //     city: "KIGALI",
//                     //             //     address: "KIGALI_KIMIRONKP ",
//                     //             //     type: "3 BED ",
//                     //             //     image_url: "WWW.google.com" ,

//                     //             // };

//                     //         // Chai.request (app)
//                     //         //     .post('api/v1/properties')
//                     //         //     .send(newProperty)
//                     //         //     .end((err, res) => {
//                     //         //     res.should.have.status(201);
//                     //         //     res.body.should.be.a('object');
//                     //         //     res.body.should.have.property('status').eql(201);
//                     //         //     res.body.should.have.property('message').eql('Created');
//                     //         //     res.body.should.have.property('Property').eql(Property);
//                     //         //     done();

//                     //                    });
//                     //                  });

//                     //             });
