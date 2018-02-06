'use strict';

const app = alias.require('@root/app'),
	shortid = require('shortid'),
	fileSystem = require("fs"),
    Promise = require('bluebird'),
	AWS = require('aws-sdk'),
	s3Config = alias.require('@root/core/s3-config');

AWS.config.loadFromPath('core/s3-config.json');

const s3Bucket = new AWS.S3({ params: {Bucket: 'incar2017'} });

module.exports = {
    base64image,
	base64ToS3
};

function base64image (req, res) {
	var base64Data = req.body.imageString.indexOf(',') !== -1 ? req.body.imageString.split(',')[1] : req.body.imageString;
	var randomName = shortid.generate() + '.jpg';
	var deployAddress = 'public/content/uploads/' + randomName;
	fileSystem.writeFile(deployAddress, base64Data, 'base64', function(err) {
		if (err) res.send(err);
		var response = {
			imageUrl: '/content/uploads/' + randomName
		};
		res.send(response)
	});
}

function base64ToS3(req, res) {
	var buf = new Buffer(req.body.imageString.replace(/^data:image\/\w+;base64,/, ""),'base64');
	var randomName = shortid.generate() + '.jpeg';
	var data = {
		Key:  randomName,
		ACL: "public-read",
		Body: buf,
		ContentEncoding: 'base64',
		ContentType: 'image/jpeg'
	};

	s3Bucket.upload(data, function(err, data){
		if (err) {
			res.sendStatus(500);
			console.log('Error uploading data: ', data);
		} else {
			res.send({imageUrl: data.Location});
		}
	});
}