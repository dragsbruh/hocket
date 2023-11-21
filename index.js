require("dotenv").config();

const express = require("express");
const uuid = require("uuid").v4;
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

var topics = new Map();

app.post("/api/send/:topic", (req, res) => {
	const topic = req.params.topic;

	if (topic === undefined) {
		res.status(400);
		return res.json({
			status: "error",
			message:
				"Please specify a topic in the endpoint to send the message to. Ex: '/api/send/mytopic'.",
		});
	}

	const messageData = req.body;

	if (
		!messageData ||
		!messageData.author ||
		!messageData.content ||
		!(typeof messageData.author === "string") ||
		!(typeof messageData.content === "string")
	) {
		res.status(400);
		return res.json({
			status: "error",
			message: "Invalid message format. Author and content are required.",
			echo: messageData,
		});
	}

	const attachments = messageData.attachments || null;

	if (attachments && !Array.isArray(attachments)) {
		res.status(400);
		return res.json({
			status: "error",
			message:
				"Invalid attachments format. Attachments must be an array.",
			echo: messageData,
		});
	}

	const message = {
		author: messageData.author,
		content: messageData.content,
		attachments: attachments,
		createdAt: Date.now(),
		id: uuid(),
	};

	if (!topics.has(topic)) {
		topics.set(topic, []);
	}

	topics.get(topic).push(message);

	res.json({ status: "success" });
});

app.get("/api/get/:topic", (req, res) => {
	const topic = req.params.topic;

	if (topic === undefined) {
		res.status(400);
		return res.json({
			status: "error",
			message:
				"Please specify a topic in the endpoint to get the message of. Ex: '/api/get/mytopic'.",
		});
	}
	if (topics.has(topic)) {
		res.status(200);
		let data = topics.get(topic);
		return res.json({
			status: "success",
			data: data[data.length - 1],
		});
	} else {
		res.status(400);
		return res.json({
			status: "error",
			message: "Topic not found.",
		});
	}
});

app.get("/api/get_all/:topic", (req, res) => {
	const topic = req.params.topic;

	if (topic === undefined) {
		res.status(400);
		return res.json({
			status: "error",
			message:
				"Please specify a topic in the endpoint to get the messages of. Ex: '/api/get/mytopic'.",
		});
	}
	if (topics.has(topic)) {
		res.status(200);
		return res.json({
			status: "success",
			data: topics.get(topic),
		});
	} else {
		res.status(400);
		return res.json({
			status: "error",
			message: "Topic not found.",
		});
	}
});

app.delete("/api/delete/:topic", (req, res) => {
	const topic = req.params.topic;

	if (topic === undefined) {
		res.status(400);
		return res.json({
			status: "error",
			message:
				"Please specify a topic to delete. Ex: '/api/get/mytopic'.",
		});
	}
	if (topics.has(topic)) {
		res.status(200);
		let data = topics.get(topic);
		topics.delete(topic);
		return res.json({
			status: "success",
			data: data,
		});
	} else {
		res.status(400);
		return res.json({
			status: "error",
			message: "Topic not found.",
		});
	}
});

app.post("/api/delete/:topic", (req, res) => {
	const topic = req.params.topic;

	if (topic === undefined) {
		res.status(400);
		return res.json({
			status: "error",
			message:
				"Please specify a topic to delete. Ex: '/api/get/mytopic'.",
		});
	}
	if (topics.has(topic)) {
		res.status(200);
		let data = topics.get(topic);
		topics.delete(topic);
		return res.json({
			status: "success",
			data: data,
		});
	} else {
		res.status(400);
		return res.json({
			status: "error",
			message: "Topic not found.",
		});
	}
});

app.listen(PORT, () => {
	console.log("Express server listening on port", PORT);
});
