const mongoose = require('mongoose');
const {ObjectId} = require('mongodb');
const app = require('../../server');
const note = require('../../app/models/note.model');

// Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

chai.use(chaiHttp);

// Dummy notes for test cases
const notes = [
	{
		_id: new ObjectId(),
		title: 'Expenses Notes',
		content: 'All the expenses are listed here.'
	},
	{
		_id: new ObjectId(),
		title: 'Personal Notes',
		content: 'All the personal expenses are listed here.'
	}
]

beforeEach((done) => {
	note.remove({})
	.then(() => {
		return note.insertMany(notes)
	}).then(() => {
		done();
	})
})

// Test the /GET route
describe('/GET notes', () => {
	it('It should get all the notes', (done) => {
		chai.request(app)
		.get('/notes')
		.end((err, res) => {
			res.should.have.status(200);
			res.body.should.be.a('array');
			res.body.length.should.be.eql(2);
			done();
		})
	})
})

// Test: Post single note
describe('/POST notes', () => {
	it('It should post a single note', (done) => {
		let note = {
			title: 'Test Note',
			content: 'This is for testing purpose'
		}

		chai.request(app)
		.post('/notes')
		.send(note)
		.end((err, res) => {
			res.should.have.status(200);
			res.body.should.be.a('object');
			res.body.should.have.property('_id');
			done();
		})
	})
})
